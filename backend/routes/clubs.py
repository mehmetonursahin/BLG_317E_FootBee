from flask import Blueprint, request, jsonify
from db.connection import get_db
from routes.helper import *
bp = Blueprint('clubs', __name__)

# GET
@bp.route('/<int:club_id>', methods=['GET'])
def get_club(club_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clubs WHERE club_id = %s", (club_id,))
    club = cursor.fetchone()
    
    if club:
        return jsonify(club)
    else:
        return jsonify({'error': 'Club not found'}), 400
    cursor.close()
    db.close()

# POST
@bp.route('/', methods=['POST'])
def create_club():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO clubs (
                club_id, club_code, name, domestic_competition, total_market_value,
                squad_size, average_age, foreigners_number, foreigners_percent,
                national_team_players, stadium_name, stadium_seats, net_transfer_record,
                coach_name, url
            ) VALUES (
                %(club_id)s, %(club_code)s, %(name)s, %(domestic_competition)s, %(total_market_value)s,
                %(squad_size)s, %(average_age)s, %(foreigners_number)s, %(foreigners_percent)s,
                %(national_team_players)s, %(stadium_name)s, %(stadium_seats)s, %(net_transfer_record)s,
                %(coach_name)s, %(url)s
            )
        """, data)
        db.commit()
        return jsonify({'message': 'Club created successfully', 'id': cursor.lastrowid}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# UPDATE
@bp.route('/<int:club_id>', methods=['PUT'])
def update_club(club_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE clubs SET
                club_code = %(club_code)s, name = %(name)s,
                domestic_competition = %(domestic_competition)s, total_market_value = %(total_market_value)s,
                squad_size = %(squad_size)s, average_age = %(average_age)s,
                foreigners_number = %(foreigners_number)s, foreigners_percent = %(foreigners_percent)s,
                national_team_players = %(national_team_players)s, stadium_name = %(stadium_name)s,
                stadium_seats = %(stadium_seats)s, net_transfer_record = %(net_transfer_record)s,
                coach_name = %(coach_name)s, url = %(url)s
            WHERE club_id = %(club_id)s
        """, {**data, 'club_id': club_id})
        db.commit()
        return jsonify({'message': 'Club updated successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# DELETE
@bp.route('/<int:club_id>', methods=['DELETE'])
def delete_club(club_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM clubs WHERE club_id = %s", (club_id,))
        db.commit()
        return jsonify({'message': 'Club deleted successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()
