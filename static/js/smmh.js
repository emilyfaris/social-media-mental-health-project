
// Function to fetch data from the server and populate the dropdown menu
function populateDropdown() {
    // Fetch data from the server
    fetch('/data')
        .then(data => data.json())
        .then(data => {
            // console.log(data)
            // Select the dropdown menu element
            let dropdown = document.getElementById('selDataset');
            // Clear existing options
            dropdown.innerHTML = '';
            
            const uniqueAges = [...new Set(data.map(item => Math.round(item.age)))].sort();
            // console.log(uniqueAges)

            // Loop through the data and add each age as an option to the dropdown
            uniqueAges.forEach(age => {
                let option = document.createElement('option');
                option.text = age;
                dropdown.add(option);
            });
            
             // Add event listener to the dropdown menu
             dropdown.addEventListener('change', function() {
                // Trigger the change event to update the dashboard with the selected age
                optionChanged(dropdown.value);
            });
        // Trigger the change event to update the dashboard with the selected age
        optionChanged(dropdown.value);

        })
        .catch(error => console.error('Error fetching data:', error));
};

// Function to handle change event of the dropdown menu
function optionChanged(selectedValue) {
    // Fetch data from the server based on the selected age
    fetch('/age_select_data')
        .then(data => data.json())
        .then(data => {
            // Filter data based on the selected age
            const filteredData = data.filter(record => Math.round(record.age) === parseInt(selectedValue));

            // Prepare data for the pie chart
            const socialMediaPlatforms = Object.keys(filteredData[0]).filter(key => key !== 'age');
            const platformCounts = socialMediaPlatforms.map(platform => {
                return {
                    platform: platform,
                    count: filteredData.reduce((acc, curr) => acc + curr[platform], 0)
                };
            });

            // Create pie chart
            createPieChart('age-pie-chart', platformCounts);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to create a pie chart
function createPieChart(containerId, data) {
    const labels = data.map(item => item.platform);
    const values = data.map(item => item.count);

    const chartData = [{
        labels: labels,
        values: values,
        type: 'pie'
    }];

    const layout = {
        title: 'Social Media Platform Frequency Count for Selected Age'
    };

    Plotly.newPlot(containerId, chartData, layout);
}

// Call the populateDropdown function when the page is loaded
document.addEventListener('DOMContentLoaded', populateDropdown);
