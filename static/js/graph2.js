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
        marker: {color: 'blue'}
      }],
      layout: {
        title: 'Mental Health Scores by Occupation and Frequency',
        xaxis: {title: 'Mental Health'},
        yaxis: {title: 'Frequency'}
      }
    };

    Plotly.newPlot('plotly-graph', fig.data, fig.layout);
  })
  .catch(error => console.log('Error fetching data:', error));