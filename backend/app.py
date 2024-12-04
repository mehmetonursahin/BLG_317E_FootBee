from flask import Flask, render_template, request, redirect, url_for
from routes.games import bp as games_bp
from routes.index import bp as index_bp
from routes.clubs import bp as clubs_bp
from routes.players import bp as players_bp
def load_configs(app):
    import os
    from dotenv import load_dotenv
    load_dotenv()
    app.config['DEBUG'] = os.getenv("DEBUG", "True") == "True"
    app.config['PORT'] = int(os.getenv("PORT", 8080))
    app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST", "localhost")
    app.config['MYSQL_USER'] = os.getenv("MYSQL_USER", "root")
    app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD", "root")
    app.config['MYSQL_DB'] = os.getenv("MYSQL_DB", "footbee")

def create_app():
    app = Flask(__name__)

    # load configs from environment
    load_configs(app)
    
    # blueprints are for registering subroutes
    # this way we can focus on default CRUD api urls 
    # and set all of that blueprint prefix at once
    app.register_blueprint(index_bp)
    app.register_blueprint(games_bp, url_prefix="/games")  # Games routes
    app.register_blueprint(players_bp, url_prefix="/players")
    app.register_blueprint(clubs_bp, url_prefix="/clubs")
    return app


if __name__ == "__main__":
    app = create_app()
    port=app.config.get("PORT", 5000)
    debug=app.config.get("DEBUG", True)
    app.run(host="0.0.0.0", port=port, debug=debug)