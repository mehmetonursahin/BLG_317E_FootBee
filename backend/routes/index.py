from flask import Blueprint, request, jsonify, current_app
from db.connection import get_db
from math import ceil
from routes.helper import *

bp = Blueprint('index', __name__)

@bp.route('/games', methods=['GET'],strict_slashes=False)
def get_games():
    # every api should call this 
    # there is no need to think smart for this :) 
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # current_app.logger.info(request.args)
    
    query = "SELECT COUNT(*) as total from games"
    page,per_page,offset,total_count,total_pages = pagination(cursor, query, size=20)
    
    order_by_clause = get_order_by_clause("game_id")
    # current_app.logger.info(order_by_clause)
    
    #get requested games ordered and with pagination    
    query = f"SELECT * FROM games ORDER BY {order_by_clause} LIMIT {per_page} OFFSET {offset}"
    cursor.execute(query)
    games = cursor.fetchall()
    #close connections    
    cursor.close()
    db.close()

    return jsonify({
        'games': games,
        'page': page,
        'per_page': per_page,
        'total_pages': total_pages,
        'total_count': total_count
    })
