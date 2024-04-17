import flask
import sqlalchemy
from sqlalchemy import text


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

@app.route('/data')
def get_social_data():
    data = get_data("SELECT age, AVG(frequency) as avg_freq FROM smmh_data GROUP BY 1")
    ## transfrom data
    cols = ["Age", "Gender", "RelationshipStatus", "Occupation", "Organization", "SocialMedia", "SocialMediaPlatforms", "NumberofSocialMediaPlatforms", "HoursSpent", "Frequency", "Distraction", "Restlessness", "Anxiety", "ConcentrationDifficulty", "SelfComparision", "PostSentiment", "ValidationSeeking", "Depression", "ActivityInterest", "Sleeplessness", "Reddit", "YouTube", "Snapchat", "Pinterest", "TikTok", "Instagram", "Discord", "Facebook", "Twitter", "two_to_five_hrs", "less_than_two_hrs", "more_than_five_hr"]
    # print(data[0])
    all_data = []
    for record in data:
        data_json = {}
        # for i, col in enumerate(cols):
        #     data_json[col] = record[i]
        # all_data.append(data_json)
        all_data.append(dict(record._mapping))

    return flask.jsonify(all_data)

if __name__ == "__main__":
    app.run(host='localhost', debug=True)



