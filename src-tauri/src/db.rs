use sqlite::Connection;
use std::env;
use std::fs;
use std::path::Path;

pub fn db_setup() {
    let current_directory = get_current_directory();
    if current_directory.is_ok() {
        let db_file_path = current_directory.unwrap().to_string();
        let is_db_file_exists = Path::new(&db_file_path).exists();
        if !is_db_file_exists {
            fs::File::create(&db_file_path).unwrap();
        }
    }
}

fn connect_db(path: &String) -> Result<Connection, String> {
    let connection = sqlite::open(path);
    if connection.is_ok() {
        Ok(connection.unwrap())
    } else {
        Err("Connect Failed".into())
    }
}

pub fn handle_number(value: i8) {
    let current_directory = get_current_directory();
    let connection = sqlite::open(current_directory.unwrap());
    let query = format!(
        "
    CREATE TABLE users (name TEXT, age TEXT);
    INSERT INTO users VALUES ('Alice', {});
    INSERT INTO users VALUES ('Bob', 69);
    "
    ,value);
    println!("{}",query);

    let result = connection.unwrap().execute(query);
    if result.is_ok() {
        println!("Success");
    } else {
        println!("Failure")
    }
}

pub fn get_value() {
    print!("inside get VALYE");
    let directory = get_current_directory();
    let connection = sqlite::open(directory.unwrap());
    let query = "SELECT * FROM users";
    connection.unwrap()
    .iterate(query, |pairs| {
        for &(name, value) in pairs.iter() {
            println!("{} = {}", name, value.unwrap());
        }
        true
    })
    .unwrap();
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
