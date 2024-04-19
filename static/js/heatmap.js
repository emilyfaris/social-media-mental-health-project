// Uses Plotly library. Add in the header section:
  // <script src="https://cdn.plot.ly/plotly-latest.min.js"></script> 
  // <script src="http://localhost:5000/age&platform_data"></script>

// Add in CSS library:
// <link rel="stylesheet" href ="{{url_for('static',filename='css/heatmap.css')}}"></link>

// Add in body section:
  // <div id="heatmap"></div>
  // <script src="heatmap.js"></script>




fetch('/age&platform_data')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.age_bracket);
        const platformData = [
            data.map(item => item.reddit),
            data.map(item => item.youtube),
            data.map(item => item.snapchat),
            data.map(item => item.pinterest),
            data.map(item => item.tiktok),
            data.map(item => item.instagram),
            data.map(item => item.discord),
            data.map(item => item.facebook),
            data.map(item => item.twitter)
        ];
        const platforms = ['Reddit', 'YouTube', 'Snapchat', 'Pinterest', 'TikTok', 'Instagram', 'Discord', 'Facebook', 'Twitter'];

        const Trace1 = {
            x: labels,
            y: platforms,
            z: platformData,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'Viridis'  
        };

        const layout = {
            title: 'Social Media Usage by Age Bracket',
            xaxis: {title: 'Age Bracket'},
            yaxis: {title: 'Platform'},
            margin: {t: 50, l: 150}
        };

        Plotly.newPlot('heatmap', [Trace1], layout);
    });