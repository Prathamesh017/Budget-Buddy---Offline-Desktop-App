// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod db;
use db::get_expenses_data;
use db::add_expense;
use db::update_expense;
use db::delete_expense;
#[tauri::command]
fn  start_app() {
    db::db_setup();
    println!("Hello from Rust!");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_app,
            add_expense,
            get_expenses_data,
            update_expense,
            delete_expense
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
