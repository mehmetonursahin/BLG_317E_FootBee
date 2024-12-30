from flask import Blueprint, request, jsonify, current_app
from db.connection import get_db
from routes.helper import *

bp = Blueprint('games_events', __name__)

def update_goal_counts(game_id):
    """
    Update the goal counts for a game based on the current game_events.
    """
    db = get_db()
    cursor = db.cursor()
    try:
        # Count goals for home and away clubs
        query = """
            SELECT 
                g.home_club_id,
                g.away_club_id,
                SUM(CASE WHEN e.club_id = g.home_club_id AND e.type = 'Goals' THEN 1 ELSE 0 END) AS home_goals,
                SUM(CASE WHEN e.club_id = g.away_club_id AND e.type = 'Goals' THEN 1 ELSE 0 END) AS away_goals
            FROM games g
            LEFT JOIN game_events e ON g.game_id = e.game_id
            WHERE g.game_id = %s
            GROUP BY g.home_club_id, g.away_club_id
        """
        cursor.execute(query, (game_id,))
        result = cursor.fetchone()

        if result:
            home_goals, away_goals = result[2], result[3]
            # Update the goals in the games table
            update_query = """
                UPDATE games
                SET home_club_goals = %s,
                    away_club_goals = %s
                WHERE game_id = %s
            """
            cursor.execute(update_query, (home_goals, away_goals, game_id))
            db.commit()
    finally:
        cursor.close()

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
            data.get('description'),
            data.get('player_in_id')
        ))
        db.commit()
        update_goal_counts(data['game_id'])
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
        # Get the current game_id before update
        cursor.execute("SELECT game_id FROM game_events WHERE game_event_id = %s", (game_event_id,))
        existing_event = cursor.fetchone()
        if not existing_event:
            return jsonify({'error': 'Game event not found'}), 404
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

        # Update goals for the old and new game_id if they differ
        update_goal_counts(existing_event[0])
        if existing_event[0] != data['game_id']:
            update_goal_counts(data['game_id'])

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
        # Get the game_id before deletion
        cursor.execute("SELECT game_id FROM game_events WHERE game_event_id = %s", (game_event_id,))
        existing_event = cursor.fetchone()

        if not existing_event:
            return jsonify({'error': 'Game event not found'}), 404

        cursor.execute("DELETE FROM game_events WHERE game_event_id = %s", (game_event_id,))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Game event not found'}), 404

        # Update goals for the associated game
        update_goal_counts(existing_event[0])

        return jsonify({'message': 'Game event deleted'})
    finally:
        cursor.close()
        db.close()
