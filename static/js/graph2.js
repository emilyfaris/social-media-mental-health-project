// Fetch data from Flask endpoint
fetch('/visualization2/data')
  .then(response => response.json())
  .then(data => {
    // Create the Plotly graph
    const fig = {
      data: [{
        x: data.map(item => item.MentalHealth),
        y: data.map(item => item.Score),
        type: 'bar',
        marker: {color: 'powderblue'}
      }],
      layout: {
        title: 'Median Mental Health Scores by Occupation',
        xaxis: {title: 'Mental Health'},
        yaxis: {title: 'Median Score'}
      }
    };

    Plotly.newPlot('plotly-graph', fig.data, fig.layout);
  })
  .catch(error => console.log('Error fetching data:', error));