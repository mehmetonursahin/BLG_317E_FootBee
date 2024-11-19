# Dataset Instructions

This folder contains the necessary datasets in CSV format for use with the SQL scripts. Please follow the steps below to download, extract, and prepare the dataset files.

## Steps to Prepare the Dataset

1. **Download the dataset**  
   Download the `dataset.zip` file from the following link:  
   [Download Dataset from Mega](https://mega.nz/folder/XIoTxbDA#vP-tyvy-Fm91HAhTG-XB0Q)

2. **Extract the dataset**  
   Extract the contents of `dataset.zip` into this folder:  
   `sql/dataset/`

   After extraction, the structure should look like this:
    ```plaintext
    project/
    └── sql/
        └── dataset/
            ├── appearances.csv
            ├── club_games.csv
            ├── clubs.csv
            ├── competitions.csv
            ├── game_events.csv
            ├── games.csv
            ├── player_valuations.csv
            └── players.csv
        ├── .gitignore
        ├── 1-create_tables.sql
        ├── 2-load_data_docker.sql
        ├── 2-load_data.sql
        ├── README.md
        └── sql_table.pdf
    ```
3. **Please do not modify file names**  
    Sql copy commands depends on hardcoded file paths.