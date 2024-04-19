// Uses Plotly library. Add in the header section:
  // <script src="https://cdn.plot.ly/plotly-latest.min.js"></script> 


// Add in body section:
  // <label for="genderSelect">Select Gender:</label>
//   <select id="genderSelect">
//   <option value="">Select a gender</option>
//   <option value="Male">Male</option>
//   <option value="Female">Female</option>
//   <option value="Non binary">Non binary</option>
//   <option value="Trans">Transgender</option>
// </select>
// <div id="chart"></div>

// <script src="{{url_for('static', filename='js/gender_select.js')}}"></script>

document.addEventListener('DOMContentLoaded', function() {
    const hoursSelect = document.getElementById('hoursSelect');
    const chartDiv = document.getElementById('hoursChart');

    hoursSelect.addEventListener('change', function() {
        const selectedHours = this.value;
        if (selectedHours) {
            fetch(`/hours_data?hours_category=${encodeURIComponent(selectedHours.trim())}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        // We use .trim() to ensure no whitespace issues
                        const selectedData = data.find(item => item.hours_spent.trim() === selectedHours.trim());
                        if (selectedData) {
                            const categories = Object.keys(selectedData).filter(k => k !== 'hours_spent');
                            const values = categories.map(key => parseFloat(selectedData[key]));

                            const dataTrace = {
                                x: categories,
                                y: values,
                                type: 'bar',
                                marker: {color: 'blue'}
                            };

                            const layout = {
                                title: `Average Scores for ${selectedHours.trim()} on Social Media`,
                                xaxis: {title: 'Category'},
                                yaxis: {title: 'Average Score', range: [0, 5]},
                                margin: {t: 30}
                            };

                            Plotly.newPlot(chartDiv, [dataTrace], layout);
                        } else {
                            chartDiv.innerHTML = '<p>No data available for the selected hours.</p>';
                        }
                    } else {
                        chartDiv.innerHTML = '<p>No data available for the selected hours.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    chartDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
                });
        }
    });
});
