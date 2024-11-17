from flask import render_template, current_app
from datetime import datetime

# Example data for each page
clubs_data = [
    {"id": 1, "name": "Arsenal", "competition": "EPL", "market_value": "€800M", "squad_size": 25, "stadium": "Emirates Stadium"},
    {"id": 2, "name": "Barcelona", "competition": "La Liga", "market_value": "€850M", "squad_size": 23, "stadium": "Camp Nou"},
    {"id": 3, "name": "Real Madrid", "competition": "La Liga", "market_value": "€1.1B", "squad_size": 26, "stadium": "Santiago Bernabéu"},
    {"id": 4, "name": "Liverpool", "competition": "EPL", "market_value": "€950M", "squad_size": 24, "stadium": "Anfield"},
    {"id": 5, "name": "Bayern Munich", "competition": "Bundesliga", "market_value": "€950M", "squad_size": 27, "stadium": "Allianz Arena"},
    {"id": 6, "name": "Juventus", "competition": "Serie A", "market_value": "€700M", "squad_size": 28, "stadium": "Allianz Stadium"},
    {"id": 7, "name": "Manchester City", "competition": "EPL", "market_value": "€1.25B", "squad_size": 25, "stadium": "Etihad Stadium"},
    {"id": 8, "name": "Paris Saint-Germain", "competition": "Ligue 1", "market_value": "€1.05B", "squad_size": 24, "stadium": "Parc des Princes"},
    {"id": 9, "name": "Chelsea", "competition": "EPL", "market_value": "€900M", "squad_size": 29, "stadium": "Stamford Bridge"},
    {"id": 10, "name": "Atletico Madrid", "competition": "La Liga", "market_value": "€750M", "squad_size": 25, "stadium": "Wanda Metropolitano"},
]

players_data = [
    {"id": 1, "name": "Lionel Messi", "position": "Forward", "age": 36, "club": "Inter Miami", "nationality": "Argentina"},
    {"id": 2, "name": "Cristiano Ronaldo", "position": "Forward", "age": 38, "club": "Al-Nassr", "nationality": "Portugal"},
    {"id": 3, "name": "Kylian Mbappé", "position": "Forward", "age": 24, "club": "PSG", "nationality": "France"},
    {"id": 4, "name": "Kevin De Bruyne", "position": "Midfielder", "age": 32, "club": "Manchester City", "nationality": "Belgium"},
    {"id": 5, "name": "Erling Haaland", "position": "Forward", "age": 23, "club": "Manchester City", "nationality": "Norway"},
    {"id": 6, "name": "Virgil van Dijk", "position": "Defender", "age": 32, "club": "Liverpool", "nationality": "Netherlands"},
    {"id": 7, "name": "Robert Lewandowski", "position": "Forward", "age": 35, "club": "Barcelona", "nationality": "Poland"},
    {"id": 8, "name": "Luka Modric", "position": "Midfielder", "age": 38, "club": "Real Madrid", "nationality": "Croatia"},
    {"id": 9, "name": "Harry Kane", "position": "Forward", "age": 30, "club": "Bayern Munich", "nationality": "England"},
    {"id": 10, "name": "Gavi", "position": "Midfielder", "age": 19, "club": "Barcelona", "nationality": "Spain"},
]

games_data = [
    {"id": 1, "home": "Arsenal", "away": "Chelsea", "score": "2-1", "date": "2024-11-01"},
    {"id": 2, "home": "Barcelona", "away": "Real Madrid", "score": "3-2", "date": "2024-11-05"},
    {"id": 3, "home": "Liverpool", "away": "Manchester City", "score": "1-1", "date": "2024-11-10"},
    {"id": 4, "home": "PSG", "away": "Bayern Munich", "score": "0-0", "date": "2024-11-12"},
    {"id": 5, "home": "Juventus", "away": "Napoli", "score": "2-3", "date": "2024-11-15"},
    {"id": 6, "home": "Inter Milan", "away": "Roma", "score": "2-0", "date": "2024-11-17"},
    {"id": 7, "home": "Atletico Madrid", "away": "Valencia", "score": "3-1", "date": "2024-11-18"},
    {"id": 8, "home": "Tottenham", "away": "West Ham", "score": "4-2", "date": "2024-11-20"},
    {"id": 9, "home": "AC Milan", "away": "Fiorentina", "score": "1-0", "date": "2024-11-21"},
    {"id": 10, "home": "Sevilla", "away": "Betis", "score": "2-2", "date": "2024-11-23"},
]

competitions_data = [
    {"id": 1, "name": "Premier League", "country": "England", "type": "Domestic League"},
    {"id": 2, "name": "La Liga", "country": "Spain", "type": "Domestic League"},
    {"id": 3, "name": "Bundesliga", "country": "Germany", "type": "Domestic League"},
    {"id": 4, "name": "Serie A", "country": "Italy", "type": "Domestic League"},
    {"id": 5, "name": "Ligue 1", "country": "France", "type": "Domestic League"},
    {"id": 6, "name": "Champions League", "country": "Europe", "type": "Continental Cup"},
    {"id": 7, "name": "Europa League", "country": "Europe", "type": "Continental Cup"},
    {"id": 8, "name": "World Cup", "country": "International", "type": "International Tournament"},
    {"id": 9, "name": "Copa America", "country": "South America", "type": "International Tournament"},
    {"id": 10, "name": "Euro Cup", "country": "Europe", "type": "International Tournament"},
]


# Page views
def home_page():
    return render_template("index.html")

def clubs_page():
    return render_template("clubs.html", clubs=clubs_data)

def players_page():
    return render_template("player.html", players=players_data)

def games_page():
    return render_template("games.html", games=games_data)

def competitions_page():
    return render_template("competitions.html", competitions=competitions_data)
