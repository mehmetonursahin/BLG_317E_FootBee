from flask import Blueprint, request, jsonify, current_app
from db.connection import get_db
from routes.helper import *
bp = Blueprint('games_events', __name__)

# GET
@bp.route('/<int:game_event_id>', methods=['GET'])
def get_game_event(game_event_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM game_events WHERE game_event_id = %s", (game_event_id,))
        game_event = cursor.fetchone()

        if game_event:
            return jsonify(game_event)
        else:
            return jsonify({'error': 'Game not found'}), 400
    finally:
        cursor.close()
        db.close()
        
# CREATE a new game_event
@bp.route('/', methods=['POST'])
def create_game_event():
    db = get_db()
    cursor = db.cursor()
    try:
        data = request.json
        query = """
            INSERT INTO game_events (game_id, minute, type, club_id, player_id, description, player_in_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            data['game_id'],
            data['minute'],
            data['type'],
            data['club_id'],
            data['player_id'],
            data.get('description'),  # Allow null values
            data.get('player_in_id')  # Allow null values
        ))
        db.commit()
        return jsonify({'message': 'Game event created', 'game_event_id': cursor.lastrowid}), 201
    finally:
        cursor.close()
        db.close()


# UPDATE an existing game_event by ID
@bp.route('/<int:game_event_id>', methods=['PUT'])
def update_game_event(game_event_id):
    db = get_db()
    cursor = db.cursor()
    try:
        data = request.json
        query = """
            UPDATE game_events
            SET game_id = %s,
                minute = %s,
                type = %s,
                club_id = %s,
                player_id = %s,
                description = %s,
                player_in_id = %s
            WHERE game_event_id = %s
        """
        cursor.execute(query, (
            data['game_id'],
            data['minute'],
            data['type'],
            data['club_id'],
            data['player_id'],
            data.get('description'),
            data.get('player_in_id'),
            game_event_id
        ))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Game event not found'}), 404
        return jsonify({'message': 'Game event updated'})
    finally:
        cursor.close()
        db.close()


# DELETE a game_event by ID
@bp.route('/<int:game_event_id>', methods=['DELETE'])
def delete_game_event(game_event_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM game_events WHERE game_event_id = %s", (game_event_id,))
        db.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Game event not found'}), 404
        return jsonify({'message': 'Game event deleted'})
    finally:
        cursor.close()
        db.close()