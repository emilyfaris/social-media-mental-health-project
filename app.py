import flask
import sqlalchemy 
from sqlalchemy import text

app = flask.Flask(__name__)

def get_data():
    # Replace 'username', 'password', 'host', 'port', and 'database_name' with your PostgreSQL credentials
    # Format: 'postgresql://username:password@host:port/database_name'
    connection_string = 'postgresql://postgres:Pablo95@localhost:5432/project3_db'
    # Create the engine
    engine = sqlalchemy.create_engine(connection_string)
    # Establish a connection
    conn = engine.connect()
    # Execute a query to fetch data from the database
    query = "SELECT * FROM project3_data"
    result = conn.execute(text(query))
    # Fetch the data
    data = result.fetchall()
    conn.close()
    return data
    
@app.route('/data')
def get_social_data():
    data = get_data()
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
    app.run(host= 'localhost', debug=True)