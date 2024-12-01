from flask import Flask, render_template, request, redirect, url_for

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
    
    return app


if __name__ == "__main__":
    app = create_app()
    port=app.config.get("PORT", 5000)
    debug=app.config.get("DEBUG", True)
    app.run(host="0.0.0.0", port=port, debug=debug)