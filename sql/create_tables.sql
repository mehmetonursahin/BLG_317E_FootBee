CREATE TYPE game_event_type AS ENUM ('Substitutions', 'Goals');
CREATE TYPE foot_used AS ENUM ('NotIndicated', 'Left', 'Right', 'Both')

CREATE TABLE "game_events"(
    "game_id" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "type" game_event_type NOT NULL,
    "club_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "description" TEXT NULL,
    "player_in_id" INTEGER NULL
);
ALTER TABLE
    "game_events" ADD PRIMARY KEY("game_id","minute","player_id");

CREATE TABLE "games"(
    "game_id" INTEGER NOT NULL,
    "competition_id" VARCHAR(10) NOT NULL,
    "season" INTEGER NOT NULL,
    "round" VARCHAR(50) NOT NULL,
    "date" DATE NOT NULL,
    "home_club_id" INTEGER NOT NULL,
    "away_club_id" INTEGER NOT NULL,
    "home_club_goals" INTEGER NOT NULL DEFAULT '0',
    "away_club_goals" INTEGER NOT NULL DEFAULT '0',
    "home_club_position" INTEGER NOT NULL,
    "away_club_position" INTEGER NOT NULL,
    "home_club_manager_name" VARCHAR(100) NULL,
    "away_club_manager_name" VARCHAR(100) NULL,
    "stadium" VARCHAR(100) NOT NULL,
    "attendance" INTEGER NULL,
    "referee" VARCHAR(100) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "home_club_name" VARCHAR(100) NULL,
    "away_club_name" VARCHAR(100) NULL,
    "aggregate" VARCHAR(10) NOT NULL,
    "competition_type" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "games" ADD PRIMARY KEY("game_id");
ALTER TABLE
    "games" ADD CONSTRAINT "games_game_id_foreign" FOREIGN KEY("game_id") REFERENCES "game_events"("game_id");

CREATE TABLE "players" (
    "player_id" INTEGER PRIMARY KEY,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "last_season" INTEGER,
    "current_club_id" INTEGER,
    "player_code" VARCHAR(100) NOT NULL,
    "country_of_birth" VARCHAR(50) NOT NULL,
    "city_of_birth" VARCHAR(50) NOT NULL,
    "country_of_citizenship" VARCHAR(50) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "sub_position" VARCHAR(50) NOT NULL,
    "position" VARCHAR(50) NOT NULL,
    "foot" foot_used NOT NULL,
    "height_in_cm" INTEGER,
    "contract_expiration_date" DATE,
    "agent_name" VARCHAR(100),
    "image_url" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL

    FOREIGN KEY ("current_club_id") REFERENCES "clubs"("club_id")
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE "player_valuations" (
    "player_id" INTEGER,
    "datetime" DATETIME,
    "market_value_in_eur" INTEGER NOT NULL,
    "highest_market_value_in_eur" INTEGER NOT NULL,
    "current_club_id" INTEGER NOT NULL,

    PRIMARY KEY ("player_id", "datetime"),
    FOREIGN KEY ("player_id") REFERENCES "players"("player_id")
);