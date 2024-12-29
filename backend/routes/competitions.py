from flask import Blueprint, request, jsonify
from db.connection import get_db
from routes.helper import *
bp = Blueprint('competitions', __name__)

# GET
@bp.route('/<string:competition_id>', methods=['GET'])
def get_competition(competition_id):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT competitions.*, clubs.name AS club_name, clubs.stadium_name, clubs.club_id
            FROM competitions 
            LEFT JOIN clubs ON competitions.domestic_league_code = clubs.domestic_competition 
            WHERE competitions.competition_id = %s
        """, (competition_id,))
        
        competition = cursor.fetchall()  # Use fetchall() to get all clubs related to the competition
        
        if competition:
            # Extract competition data (excluding club-related fields)
            competition_data = {
                'competition_id': competition[0]['competition_id'],
                'competition_code': competition[0]['competition_code'],
                'name': competition[0]['name'],
                'sub_type': competition[0]['sub_type'],
                'type': competition[0]['type'],
                'country_name': competition[0]['country_name'] if competition[0]['country_name'] else "International",
                'domestic_league_code': competition[0]['domestic_league_code'],
                'confederation': competition[0]['confederation'],
                'url': competition[0]['url']
            }

            # Create a list of clubs associated with the competition
            clubs_data = []
            for row in competition:
                clubs_data.append({
                    'club_name': row['club_name'],
                    'stadium_name': row['stadium_name'],
                    'club_id': row['club_id']
                })

            return jsonify({
                'competition': competition_data,
                'clubs': clubs_data
            })
        else:
            return jsonify({'error': 'Competition not found'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()  # Ensure cursor is closed even if there’s an error
        db.close()  # Ensure database connection is closed




# POST
@bp.route('/', methods=['POST'])
def create_competition():
    data = request.json
    print(data)
    if not data:
        return jsonify({'error': 'Invalid data provided'}), 400
    
    db = get_db()
    cursor = db.cursor()
    try:    
        cursor.execute("""
            INSERT INTO competitions (
                competition_id, competition_code, name, sub_type, type,
                country_name, domestic_league_code, confederation, url
            ) VALUES (
                %(competition_id)s, %(competition_code)s, %(name)s, %(sub_type)s, %(type)s,
                %(country_name)s, %(domestic_league_code)s, %(confederation)s, %(url)s
            )
        """, data)
        db.commit()
        return jsonify({'message': 'Competition created successfully', 'id': cursor.lastrowid}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# PUT
@bp.route('/<string:competition_id>', methods=['PUT'])
def update_competition(competition_id):
    data = request.json
    data = data['competition']
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            UPDATE competitions SET
                competition_code = %(competition_code)s, name = %(name)s,
                sub_type = %(sub_type)s, type = %(type)s, country_name = %(country_name)s,
                domestic_league_code = %(domestic_league_code)s, confederation = %(confederation)s,
                url = %(url)s
            WHERE competition_id = %(competition_id)s
        """, {**data, 'competition_id': competition_id})
        db.commit()
        return jsonify({'message': 'Competition updated successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()

# DELETE
@bp.route('/<string:competition_id>', methods=['DELETE'])
def delete_competition(competition_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM competitions WHERE competition_id = %s", (competition_id,))
        db.commit()
        return jsonify({'message': 'Competition deleted successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()
