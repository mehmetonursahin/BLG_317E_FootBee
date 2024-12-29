from flask import  request
from math import ceil

def pagination(total_count, size=10):
    """
        Total count must be under column "total"
    """
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', size))
    offset = (page - 1) * per_page
    # cursor.execute(sql)
    # total_count = cursor.fetchone()['total']
    total_pages = ceil(total_count / per_page)
    return page, per_page, offset, total_pages

def get_order_by_clause(default_column):
    #  example 
    # http://localhost:3000/games?sort=home_club_name:ASC,date:DESC
    
    sort_param = request.args.get('sort')
    
    if not sort_param:
        # Default sorting if no sort parameter is provided
        return f"{default_column} ASC"
    
    try:
        # Parse the sort parameter
        sort_clauses = []
        for sort_pair in sort_param.split(","):
            column, direction = sort_pair.split(":")
            direction = direction.upper()  # Ensure the direction is in uppercase (ASC or DESC)
            if direction not in ["ASC", "DESC"]:
                raise ValueError(f"Invalid sort direction: {direction}")
            sort_clauses.append(f"{column} {direction}")
        
        # Join all sort clauses into a single ORDER BY string
        return ", ".join(sort_clauses)
    
    except Exception as e:
        raise ValueError(f"Invalid sort parameter: {sort_param}. Error: {str(e)}")

    