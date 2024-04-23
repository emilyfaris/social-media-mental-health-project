// Uses Plotly library. Add in the header section:
  // <script src="https://cdn.plot.ly/plotly-latest.min.js"></script> 


// Add in body section:
  // <div>
//   <label for="hoursSelect">Select Hours Spent on Social Media:</label>
//   <select id="hoursSelect">
//   <option value="">--Select Hours--</option>
//   <option value="Less than 2 ">Less than 2 hours</option>
//   <option value="2 to 5">2 to 5 hours</option>
//   <option value="More than 5 ">More than 5 hours</option>
//   </select>
//   <div id="hoursChart"></div>

// <script src="{{url_for('static', filename='js/hours_select.js')}}"></script>

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
                                marker: {color: 'lightskyblue'}
                            };

                            const layout = {
                                title: `Average Mental Health Scores for ${selectedHours.trim()} Hours Spent on Social Media`,
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
