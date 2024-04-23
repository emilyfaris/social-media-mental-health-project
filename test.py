mport sqlalchemy
from sqlalchemy import text
from flask import render_template, request, jsonify
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
@app.route('/age&platform_data')
def get_age_and_platform():
    data = get_data("""
SELECT
    CASE
        WHEN age BETWEEN 0 AND 17 THEN '0-17'
        WHEN age BETWEEN 18 AND 24 THEN '18-24'
        WHEN age BETWEEN 25 AND 34 THEN '25-34'
        WHEN age BETWEEN 35 AND 44 THEN '35-44'
        WHEN age BETWEEN 45 AND 54 THEN '45-54'
        WHEN age BETWEEN 55 AND 64 THEN '55-64'
        ELSE '65+'
    END AS age_bracket,
    AVG(reddit) AS reddit,
    AVG(youtube) AS youtube,
    AVG(snapchat) AS snapchat,
    AVG(pinterest) AS pinterest,
    AVG(tiktok) AS tiktok,
    AVG(instagram) AS instagram,
    AVG(discord) AS discord,
    AVG(facebook) AS facebook,
    AVG(twitter) AS twitter
FROM smmh_data
GROUP BY age_bracket
ORDER BY MIN(age)""")
    heatmap_data = []
    for record in data:
        heatmap_data.append(dict(record._mapping))
    return flask.jsonify(heatmap_data)
@app.route('/gender_data')
def get_gender_data():
    data = get_data("""
    SELECT
        gender,
        AVG(frequency) AS frequency,
        AVG(distraction) AS distraction,
        AVG(restlessness) AS restlessness,
        AVG(anxiety) AS anxiety,
        AVG(concentration) AS concentration,
        AVG(self_compassion) AS self_compassion,
        AVG(post_sentiment) AS post_sentiment,
        AVG(validation_seeking) AS validation_seeking,
        AVG(depression) AS depression,
        AVG(activity_interest_var) AS activity_interest_var,
        AVG(sleeplessness) AS sleeplessness
    FROM smmh_data
    GROUP BY gender;
""")
    gender_data = []
    for record in data:
        gender_data.append(dict(record._mapping))
    return flask.jsonify(gender_data)
@app.route('/hours_data')
def get_hours_data():
    data = get_data("""
    SELECT
        hours_spent,
        AVG(frequency) AS frequency,
        AVG(distraction) AS distraction,
        AVG(restlessness) AS restlessness,
        AVG(anxiety) AS anxiety,
        AVG(concentration) AS concentration,
        AVG(self_compassion) AS self_compassion,
        AVG(post_sentiment) AS post_sentiment,
        AVG(validation_seeking) AS validation_seeking,
        AVG(depression) AS depression,
        AVG(activity_interest_var) AS activity_interest_var,
        AVG(sleeplessness) AS sleeplessness
    FROM smmh_data
    GROUP BY hours_spent;
""")
    hours_data = []
    for record in data:
        hours_data.append(dict(record._mapping))
    return flask.jsonify(hours_data)
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
    return jsonify(platform_data)
if __name__ == "__main__":
    app.run(host='localhost', debug=True)