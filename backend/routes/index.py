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
    
        # filtering 
    filter_query = "WHERE 1 = 1"
    filters = {
        "game_id" : "=",
        "competition_id" : "=",
        "competition_type" : "=",
        "round": "=",
        "home_club_id": "=",
        "away_club_id" : "=", 
        "home_club_goals" : "=",
        "away_club_goals" : "=",
        "season_start": ">=",
        "season_end" : "<=",
        "date_start" : ">=",
        "date_end" : "<=",
        "attendance_start" : ">=",
        "attendance_end" : "<=",
        "home_club_name": "LIKE",
        "away_club_name" : "LIKE", 
        "home_club_manager_name": "LIKE",
        "away_club_manager_name": "LIKE",
        "stadium" : "LIKE",
        "referee" : "LIKE",
    }
    params = []
    for filter_key, filter_operator in filters.items():
        filter_val = request.args.get(filter_key, None)
        if filter_val:
            #  this part will remove the start and end keywords from filter_key
            filter_key_words = filter_key.split('_')
            filter_key = "_".join(filter_key_words[:-1]) if filter_key_words[-1] in ["start", "end"] else filter_key
            # concatenate the filter with AND 
            filter_query += f" AND {filter_key} {filter_operator} %s"
            
            if filter_operator == "LIKE":
                filter_val = f"%{filter_val}%"
            params.append(filter_val)
    current_app.logger.info(filter_query)
    query = f"SELECT COUNT(*) as total from games {filter_query}"
    cursor.execute(query, params)
    total_count = cursor.fetchone()['total']
    page,per_page,offset,total_pages = pagination(total_count, size=20)
    order_by_clause = get_order_by_clause("game_id")
    # current_app.logger.info(order_by_clause)
    

    #get requested games ordered and with pagination    
    query = f"SELECT * FROM games {filter_query} ORDER BY {order_by_clause} LIMIT {per_page} OFFSET {offset}"
    cursor.execute(query, params)
    games = cursor.fetchall()
    #close connections    
    cursor.close()
    db.close()

    return jsonify({
        'games': games,
        'page': page,
        'per_page': per_page,
        'offset' : offset,
        'total_pages': total_pages,
        'total_count': total_count
    })


@bp.route('/players', methods=['GET'], strict_slashes=False)
def get_players():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    query = "SELECT COUNT(*) as total FROM players"
    cursor.execute(query)
    total_count = cursor.fetchone()['total']
    page,per_page,offset,total_pages = pagination(total_count, size=20)
    
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
    
@bp.route('/competitions', methods=['GET'], strict_slashes=False)
def get_competitions():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    # # Toplam kayıt sayısını al
    # query = "SELECT COUNT(*) as total FROM clubs WHERE name <> 'null'"
    # page, per_page, offset, total_count, total_pages = pagination(cursor, query, size=20)
    
    # # Sıralama kriterini belirle
    # order_by_clause = get_order_by_clause("club_id")
    
    # # Kulüpleri sıralı ve sayfalama ile getir
    # query = f"SELECT * FROM clubs WHERE name <> 'null' ORDER BY {order_by_clause} LIMIT {per_page} OFFSET {offset}"
    query = "SELECT * FROM competitions ORDER BY competition_id"
    cursor.execute(query)
    competitions = cursor.fetchall()
    
    # Bağlantıları kapat
    cursor.close()
    db.close()

    return jsonify({
        'competitions': competitions,
        # 'page': page,
        # 'per_page': per_page,
        # 'total_pages': total_pages,
        # 'total_count': total_count
    })