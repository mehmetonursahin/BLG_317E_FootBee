
from flask import Blueprint, request, jsonify
from db.connection import get_db

bp = Blueprint('appearances', __name__)

# GET: Belirli bir oyuncunun appearances listesini al
@bp.route('/<int:player_id>', methods=['GET'])
def get_appearances(player_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT *
            FROM appearances
            WHERE player_id = %s
        """, (player_id,))
        appearances = cursor.fetchall()
        return jsonify(appearances)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# POST: Yeni bir appearance ekle
@bp.route('/', methods=['POST'])
def add_appearance():
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO appearances (
                appearance_id, game_id, player_id, player_club_id, player_current_club_id,
                date, player_name, competition_id, yellow_cards, red_cards,
                goals, assists, minutes_played
            ) VALUES (
                %(appearance_id)s, %(game_id)s, %(player_id)s, %(player_club_id)s, %(player_current_club_id)s,
                %(date)s, %(player_name)s, %(competition_id)s, %(yellow_cards)s, %(red_cards)s,
                %(goals)s, %(assists)s, %(minutes_played)s
            )
        """, data)
        db.commit()
        return jsonify({'message': 'Appearance added successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# PUT: Var olan bir appearance'ı güncelle
@bp.route('/<int:appearance_id>', methods=['PUT'])
def update_appearance(appearance_id):
    data = request.json
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE appearances
            SET
                game_id = %(game_id)s, player_id = %(player_id)s, player_club_id = %(player_club_id)s,
                player_current_club_id = %(player_current_club_id)s, date = %(date)s,
                player_name = %(player_name)s, competition_id = %(competition_id)s,
                yellow_cards = %(yellow_cards)s, red_cards = %(red_cards)s,
                goals = %(goals)s, assists = %(assists)s, minutes_played = %(minutes_played)s
            WHERE appearance_id = %s
        """, {**data, 'appearance_id': appearance_id})
        db.commit()
        return jsonify({'message': 'Appearance updated successfully'}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# DELETE: Bir appearance'ı sil
@bp.route('/<int:appearance_id>', methods=['DELETE'])
def delete_appearance(appearance_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM appearances WHERE appearance_id = %s", (appearance_id,))
        db.commit()
        return jsonify({'message': 'Appearance deleted successfully'}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()
