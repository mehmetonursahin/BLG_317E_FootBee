LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/game_events.csv'
INTO TABLE game_events
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(game_id, minute, type, club_id, player_id, description, player_in_id);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/games.csv'
INTO TABLE games
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(game_id, competition_id, season, round, date, home_club_id, away_club_id, home_club_goals, away_club_goals, home_club_position, away_club_position, home_club_manager_name, away_club_manager_name, stadium, attendance, referee, url, home_club_name, away_club_name, aggregate, competition_type);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/players.csv'
INTO TABLE players
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(player_id, first_name, last_name, last_season, current_club_id, player_code, country_of_birth, city_of_birth, country_of_citizenship, date_of_birth, sub_position, position, foot, height_in_cm, contract_expiration_date, agent_name, image_url, url);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/player_valuations.csv'
INTO TABLE player_valuations
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(player_id, datetime, market_value_in_eur, highest_market_value_in_eur, current_club_id);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/clubs.csv'
INTO TABLE clubs
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(club_id, club_code, name, domestic_competition, total_market_value, squad_size, average_age, foreigners_number, foreigners_percent, national_team_players, stadium_name, stadium_seats, net_transfer_record, coach_name, url);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/club_games.csv'
INTO TABLE club_games
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(game_id, club_id, own_goals, own_position, own_manager_name, opponent_id, opponent_goals, opponent_position, opponent_manager_name, hosting, is_win);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/appearances.csv'
INTO TABLE appearances
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(appearance_id, game_id, player_id, player_club_id, player_current_club_id, date, player_name, competition_id, yellow_cards, red_cards, goals, assists, minutes_played);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/dataset/competitions.csv'
INTO TABLE competitions
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(competition_id, competition_code, name, sub_type, type, country_name, domestic_league_code, confederation, url);
