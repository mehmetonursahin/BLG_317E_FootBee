from flask import render_template, current_app
from datetime import datetime

def home_page():
    return render_template("homepage.html")