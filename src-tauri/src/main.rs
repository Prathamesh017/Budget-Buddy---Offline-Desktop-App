// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod db;
#[tauri::command]
fn  start_app() {
    db::db_setup();
    println!("Hello from Rust!");
}
#[tauri::command]
fn handle_increment(value:i8){
  db::handle_number(value);
}
#[tauri::command]
fn get_value(){
  db::get_value();
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_app,handle_increment,get_value])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
