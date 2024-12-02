from flask import  request
from math import ceil

def pagination(cursor, sql, size=10):
    """
        Total count must be under column "total"
    """
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', size))
    offset = (page - 1) * per_page
    cursor.execute(sql)
    total_count = cursor.fetchone()['total']
    total_pages = ceil(total_count / per_page)
    return page, per_page, offset, total_count, total_pages

def get_order_by_clause(default_column):
    sort_columns = request.args.getlist('sort_by')
    sort_directions = request.args.getlist('sort_direction')
    # Default sorting if no parameters are in url
    if not sort_columns or not sort_directions:
        sort_columns = [default_column]
        sort_directions = ['ASC']
    if len(sort_columns) != len(sort_directions):
        raise Exception(f"Ordering paramater list differ in length")
    # returns a string like : game_id asc, attendance asc
    return ", ".join([f"{column} {direction}" for column,direction in zip(sort_columns, sort_directions)])
    