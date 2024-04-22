import flask
import sqlalchemy
from sqlalchemy import text
from flask import render_template, jsonify

app = flask.Flask(__name__)
def get_data(query):
    connection_string = 'postgresql://postgres:postgres@localhost:5432/proj3_db'
    # Create the engine
    engine = sqlalchemy.create_engine(connection_string)
    # Establish a connection
    conn = engine.connect()
    result = conn.execute(text(query))
    # Fetch the data
    data = result.fetchall()
    conn.close()
    return data
@app.route('/')
def main():
    return flask.render_template('smmh.html')
@app.route('/data')
def get_social_data():
    data = get_data("SELECT * FROM smmh_data")
    all_data = []
    for record in data:
        all_data.append(dict(record._mapping))
    return flask.jsonify(all_data)

@app.route('/age_select_data')
def get_age_select():
    query = """
    SELECT
        age,
        SUM(CAST(reddit AS INTEGER)) AS reddit,
        SUM(CAST(youtube AS INTEGER)) AS youtube,
        SUM(CAST(snapchat AS INTEGER)) AS snapchat,
        SUM(CAST(pinterest AS INTEGER)) AS pinterest,
        SUM(CAST(tiktok AS INTEGER)) AS tiktok,
        SUM(CAST(instagram AS INTEGER)) AS instagram,
        SUM(CAST(discord AS INTEGER)) AS discord,
        SUM(CAST(facebook AS INTEGER)) AS facebook,
        SUM(CAST(twitter AS INTEGER)) AS twitter
    FROM smmh_data
    GROUP BY age
    ORDER BY age;
    """
    data = get_data(query)
    platform_data = []
    for record in data:
        platform_data.append(dict(record._mapping))
    # platform_data = [dict(record) for record in data]
    return jsonify(platform_data)

if __name__ == "__main__":
    app.run(host='localhost', debug=True)