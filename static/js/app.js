// Fetch Data from URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
  console.log(data);

  // Extract OTU IDs, sample values, and washing frequency
  let otuIds = data.samples.map(row => row.otu_ids);
  let sampleValues = data.samples.map(row => row.sample_values);
  let weeklyWashingFrequency = data.metadata.map(row => row.wfreq);

  // Sorting sampleValues to get the top 10 values
  let sortedIndices = sampleValues[0].map((_, index) => index).sort((a, b) => sampleValues[0][b] - sampleValues[0][a]);
  let defaultOtuIds = sortedIndices.slice(0, 10).map(index => otuIds[0][index]);
  let defaultSampleValues = sortedIndices.slice(0, 10).map(index => sampleValues[0][index]);
  let defaultOtuLabels = sortedIndices.slice(0, 10).map(index => data.samples[0].otu_labels[index]);

  // Set default values and index
  let defaultIndex = 0;

  // Initialize and render the Chart with default values
  initializeChart(defaultOtuIds, defaultSampleValues, defaultOtuLabels, weeklyWashingFrequency[defaultIndex]);

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option
  data.names.forEach(name => {
    dropdownMenu.append("option").text(name).property("value", name);
  });

  // On change to the DOM
  d3.select("#selDataset").on("change", function() {
    let selectedValue = d3.select(this).property("value");
    let selectedIndex = data.names.indexOf(selectedValue);

    // Update the Chart
    updateChart(sortedIndices, otuIds[selectedIndex], sampleValues[selectedIndex], data.samples[selectedIndex].otu_labels, weeklyWashingFrequency[selectedIndex]);

    // Display Metadata
    displayMetadata(data.metadata[selectedIndex]);
  });
});

// Chart Initialization and Update Functions
function initializeChart(otuIds, sampleValues, otuLabels, weeklyWashingFrequency) {
  // Bar Chart Configuration
  let yticks = otuIds.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
  let traceBar = {
    x: sampleValues,
    y: yticks,
    text: otuLabels,
    hoverinfo: 'text',
    orientation: 'h',
    type: "bar"
  };

  let layoutBar = {
    title: "Top 10 OTUs for Selected Individual",
    margin: { t: 30, l: 150 }
  };

  // Render the Bar Chart to the div tag with id "bar"
  Plotly.newPlot("bar", [traceBar], layoutBar);

  // Gauge Chart Configuration
  let traceGauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: weeklyWashingFrequency,
      title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: { axis: { range: [0, 9] } }
    }
  ];

  let layoutGauge = { width: 600, height: 400 };

  // Render the Gauge Chart to the div tag with id "gauge"
  Plotly.newPlot('gauge', traceGauge, layoutGauge);

  // Bubble Chart Configuration
  let traceBubble = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    type: "bubble",
    marker: {
      color: otuIds,
      colorscale: "Earth",
      opacity: [1, 0.8, 0.6, 0.4],
      size: sampleValues
    }
  };

  let layoutBubble = {
    title: 'Sample values vs OTU IDs',
    margin: { t: 0 },
    showlegend: false,
    xaxis: { title: 'OTU IDs' },
    margin: { t: 30 },
    yaxis: { title: 'Sample Values' }
  };

  // Render the Bubble Chart to the div tag with id "bubble"
  Plotly.newPlot('bubble', [traceBubble], layoutBubble);
}

// Function to update the Chart
function updateChart(sortedIndices, otuIds, sampleValues, otuLabels, weeklyWashingFrequency) {
  let updatedOtuIds = sortedIndices.slice(0, 10).map(index => otuIds[index]);
  let updatedSampleValues = sortedIndices.slice(0, 10).map(index => sampleValues[index]);
  let updatedOtuLabels = sortedIndices.slice(0, 10).map(index => otuLabels[index]);
  initializeChart(updatedOtuIds, updatedSampleValues, updatedOtuLabels, weeklyWashingFrequency);
}

// Function to display Metadata
function displayMetadata(metadata) {
  let metadataDiv = d3.select("#sample-metadata");
  metadataDiv.html("");

  Object.entries(metadata).forEach(([key, value]) => {
    metadataDiv.append("p").text(`${key}: ${value}`);
  });
}
