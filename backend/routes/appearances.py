
from flask import Blueprint, request, jsonify
from db.connection import get_db
from routes.helper import *
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
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Dinamik olarak sütunları ve değerleri oluştur
    columns = []
    values = []
    placeholders = []

    for key, value in data.items():
        columns.append(key)
        placeholders.append(f"%({key})s") 
        values.append(value)

    if not columns:
        return jsonify({'error': 'No fields to insert'}), 400

    query = f"""
        INSERT INTO appearances ({', '.join(columns)})
        VALUES ({', '.join(placeholders)})
    """

    try:
        cursor.execute(query, data)
        db.commit()
        return jsonify({'message': 'Appearance added successfully'}), 201
    except Exception as e:
        print(f"SQL Error: {e}")
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()


@bp.route('/<string:appearance_id>', methods=['GET'])
def get_appearance(appearance_id):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM appearances WHERE appearance_id = %s", (appearance_id,))
        appearance = cursor.fetchone()
        if appearance:
            # Eğer tablo sütunları belirliyse, bunları JSON objesine dönüştürün
            columns = [column[0] for column in cursor.description]
            result = dict(zip(columns, appearance))
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Appearance not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()


# PUT: Var olan bir appearance'ı güncelle
@bp.route('/<string:appearance_id>', methods=['PUT'])
def update_appearance(appearance_id):
    data = request.json  # Gelen JSON verisi
    db = get_db()
    cursor = db.cursor()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    columns_to_update = []
    params = {}

    for key, value in data.items():
        columns_to_update.append(f"{key} = %({key})s")  
        params[key] = value  # Parametreleri doldur

    if not columns_to_update:
        return jsonify({'error': 'No fields to update'}), 400

    query = f"""
        UPDATE appearances
        SET {', '.join(columns_to_update)}
        WHERE appearance_id = %(appearance_id)s
    """
    params['appearance_id'] = appearance_id

    try:
        # SQL sorgusunu çalıştır
        cursor.execute(query, params)
        db.commit()
        return jsonify({'message': 'Appearance updated successfully'}), 200
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        cursor.close()
        db.close()


# DELETE: Bir appearance'ı sil
@bp.route('/<string:appearance_id>', methods=['DELETE'])
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

