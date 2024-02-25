use serde::{Serialize};
use std::env;
use std::fs;
use std::path::Path;

#[derive(Serialize)]
pub struct ExpenseDataType {
    name: String,
    expense_type: String,
    amount: i32,
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
        connection.unwrap().iterate(query, |pairs| {
            for &(name, value) in pairs.iter() {
                if !value.unwrap().is_empty() {
                    is_table_created = true;
                }
            }
            true
        });
        if !is_table_created {
            create_table_in_db(&db_file_path);
        }
    }
}

fn create_table_in_db(path: &String) {
    let connection = sqlite::open(path);
    let query = "CREATE TABLE expenseTable (name TEXT,expenseType TEXT, amount INTEGER)";
    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Database Created Successfull");
    } else {
        println!("Database Failed To Create")
    }
}

#[tauri::command]
pub fn add_expense() {
    let current_directory = get_current_directory();
    let connection = sqlite::open(current_directory.unwrap());
    let query = format!("INSERT INTO expenseTable VALUES ('FOOD','INCOME',400);");
    println!("{}", query);

    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Expense Add Successfully");
    } else {
        println!("Expense Delete Successfully");
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
            let mut expense_amount = 0; // Initialize amount to a default value
            let mut expense_type = String::new();
            for &(name, value) in pairs.iter() {
                match name {
                    "name" => expense_name = value.unwrap().to_string(),
                    "amount" => {
                        if let Ok(amount) = value.unwrap().parse::<i32>() {
                            expense_amount = amount;
                        } else {
                            println!("Failed to parse amount: {}", value.unwrap());
                        }
                    }
                    _ => expense_type = value.unwrap().to_string(),
                }
            }
            expenses_data_arr.push(ExpenseDataType {
                name: (expense_name),
                expense_type: (expense_type),
                amount: (expense_amount),
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
