import flask
import sqlalchemy
from sqlalchemy import text
from flask import render_template, request, jsonify
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
from flask import send_file
import flask
import sqlalchemy
from sqlalchemy import text
from flask import render_template, request, jsonify
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
from flask import send_file


app = flask.Flask(__name__)


def get_data(query):
    connection_string = 'postgresql://postgres:Pablo95@localhost:5432/project3_db'
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
# Define route to render the first visualization
@app.route('/visualization1')
def visualization1():
    # Generate the visualization using seaborn
    sns.set_theme()
    # Render the HTML template containing the visualization
    return render_template('smmh.html')

# Define route to render the second visualization
# Function to retrieve data from the SQL database

# Route to retrieve and process the data for visualization2
@app.route('/visualization2/data')
def visualization2_data():
    query = "SELECT occupation, frequency, distraction, restlessness, anxiety, concentration, self_compassion, sleeplessness, activity_interest_var, depression  FROM project3_data"
    # Retrieve data from the database
    data = get_data(query)
    # Convert the data to a DataFrame
    df = pd.DataFrame(data, columns=['Occupation', 'Frequency', 'Distraction', 'Restlessness', 'Anxiety', 'ConcentrationDifficulty', 'SelfCompassion', 'Sleeplessness', 'ActivityInterest', 'Depression'])
    # Group the data by 'Occupation' and calculate the median for each column
    occupation_results = df.groupby('Occupation')[['Frequency', 'Distraction','Restlessness','Anxiety','ConcentrationDifficulty','SelfCompassion','Sleeplessness','ActivityInterest', 'Depression']].median().reset_index()

    # Melt the DataFrame to long format for Plotly visualization
    melted_df = pd.melt(occupation_results, id_vars='Occupation', var_name='MentalHealth', value_name='Score')

    # Convert the melted dataframe to a dictionary for JSON serialization
    data = melted_df.to_dict(orient='records')

    #Return the processed data as JSON
    return jsonify(data)

# @app.route('/visualization3/data')
# def visualization3_data():
#     # Query your database or process data as needed
#     query = "SELECT occupation, frequency, distraction, restlessness, anxiety, concentration, self_compassion, sleeplessness, activity_interest_var, depression  FROM project3_data"
#     # Retrieve data from the database
#     data = get_data(query)

#     # Convert data to JSON format
#     # Example:
#     json_data = [{'Occupation': row[0], 'SomeColumn': row[1]} for row in data]

#     return jsonify(json_data)

if __name__ == "__main__":
    app.run(host= 'localhost', debug=True)