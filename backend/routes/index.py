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


@bp.route('/players', methods=['GET'], strict_slashes=False)
def get_players():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    query = "SELECT COUNT(*) as total FROM players"
    page, per_page, offset, total_count, total_pages = pagination(cursor, query, size=20)
    
    order_by_clause = get_order_by_clause("player_id")
    
    query = f"SELECT * FROM players inner join clubs on players.current_club_id = clubs.club_id ORDER BY {order_by_clause} LIMIT {per_page} OFFSET {offset}"
    cursor.execute(query)
    players = cursor.fetchall()
    
    cursor.close()
    db.close()

    return jsonify({
        'players': players,
        'page': page,
        'per_page': per_page,
        'total_pages': total_pages,
        'total_count': total_count
    })
    
@bp.route('/clubs', methods=['GET'], strict_slashes=False)
def get_clubs():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # # Toplam kayıt sayısını al
    # query = "SELECT COUNT(*) as total FROM clubs WHERE name <> 'null'"
    # page, per_page, offset, total_count, total_pages = pagination(cursor, query, size=20)
    
    # # Sıralama kriterini belirle
    # order_by_clause = get_order_by_clause("club_id")
    
    # # Kulüpleri sıralı ve sayfalama ile getir
    # query = f"SELECT * FROM clubs WHERE name <> 'null' ORDER BY {order_by_clause} LIMIT {per_page} OFFSET {offset}"
    query = "SELECT * FROM clubs WHERE name <> 'null' ORDER BY club_id"
    cursor.execute(query)
    clubs = cursor.fetchall()
    
    # Bağlantıları kapat
    cursor.close()
    db.close()

    return jsonify({
        'clubs': clubs,
        # 'page': page,
        # 'per_page': per_page,
        # 'total_pages': total_pages,
        # 'total_count': total_count
    })