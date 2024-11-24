from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

import views

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",            #Enter your local database username here
            password="asd1234",     #Enter your local database password here
            database="footbee"
        )
    except Exception as e:
        return f"Error connecting to database: {e}", 500
        
    return connection

def create_app():
    app = Flask(__name__)
    app.config.from_object("settings")
    
    app.add_url_rule("/", view_func=views.home_page)
    app.add_url_rule("/clubs", view_func=views.clubs_page)
    app.add_url_rule("/players", view_func=views.players_page)
    app.add_url_rule("/games", view_func=views.games_page)
    app.add_url_rule("/competitions", view_func=views.competitions_page)

    return app


if __name__ == "__main__":
    app = create_app()
    port=app.config.get("PORT", 5000)
    debug=app.config.get("DEBUG", True)
    app.run(host="0.0.0.0", port=port, debug=debug)