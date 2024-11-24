DROP DATABASE footbee;
CREATE DATABASE footbee;
USE footbee;

CREATE TABLE competitions(
    competition_id VARCHAR(10) PRIMARY KEY,
    competition_code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    sub_type VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    country_name VARCHAR(50) NULL,
    domestic_league_code VARCHAR(10) NULL,
    confederation VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE clubs (
    club_id INTEGER PRIMARY KEY,
    club_code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    domestic_competition VARCHAR(255),
    total_market_value VARCHAR(255),
    squad_size INTEGER,
    average_age DECIMAL,
    foreigners_number INTEGER,
    foreigners_percent DECIMAL,
    national_team_players INTEGER,
    stadium_name VARCHAR(255),
    stadium_seats INTEGER,
    net_transfer_record VARCHAR(255),
    coach_name VARCHAR(255),
    url VARCHAR(255)
);

CREATE TABLE games(
    game_id INTEGER NOT NULL,
    competition_id VARCHAR(10) NOT NULL,
    season INTEGER NOT NULL,
    round VARCHAR(50) NOT NULL,
    date DATETIME NOT NULL,
    home_club_id INTEGER NOT NULL,
    away_club_id INTEGER NOT NULL,
    home_club_goals INTEGER NOT NULL DEFAULT '0',
    away_club_goals INTEGER NOT NULL DEFAULT '0',
    home_club_position INTEGER NOT NULL,
    away_club_position INTEGER NOT NULL,
    home_club_manager_name VARCHAR(100) NULL,
    away_club_manager_name VARCHAR(100) NULL,
    stadium VARCHAR(100) NOT NULL,
    attendance INTEGER NULL,
    referee VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    home_club_name VARCHAR(100) NULL,
    away_club_name VARCHAR(100) NULL,
    aggregate VARCHAR(10) NOT NULL,
    competition_type VARCHAR(50) NOT NULL,
    PRIMARY KEY(game_id),

    FOREIGN KEY (home_club_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY (away_club_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE players (
    player_id INTEGER PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    last_season INTEGER,
    current_club_id INTEGER ,
    player_code VARCHAR(100) NOT NULL,
    country_of_birth VARCHAR(50) NOT NULL,
    city_of_birth VARCHAR(50) NOT NULL,
    country_of_citizenship VARCHAR(50) NOT NULL,
    date_of_birth DATETIME ,
    sub_position VARCHAR(50),
    position VARCHAR(50) NOT NULL,
    foot ENUM('NotIndicated', 'Left', 'Right', 'Both') NOT NULL,
    height_in_cm INTEGER,
    contract_expiration_date DATETIME,
    agent_name VARCHAR(100),
    image_url VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,

    FOREIGN KEY (current_club_id) REFERENCES clubs(club_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE game_events(
    game_event_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INTEGER NOT NULL,
    minute INTEGER NOT NULL,
    type ENUM('Substitutions', 'Goals') NOT NULL,
    club_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    description TEXT NULL,
    player_in_id INTEGER NULL,

    FOREIGN KEY(game_id) REFERENCES games(game_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(club_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(player_id) REFERENCES players(player_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(player_in_id) REFERENCES players(player_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE player_valuations (
    player_id INTEGER,
    datetime DATETIME,
    market_value_in_eur INTEGER NOT NULL,
    highest_market_value_in_eur INTEGER,
    current_club_id INTEGER NOT NULL,

    PRIMARY KEY (player_id, datetime),

    FOREIGN KEY (player_id) REFERENCES players(player_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE club_games (
    game_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,
    own_goals INTEGER,
    own_position INTEGER,
    own_manager_name VARCHAR(255),
    opponent_id INTEGER NOT NULL,
    opponent_goals INTEGER,
    opponent_position INTEGER,
    opponent_manager_name VARCHAR(255),
    hosting VARCHAR(255),
    is_win BOOLEAN
    
    ,

    PRIMARY KEY (game_id,opponent_id,hosting),

    FOREIGN KEY (club_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY (opponent_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY (game_id) REFERENCES games(game_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE appearances(
    appearance_id VARCHAR(255) NOT NULL,
    game_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    player_club_id INTEGER NOT NULL,
    player_current_club_id INTEGER NOT NULL,
    date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    player_name VARCHAR(100) NULL,
    competition_id VARCHAR(10) NOT NULL,
    yellow_cards INTEGER NOT NULL,
    red_cards INTEGER NOT NULL,
    goals INTEGER NOT NULL,
    assists INTEGER NOT NULL,
    minutes_played INTEGER NOT NULL,
    PRIMARY KEY(appearance_id)
    
    ,

    FOREIGN KEY(game_id) REFERENCES games(game_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(player_id) REFERENCES players(player_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(player_club_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(player_current_club_id) REFERENCES clubs(club_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY(competition_id) REFERENCES competitions(competition_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);