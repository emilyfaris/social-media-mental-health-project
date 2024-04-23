// Fetch data from Flask endpoint
fetch('/visualization3/data')
  .then(response => response.json())
  .then(data => {
    // Extract x and y data from the response
    const xData = data.map(item => item.Occupation);
    const yData = data.map(item => item.Frequency); // Assuming 'Frequency' is the desired y-axis variable

    // Create the Plotly graph
    const trace = {
      x: xData,
      y: yData,
      type: 'bar',
      marker: {color: 'blue'}
    };
    const layout = {
      title: 'Mental Health Scores by Occupation and Frequency',
      xaxis: {title: 'Occupation'},
      yaxis: {title: 'Frequency'}
    };
    const config = {responsive: true};
    Plotly.newPlot('plotly-graph', [trace], layout, config);
  })
  .catch(error => console.log('Error fetching data:', error));
