# FootBee

## Overview
The FootBee project is a web-based application designed to help users search for and view detailed information about football matches, players, and clubs. With an intuitive interface, users can quickly access comprehensive data about their favorite footballers, clubs, and games.

---

## Features
- **Search for Matches**: Look up details about past games, including participating teams, scores, and dates.
- **Footballer Details**: Search for individual footballers to see their stats, position, club history, and market value.
- **Club Information**: Explore data about football clubs, including rosters, achievements, and game history.

---

## Technologies Used
- **Backend**: Python Flask
- **Frontend**: Node.js/React
- **Database**: MySQL

---

## Installation

### Prerequisites
- **Docker Engine**: If not installed, download and install from [Docker Desktop](https://www.docker.com/products/docker-desktop).
- **Dataset**: Download the [required dataset file](https://mega.nz/folder/XIoTxbDA#vP-tyvy-Fm91HAhTG-XB0Q).

### Deployment Instructions
1. **Download and Setup Dataset (only if the project is pulled for the first time)**

   - Download `dataset.zip` from the following link:
   [Download Dataset from Mega](https://mega.nz/folder/XIoTxbDA#vP-tyvy-Fm91HAhTG-XB0Q).
   - Extract the CSV files and place them into `sql/dataset/`.
   - **Please do not change the filenames. SQL copy depends on hardcoded file paths!**
   - After extraction, the structure should look like this:
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

2. **Setup Environment Variables**  
   - Navigate to the `/backend` directory.
     ```bash
     cd ./backend
     ```   
   - Create a `.env` file by copying the contents of `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Modify `.env` to configure settings.

3. **Start Docker**  
   - Open Docker Engine.  
   - Navigate to the `/docker` directory:
     ```bash
     cd ./../docker
     ```
   - Build and start the containers:
     ```bash
     docker-compose up --build -d
     ```

4. **Verify Docker Containers**  
   - Check running containers:
     ```bash
     docker ps -a
     ```
   - View logs for specific containers (replace `<frontend>`, `<backend>`, or `<database>` with the relevant service name):
     ```bash
     docker-compose logs <frontend/backend/database>
     ```

5. **Running addresses of frontend and backend**
    - If you used the default settings:
        - **Frontend**: Runs on [http://localhost:3000](http://localhost:3000)  
        - **Backend**: Runs on [http://localhost:8080](http://localhost:8080)
    

---

### Notes
- Ensure Docker Engine is running before executing docker commands.
- Use the `.env` file for configuring ports and other settings.
- Preparing the dataset is compulsory only if the project is being deployed for the first time. If `sql/database/` already contains the required CSV files, skip step 1.