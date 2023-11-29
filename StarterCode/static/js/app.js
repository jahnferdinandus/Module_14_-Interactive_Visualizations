// Define the initCharts function
function initCharts(data) {
    // Your initialization code here
    updateBarChart(data.samples[0]);
    updateBubbleChart(data.samples[0]);
    // Add other chart initialization functions as needed
}

// Update the updateBarChart function
function updateBarChart(data) {
    // Extract top 10 OTUs data
    var top10OTUs = data.sample_values.slice(0, 10).reverse();
    var top10Labels = data.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    var top10HoverText = data.otu_labels.slice(0, 10).reverse();

    // Trace for the bar chart
    var trace = {
        type: 'bar',
        orientation: 'h',
        x: top10OTUs,
        y: top10Labels,
        text: top10HoverText,
    };

    // Data array
    var traceData = [trace];

    // Layout for the chart
    var layout = {
        title: 'Top 10 OTUs',
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU ID' },
    };

    // Plotly is used to create/update the bar chart
    Plotly.newPlot('bar', traceData, layout);
}

// Update the updateBubbleChart function
function updateBubbleChart(data) {
    // Set up trace for the bubble chart
    var trace = {
        x: data.otu_ids,
        y: data.sample_values,
        mode: 'markers',
        marker: {
            size: data.sample_values,
            color: data.otu_ids,
            colorscale: 'Earth', // You can choose a different colorscale
        },
        text: data.otu_labels,
    };

    // Data array
    var traceData = [trace];

    // Layout for the chart
    var layout = {
        title: 'Bubble Chart for Each Sample',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' },
        margin: { t: 40 }, // Adjust the top margin as needed
        height: 400, // Adjust the height as needed
    };

    // Plotly is used to create/update the bubble chart
    Plotly.newPlot('bubble', traceData, layout);
}

// Use d3.json() to fetch data from the specified URL
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
    // Handle the data here
    console.log(data); // You can check the data in the console
    // Call your initialization function with the fetched data
    initCharts(data);
    // Display the sample metadata for the initial subject
    displayMetadata(data.metadata);
});

// Assume you have a function to display sample metadata
function displayMetadata(metadata) {
    // Select the HTML element where you want to display the metadata
    var metadataPanel = d3.select("#sample-metadata");

    // Clear existing content
    metadataPanel.html("");

    // Loop through the metadata and append it to the panel
    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
    });
}

// Assume you have a function to handle dropdown selection
function optionChanged(selectedSubject) {
    // Assume 'selectedSubject' is the ID of the selected test subject

    // Fetch the data for the selected subject
    var selectedData = fetchDataForSubject(selectedSubject);

    // Update the charts with the new data
    updateBarChart(selectedData.samples[0]);
    updateBubbleChart(selectedData.samples[0]);

    // Display the sample metadata for the selected subject
    displayMetadata(selectedData.metadata);
}
