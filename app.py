import flask
import sqlalchemy
from sqlalchemy import text

app = flask.Flask(__name__)

def get_data():
    # Create a connection to the database
    connection_string = 'postgresql://postgres:postgres@localhost:5432/proj3_db'
    # Create the engine
    engine = sqlalchemy.create_engine(connection_string)
    # Establish a connection
    conn = engine.connect()
    # Execute a query to fetch data from the database
    query = "SELECT * FROM smmh_data"
    result = conn.execute(text(query))
    # Fetch the data
    data = result.fetchall()
    print(data)
    # Close the connection
    conn.close()
    return data

# @app.route('/')
# def main():
#     return flask.render_template('index.html')

@app.route('/social')
def get_social():
    data = get_data()
    cols = ["Age", "Gender", "RelationshipStatus", "Occupation", "Organization", "SocialMedia", "SocialMediaPlatforms", "NumberofSocialMediaPlatforms", "HoursSpent", "Frequency", "Distraction", "Restlessness", "Anxiety", "ConcentrationDifficulty", "SelfComparision", "PostSentiment", "ValidationSeeking", "Depression", "ActivityInterest", "Sleeplessness", "Reddit", "YouTube", "Snapchat", "Pinterest", "TikTok", "Instagram", "Discord", "Facebook", "Twitter", "two_to_five_hrs", "less_than_two_hrs", "more_than_five_hr"]
    all_data = []
    for record in data:
        data_json = {}
        # for i, col in enumerate(cols):
        #     data_json[col] = record[i]
        #     all_data.append(data_json)
        all_data.append(dict(record._mapping))
    
    return flask.jsonify(all_data)

if __name__ == "__main__":
    app.run(host='localhost', debug=True)
    