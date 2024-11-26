-- In order to load data with foreign checks, comment following line
SET foreign_key_checks = 1;


LOAD DATA INFILE '/var/lib/mysql-files/competitions.csv'
INTO TABLE competitions
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@competition_id, 
 @competition_code, 
 @name, 
 @sub_type, 
 @type, 
 @country_name, 
 @domestic_league_code, 
 @confederation, 
 @url)
SET
 competition_id = NULLIF(@competition_id, ''),
 competition_code = NULLIF(@competition_code, ''),
 name = NULLIF(@name, ''),
 sub_type = NULLIF(@sub_type, ''),
 type = NULLIF(@type, ''),
 country_name = NULLIF(@country_name, ''),
 domestic_league_code = NULLIF(@domestic_league_code, ''),
 confederation = NULLIF(@confederation, ''),
 url = NULLIF(@url, '');

LOAD DATA INFILE '/var/lib/mysql-files/clubs.csv'
INTO TABLE clubs
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@club_id, 
 @club_code, 
 @name, 
 @domestic_competition, 
 @total_market_value, 
 @squad_size, 
 @average_age, 
 @foreigners_number, 
 @foreigners_percent, 
 @national_team_players, 
 @stadium_name, 
 @stadium_seats, 
 @net_transfer_record, 
 @coach_name, 
 @url)
SET
 club_id = NULLIF(@club_id, ''),
 club_code = NULLIF(@club_code, ''),
 name = NULLIF(@name, ''),
 domestic_competition = NULLIF(@domestic_competition, ''),
 total_market_value = NULLIF(@total_market_value, ''),
 squad_size = NULLIF(@squad_size, ''),
 average_age = NULLIF(@average_age, ''),
 foreigners_number = NULLIF(@foreigners_number, ''),
 foreigners_percent = NULLIF(@foreigners_percent, ''),
 national_team_players = NULLIF(@national_team_players, ''),
 stadium_name = NULLIF(@stadium_name, ''),
 stadium_seats = NULLIF(@stadium_seats, ''),
 net_transfer_record = NULLIF(@net_transfer_record, ''),
 coach_name = NULLIF(@coach_name, ''),
 url = NULLIF(@url, '');

LOAD DATA INFILE '/var/lib/mysql-files/games.csv'
INTO TABLE games
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@game_id, 
 @competition_id, 
 @season, 
 @round, 
 @date, 
 @home_club_id, 
 @away_club_id, 
 @home_club_goals, 
 @away_club_goals, 
 @home_club_position, 
 @away_club_position, 
 @home_club_manager_name, 
 @away_club_manager_name, 
 @stadium, 
 @attendance, 
 @referee, 
 @url, 
 @home_club_name, 
 @away_club_name, 
 @aggregate, 
 @competition_type)
SET
 game_id = NULLIF(@game_id, ''),
 competition_id = NULLIF(@competition_id, ''),
 season = NULLIF(@season, ''),
 round = NULLIF(@round, ''),
 date = NULLIF(@date, ''),
 home_club_id = NULLIF(@home_club_id, ''),
 away_club_id = NULLIF(@away_club_id, ''),
 home_club_goals = NULLIF(@home_club_goals, ''),
 away_club_goals = NULLIF(@away_club_goals, ''),
 home_club_position = NULLIF(@home_club_position, ''),
 away_club_position = NULLIF(@away_club_position, ''),
 home_club_manager_name = NULLIF(@home_club_manager_name, ''),
 away_club_manager_name = NULLIF(@away_club_manager_name, ''),
 stadium = NULLIF(@stadium, ''),
 attendance = NULLIF(@attendance, ''),
 referee = NULLIF(@referee, ''),
 url = NULLIF(@url, ''),
 home_club_name = NULLIF(@home_club_name, ''),
 away_club_name = NULLIF(@away_club_name, ''),
 aggregate = NULLIF(@aggregate, ''),
 competition_type = NULLIF(@competition_type, '');

LOAD DATA INFILE '/var/lib/mysql-files/players.csv'
INTO TABLE players
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@player_id, 
 @first_name, 
 @last_name, 
 @last_season, 
 @current_club_id, 
 @player_code, 
 @country_of_birth, 
 @city_of_birth, 
 @country_of_citizenship, 
 @date_of_birth, 
 @sub_position, 
 @position, 
 @foot, 
 @height_in_cm, 
 @contract_expiration_date, 
 @agent_name, 
 @image_url, 
 @url)
SET
 player_id = NULLIF(@player_id, ''),
 first_name = NULLIF(@first_name, ''),
 last_name = NULLIF(@last_name, ''),
 last_season = NULLIF(@last_season, ''),
 current_club_id = NULLIF(@current_club_id, ''),
 player_code = NULLIF(@player_code, ''),
 country_of_birth = NULLIF(@country_of_birth, ''),
 city_of_birth = NULLIF(@city_of_birth, ''),
 country_of_citizenship = NULLIF(@country_of_citizenship, ''),
 date_of_birth = NULLIF(@date_of_birth, ''),
 sub_position = NULLIF(@sub_position, ''),
 position = NULLIF(@position, ''),
 foot = COALESCE(NULLIF(@foot, ''), 'NotIndicated'),
 height_in_cm = NULLIF(@height_in_cm, ''),
 contract_expiration_date = NULLIF(@contract_expiration_date, ''),
 agent_name = NULLIF(@agent_name, ''),
 image_url = NULLIF(@image_url, ''),
 url = NULLIF(@url, '');

LOAD DATA INFILE '/var/lib/mysql-files/game_events.csv'
INTO TABLE game_events
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@game_id, 
 @minute, 
 @type, 
 @club_id, 
 @player_id, 
 @description, 
 @player_in_id)
SET
 game_id = NULLIF(@game_id, ''),
 minute = NULLIF(@minute, ''),
 type = NULLIF(@type, ''),
 club_id = NULLIF(@club_id, ''),
 player_id = NULLIF(@player_id, ''),
 description = NULLIF(@description, ''),
  player_in_id = CASE
    WHEN @player_in_id = '' OR @player_in_id NOT REGEXP '^[0-9]+$' THEN NULL
    ELSE @player_in_id
  END;

LOAD DATA INFILE '/var/lib/mysql-files/player_valuations.csv'
INTO TABLE player_valuations
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@player_id, 
 @datetime, 
 @market_value_in_eur, 
 @highest_market_value_in_eur, 
 @current_club_id)
SET
 player_id = NULLIF(@player_id, ''),
 datetime = NULLIF(@datetime, ''),
 market_value_in_eur = NULLIF(@market_value_in_eur, ''),
 highest_market_value_in_eur = NULLIF(@highest_market_value_in_eur, ''),
 current_club_id = NULLIF(@current_club_id, '');

LOAD DATA INFILE '/var/lib/mysql-files/club_games.csv'
INTO TABLE club_games
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@game_id, 
 @club_id, 
 @own_goals, 
 @own_position, 
 @own_manager_name, 
 @opponent_id, 
 @opponent_goals, 
 @opponent_position, 
 @opponent_manager_name, 
 @hosting, 
 @is_win)
SET
 game_id = NULLIF(@game_id, ''),
 club_id = NULLIF(@club_id, ''),
 own_goals = NULLIF(@own_goals, ''),
 own_position = NULLIF(@own_position, ''),
 own_manager_name = NULLIF(@own_manager_name, ''),
 opponent_id = NULLIF(@opponent_id, ''),
 opponent_goals = NULLIF(@opponent_goals, ''),
 opponent_position = NULLIF(@opponent_position, ''),
 opponent_manager_name = NULLIF(@opponent_manager_name, ''),
 hosting = NULLIF(@hosting, ''),
 is_win = NULLIF(@is_win, '');

LOAD DATA INFILE '/var/lib/mysql-files/appearances.csv'
INTO TABLE appearances
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(@appearance_id, 
 @game_id, 
 @player_id, 
 @player_club_id, 
 @player_current_club_id, 
 @date, 
 @player_name, 
 @competition_id, 
 @yellow_cards, 
 @red_cards, 
 @goals, 
 @assists, 
 @minutes_played)
SET
 appearance_id = NULLIF(@appearance_id, ''),
 game_id = NULLIF(@game_id, ''),
 player_id = NULLIF(@player_id, ''),
 player_club_id = NULLIF(@player_club_id, ''),
 player_current_club_id = NULLIF(@player_current_club_id, ''),
 date = NULLIF(@date, ''),
 player_name = NULLIF(@player_name, ''),
 competition_id = NULLIF(@competition_id, ''),
 yellow_cards = NULLIF(@yellow_cards, ''),
 red_cards = NULLIF(@red_cards, ''),
 goals = NULLIF(@goals, ''),
 assists = NULLIF(@assists, ''),
 minutes_played = NULLIF(@minutes_played, '');

SET foreign_key_checks = 1;