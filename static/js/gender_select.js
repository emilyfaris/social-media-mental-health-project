// Uses Plotly library. Add in the header section:
  // <script src="https://cdn.plot.ly/plotly-latest.min.js"></script> 


// Add in body section:
  // <label for="genderSelect">Select Gender:</label>
//   <select id="genderSelect">
//   <option value="">Select a gender</option>
//   <option value="Male">Male</option>
//   <option value="Female">Female</option>
//   <option value="Non binary">Non binary</option>
// </select>
// <div id="chart"></div>

// <script src="{{url_for('static', filename='js/gender_select.js')}}"></script>

document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('genderSelect');
    const chartDiv = document.getElementById('chart');

    selectElement.addEventListener('change', function() {
        const gender = this.value;
        if (gender) {
            fetch(`/gender_data?gender=${gender}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const selectedData = data.find(d => d.gender === gender);
                        const categories = Object.keys(selectedData).filter(k => k !== 'gender');
                        const values = categories.map(key => parseFloat(selectedData[key]));

                        const dataTrace = {
                            x: categories,
                            y: values,
                            type: 'bar',
                            marker: {color: 'teal'}
                        };

                        const layout = {
                            title: `Average Scores for ${gender}`,
                            xaxis: {title: 'Category'},
                            yaxis: {title: 'Average Score', range: [0, 5]},
                            margin: {t: 30}
                        };

                        Plotly.newPlot(chartDiv, [dataTrace], layout);
                    } else {
                        chartDiv.innerHTML = '<p>No data available for the selected gender.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    chartDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
                });
        }
    });
});
