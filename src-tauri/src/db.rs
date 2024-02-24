use std::env;
use std::fs;
use std::path::Path;
pub fn db_setup() {
    let current_directory=get_current_directory();
    if current_directory.is_ok(){
      let db_file_path=current_directory.unwrap().to_string()+"/src/db.sqlite";
      let is_db_file_exists=Path::new(&db_file_path).exists();
      if !is_db_file_exists{
        fs::File::create(db_file_path).unwrap();
      }
    }
}

fn get_current_directory() -> Result<String,String> {
    let current_directory= env::current_dir();
    if current_directory.is_ok(){
      let current_directory_str = current_directory.unwrap().to_string_lossy().to_string(); //;
      Ok(current_directory_str.into())

    }else{
      Err("No Directory Found".into())
    }
}
