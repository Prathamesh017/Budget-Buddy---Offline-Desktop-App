use serde::{Serialize,Deserialize};
use std::env;
use std::fs;
use std::path::Path;
#[derive(Serialize, Deserialize,Debug)]
#[serde(rename_all = "snake_case")]
pub struct ExpenseDataType {
    pub expense_id: String,
    pub expense_name: String,
    pub expense_type: String,
    pub expense_date:String,
    pub expense_amount: String,
}

pub fn db_setup() {
    let mut is_table_created = false;
    let current_directory_result = get_current_directory();
    if current_directory_result.is_ok() {
        let db_file_path = current_directory_result.unwrap().to_string();
        let is_db_file_exists = Path::new(&db_file_path).exists();
        if !is_db_file_exists {
            fs::File::create(&db_file_path).unwrap();
        }

        let connection = sqlite::open(&db_file_path);
        let query = "SELECT name  FROM sqlite_master WHERE type='table' AND name='expenseTable' ";
        let result=connection.unwrap().iterate(query, |pairs| {
            for &(_, value) in pairs.iter() {
                if !value.unwrap().is_empty() {
                    is_table_created = true;
                }
            }
            true
        });
        println!("result{:?}",result.unwrap());
        if !is_table_created {
            create_table_in_db(&db_file_path);
        }
    }
}

fn create_table_in_db(path: &String) {
    let connection = sqlite::open(path);
    let query = "CREATE TABLE expenseTable (expense_id STRING PRIMARY KEY,expense_name TEXT,expense_type TEXT, expense_amount INTEGER,expense_date TEXT)";
    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Database Created Successfull");
    } else {
        println!("Database Failed To Create")
    }
}

#[tauri::command]
pub fn add_expense(expense_obj: &str)->bool{
    let serialized_expense_arr:ExpenseDataType = serde_json::from_str(expense_obj).unwrap();
    println!("I was invoked from JS, with this message: {:?}",serialized_expense_arr);
    let current_directory = get_current_directory();
    let connection = sqlite::open(current_directory.unwrap());
    let query = format!("INSERT INTO expenseTable VALUES ('{}','{}','{}','{}','{}');",serialized_expense_arr.expense_id,serialized_expense_arr.expense_name,serialized_expense_arr.expense_type,serialized_expense_arr.expense_amount,serialized_expense_arr.expense_date);
    println!("{}", query);

    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Expense Added  Successfully");
        return true;
    } else {
        println!("Expense Insertion Failed");
        return false;
    }
}
#[tauri::command]
pub fn update_expense(expense_obj: &str)->bool{
    let serialized_expense_arr:ExpenseDataType = serde_json::from_str(expense_obj).unwrap();
    let current_directory = get_current_directory();
    let connection = sqlite::open(current_directory.unwrap());
    let query = format!("UPDATE expenseTable SET expense_name='{}',expense_type='{}',expense_amount='{}',expense_date='{}' WHERE expense_id='{}';",serialized_expense_arr.expense_name,serialized_expense_arr.expense_type,serialized_expense_arr.expense_amount,serialized_expense_arr.expense_date,serialized_expense_arr.expense_id);
    println!("{}", query);

    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Expense Update  Successfully");
        return true;
    } else {
        println!("Expense Updateion Failed {}",result.err().unwrap());
        return false;
    }
}
#[tauri::command]
pub fn delete_expense(id: &str)->bool{
  
    let current_directory = get_current_directory();
    let connection = sqlite::open(current_directory.unwrap());
    let query = format!("DELETE FROM expenseTable  WHERE expense_id='{}';",id);
    println!("{}", query);

    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Expense Update  Successfully");
        return true;
    } else {
        println!("Expense Updateion Failed {}",result.err().unwrap());
        return false;
    }
}
#[tauri::command]
pub fn get_expenses_data() -> String {
    
    let directory = get_current_directory();
    let connection = sqlite::open(directory.unwrap());
    let query = "SELECT * FROM expenseTable";
    let mut expenses_data_arr: Vec<ExpenseDataType> = Vec::new();
    connection
        .unwrap()
        .iterate(query, |pairs| {
            let mut expense_name = String::new();
            let mut expense_id = String::new();
            let mut expense_amount = String::new(); // Initialize amount to a default value
            let mut expense_type = String::new();
            let mut expense_date = String::new();
            for &(name, value) in pairs.iter() {
                match name {
                    "expense_name" => expense_name = value.unwrap().to_string(),
                    "expense_id" => expense_id = value.unwrap().to_string(),
                    "expense_date" => expense_date = value.unwrap().to_string(),
                    "expense_amount" => expense_amount=value.unwrap().to_string(),
                    _=> expense_type = value.unwrap().to_string(),
                }
            }
            expenses_data_arr.push(ExpenseDataType {
                expense_id,
                expense_name,
                expense_type,
                expense_amount,
                expense_date
            });
            true
        })
        .unwrap();
    // Serialize the array struct to JSON
    let serialized_expense_arr = serde_json::to_string(&expenses_data_arr).unwrap();
    return serialized_expense_arr;
}

fn get_current_directory() -> Result<String, String> {
    let current_directory = env::current_dir();
    if current_directory.is_ok() {
      
            let db_file_path =
            current_directory.unwrap().to_string_lossy().to_string() + "/src/db.sqlite"; //;
        
        Ok(db_file_path.into())
    } else {
        Err("No Directory Found".into())
    }
}
