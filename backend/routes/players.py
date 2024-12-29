from flask import Blueprint, request, jsonify
from db.connection import get_db

bp = Blueprint('players', __name__)

# GET
@bp.route('/<int:player_id>', methods=['GET'])
def get_player(player_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
    SELECT *
    FROM players
    INNER JOIN player_valuations 
        ON players.player_id = player_valuations.player_id
    INNER JOIN clubs
        ON players.current_club_id = clubs.club_id
    WHERE players.player_id = %s
""", (player_id,))


    player = cursor.fetchone()
    
    if player:
        return jsonify(player)
    else:
        return jsonify({'error': 'Player not found'}), 400
    cursor.close()
    db.close()

# POST
@bp.route('/', methods=['POST'])
def create_player():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO players (
                player_id, first_name, last_name, last_season, current_club_id, player_code,
                country_of_birth, city_of_birth, country_of_citizenship, date_of_birth,
                sub_position, position, foot, height_in_cm, contract_expiration_date,
                agent_name, image_url, url
            ) VALUES (
                %(player_id)s, %(first_name)s, %(last_name)s, %(last_season)s, %(current_club_id)s, %(player_code)s,
                %(country_of_birth)s, %(city_of_birth)s, %(country_of_citizenship)s, %(date_of_birth)s,
                %(sub_position)s, %(position)s, %(foot)s, %(height_in_cm)s, %(contract_expiration_date)s,
                %(agent_name)s, %(image_url)s, %(url)s
            )
        """, data)
        db.commit()
        return jsonify({'message': 'Player created successfully', 'id': cursor.lastrowid}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# UPDATE
@bp.route('/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE players SET
                first_name = %(first_name)s, last_name = %(last_name)s,
                last_season = %(last_season)s, current_club_id = %(current_club_id)s,
                player_code = %(player_code)s, country_of_birth = %(country_of_birth)s,
                city_of_birth = %(city_of_birth)s, country_of_citizenship = %(country_of_citizenship)s,
                date_of_birth = %(date_of_birth)s, sub_position = %(sub_position)s,
                position = %(position)s, foot = %(foot)s, height_in_cm = %(height_in_cm)s,
                contract_expiration_date = %(contract_expiration_date)s, agent_name = %(agent_name)s,
                image_url = %(image_url)s, url = %(url)s
            WHERE player_id = %(player_id)s
        """, {**data, 'player_id': player_id})
        db.commit()
        return jsonify({'message': 'Player updated successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# DELETE
@bp.route('/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM players WHERE player_id = %s", (player_id,))
        db.commit()
        return jsonify({'message': 'Player deleted successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()
