

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

            // Convert the array to a Set to get unique values
            
            // let uniqueAgesSet = new Set(data.forEach(record => record.age));

            // // Convert the Set back to an array
            // let uniqueAges = Array.from(uniqueAgesSet);

            const unique = [...new Set(data.map(item => item.age))].sort();
            console.log(unique)

            // Loop through the data and add each age as an option to the dropdown
            unique.forEach(record => {
                let option = document.createElement('option');
                option.text = record;
                dropdown.add(option);
            });

            // // Loop through the data and add each age as an option to the dropdown
            // data.forEach(record => {
            //     let option = document.createElement('option');
            //     option.text = record.age;
            //     dropdown.add(option);
            // });
            // Trigger the change event to update the dashboard with the selected age
            optionChanged(dropdown.value);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to handle change event of the dropdown menu
function optionChanged(selectedValue) {
    // Implement your logic to update the dashboard based on the selected age
    console.log('Selected age:', selectedValue);
}

// Call the populateDropdown function when the page is loaded
document.addEventListener('DOMContentLoaded', populateDropdown);



