

// Function to fetch data from the server and populate the dropdown menu
function populateDropdown() {
    // Fetch data from the server
    fetch('/social')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            // Select the dropdown menu element
            let dropdown = document.getElementById('selDataset');
            // Clear existing options
            dropdown.innerHTML = '';
            
            // ***MAKE SURE Math.round works***
            const unique = [...new Set(data.map(item => Math.round(item.age)))].sort();
            console.log(unique)

            // Loop through the data and add each age as an option to the dropdown
            unique.forEach(record => {
                let option = document.createElement('option');
                option.text = record;
                dropdown.add(option);
            });

            // Trigger the change event to update the dashboard with the selected age
            optionChanged(dropdown.value);
        })
        .catch(error => console.error('Error fetching data:', error));
};

// Function to create pie charts for specified social media platforms based on selected age
function createPieCharts(age, data) {
    // Filter data based on selected age
    const filteredData = data.filter(item => Math.round(item.age) === parseInt(age));

    // Initialize data objects for each platform
    const platformsData = {
        'Facebook': 0,
        'Twitter': 0,
        'Instagram': 0,
        'YouTube': 0,
        'Discord': 0,
        'Reddit': 0
    };

    // Count occurrences of each platform
    filteredData.forEach(item => {
        const platforms = item.SocialMediaPlatforms.split(', ');
        platforms.forEach(platform => {
            if (platformsData.hasOwnProperty(platform)) {
                platformsData[platform]++;
            }
        });
    });

    // Create pie chart for each platform
    Object.keys(platformsData).forEach(platform => {
        const platformData = [{
            labels: [platform, 'Others'],
            values: [platformsData[platform], filteredData.length - platformsData[platform]],
            type: 'pie',
            name: `${platform} Usage`,
            hoverinfo: 'label+percent',
            hole: 0.4
        }];
        
        const layout = {
            title: `${platform} Usage`,
            annotations: [
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: '',
                    x: 0.5,
                    y: 0.5
                }
            ]
        };
        
        Plotly.newPlot(`${platform.toLowerCase()}-pie`, platformData, layout);
    });
}

// Function to handle change event of the dropdown menu
function optionChanged(selectedValue) {
    // Implement your logic to update the dashboard based on the selected age
    console.log('Selected age:', selectedValue);
}

// Call the populateDropdown function when the page is loaded
document.addEventListener('DOMContentLoaded', populateDropdown);



