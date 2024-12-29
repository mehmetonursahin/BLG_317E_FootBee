from flask import Blueprint, request, jsonify, current_app
from db.connection import get_db
from routes.helper import *
bp = Blueprint('games', __name__)

# GET
@bp.route('/<int:game_id>', methods=['GET'])
def get_game(game_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM games WHERE game_id = %s", (game_id,))
        game = cursor.fetchone()
        cursor.execute("SELECT * FROM game_events WHERE game_id = %s ", (game_id,))
        game_events = cursor.fetchall()
        if game:
            return jsonify({
                'game' : game,
                'game_events' : game_events
            })
        else:
            return jsonify({'error': 'Game not found'}), 400
    finally:
        cursor.close()
        db.close()
        

# POST
@bp.route('/', methods=['POST'])
def create_game():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        # post request sent from frontend should have same keys as table description 
        cursor.execute("""
            INSERT INTO games (
                game_id, competition_id, season, round, date,
                home_club_id, away_club_id, home_club_goals,
                away_club_goals, home_club_position, away_club_position,
                home_club_manager_name, away_club_manager_name, stadium,
                attendance, referee, url, home_club_name, away_club_name,
                aggregate, competition_type
            ) VALUES (
                %(game_id)s, %(competition_id)s, %(season)s, %(round)s, %(date)s,
                %(home_club_id)s, %(away_club_id)s, %(home_club_goals)s,
                %(away_club_goals)s, %(home_club_position)s, %(away_club_position)s,
                %(home_club_manager_name)s, %(away_club_manager_name)s, %(stadium)s,
                %(attendance)s, %(referee)s, %(url)s, %(home_club_name)s,
                %(away_club_name)s, %(aggregate)s, %(competition_type)s
            )
        """, data)
        db.commit()
        return jsonify({'message': 'Game created succesfully', 'id': cursor.lastrowid}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()


# UPDATE
@bp.route('/<int:game_id>', methods=['PUT'])
def update_game(game_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE games SET
                competition_id = %(competition_id)s, season = %(season)s,
                round = %(round)s, date = %(date)s, home_club_id = %(home_club_id)s,
                away_club_id = %(away_club_id)s, home_club_goals = %(home_club_goals)s,
                away_club_goals = %(away_club_goals)s, home_club_position = %(home_club_position)s,
                away_club_position = %(away_club_position)s, home_club_manager_name = %(home_club_manager_name)s,
                away_club_manager_name = %(away_club_manager_name)s, stadium = %(stadium)s,
                attendance = %(attendance)s, referee = %(referee)s, url = %(url)s,
                home_club_name = %(home_club_name)s, away_club_name = %(away_club_name)s,
                aggregate = %(aggregate)s, competition_type = %(competition_type)s
            WHERE game_id = %(game_id)s
        """, {**data, 'game_id': game_id})
        db.commit()
        return jsonify({'message': 'Game updated successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# DELETE
@bp.route('/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM games WHERE game_id = %s", (game_id,))
        db.commit()
        return jsonify({'message': 'Game deleted successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()