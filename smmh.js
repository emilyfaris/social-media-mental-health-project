

const filePath = './resources/project3_dataset.json';
d3.json(filePath).then(function(data) {
    console.log(data);
  });


// Initialize dashboard  
function init() {

    // Use D3 to select dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate drop-down selector
    d3.json(filePath).then((data) => {
        let names = data.names;
        names.forEach((id) => {

            // Print value of variables during loop
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set sample_values for bar chart.
        let sample_value = names[0];

        // Print the value
        console.log(sample_value);

        // Build the initial plots
        buildMetadata(sample_value);
        buildBarChart(sample_value);
        buildBubbleChart(sample_value);
        buildGaugeChart(sample_value);
    });};

// // Populate metadata info
// function buildMetadata(sample) {

//     // Use D3 to retrieve all data
//     d3.json(filePath).then((data) => {
//         let metadata = data.metadata;
//         let value = metadata.filter(result => result.id == sample);
//         console.log(value)
//         let valueData = value[0];

//         // Clear metadata content to make usable by user
//         d3.select("#sample-metadata").html("");

//         // Add key/value pair to the panel
//         Object.entries(valueData).forEach(([key,value]) => {

//             // Print the key/value pairs individually
//             console.log(key,value);
//             d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//         });
//     });};

// // Populate the bar chart
// function buildBarChart(sample) {
//     d3.json(filePath).then((data) => {
//         let sampleInfo = data.samples;
//         let value = sampleInfo.filter(result => result.id == sample);
//         let valueData = value[0];

//         // Get the otu_ids, lables, and sample values
//         let otu_ids = valueData.otu_ids;
//         let otu_labels = valueData.otu_labels;
//         let sample_values = valueData.sample_values;

//         // Log the data
//         console.log(otu_ids,otu_labels,sample_values);

//         // Set top ten items in descending order
//         let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
//         let xticks = sample_values.slice(0,10).reverse();
//         let labels = otu_labels.slice(0,10).reverse();
        
//         // Set up trace for bar chart
//         let trace = {
//             x: xticks,
//             y: yticks,
//             text: labels,
//             type: 'bar',
//             orientation: 'h', 
//         };

//         // Layout setup
//         let layout = {
//             title: "Top 10 OTUs Present"
//         };

//         // Plot the bar chart with Plotly
//         Plotly.newPlot("bar", [trace], layout)
//     });};

// // Populate the bubble chart
// function buildBubbleChart(sample) {
//     d3.json(filePath).then((data) => {
//         let sampleInfo = data.samples;
//         let value = sampleInfo.filter(result => result.id == sample);
//         let results = value[0];

//         // Get the otu_ids, lables, and sample values
//         let otu_ids = results.otu_ids;
//         let otu_labels = results.otu_labels;
//         let sample_values = results.sample_values;

//         // Log the data
//         console.log(otu_ids,otu_labels,sample_values);
        
//         // Set up trace for bubble chart
//         let trace1 = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "Earth"
//             }};

//         // Layout setup
//         let layout = {
//             title: "Bacteria Per Sample",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"},
//         };

//         // Plot bubble chart using Plotly
//         Plotly.newPlot("bubble", [trace1], layout)
//     });};

// //Populate Gauge Chart
// function buildGaugeChart(sample) {
//     d3.json(filePath).then((data) => {
//       let metadata = data.metadata;
//       let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//       let result = resultArray[0];
      
//       // Get washing frequency value
//       let wfreq = result.wfreq;
      
//       // Set up trace for gauge chart
//       let trace = [{
//           domain: {x: [0, 1], y: [0, 1]},
//           value: wfreq,
//           title: {text: "Belly Button Washing Frequency"},
//           type: "indicator",
//           mode: "gauge+number",
//           gauge: {
//             axis: {range: [null, 9]},
//             bar: {color: "darkblue"},
//             steps: [
//               {range:[0, 1], color: "#f7fcfd"},
//               {range:[1, 2], color: "#e5f5f9"},
//               {range:[2, 3], color: "#ccece6"},
//               {range:[3, 4], color: "#99d8c9"},
//               {range:[4, 5], color: "#66c2a4"},
//               {range:[5, 6], color: "#41ae76"},
//               {range:[6, 7], color: "#238b45"},
//               {range:[7, 8], color: "#006d2c"},
//               {range:[8, 9], color: "#00441b"}
//             ],
//           }}];
      
//       // Layout setup
//       let layout = {width:500, height:400, margin: {t:0, b:0}};
      
//       // Plot gauge chart using Plotly
//       Plotly.newPlot("gauge", trace, layout);
//     })};
  
// // Updates dashboard when sample is changed
// function optionChanged(value) { 

//     // Log new value
//     console.log(value); 

//     // Call all functions 
//     buildMetadata(value);
//     buildBarChart(value);
//     buildBubbleChart(value);
//     buildGaugeChart(value);
// };

// // Initialize function
// init();