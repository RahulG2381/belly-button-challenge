// Get the sample endpoint 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  // Extract the otu_ids and sample_values from each row
  let otuIds = data.samples.map(function(row) {
    return row.otu_ids;
  })
    let sampleValues = data.samples.map(function(row) {
    return row.sample_values;
  });
 let sortedIndices = sampleValues[0].map((_, index) => index).sort((a, b) => sampleValues[0][b] - sampleValues[0][a]);
 
 


  // sliced the sorted indices array to get the top 10 indices, 
  // then mapped those indices back to the otuIds and sampleValues arrays to get the corresponding top 10 values for each.
  let otuIdsSorted = sortedIndices.slice(0, 10).map(index => otuIds[0][index]);
  let sampleValuesSorted = sortedIndices.slice(0, 10).map(index => sampleValues[0][index]);

  
  // Trace for the Bar Chart
 //function init() {
    let trace = {
      x: sampleValuesSorted,
      y: otuIdsSorted.map(otuId => `OTU ${otuId}`),
      orientation: 'h',
      type: "bar"
    };

  // Data trace array
  let hchart = [trace];

  // Apply a title to the layout
  let layout = {
    title: "Top 10 OTUs for Selected Individual"
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", hchart, layout);


// ---------------------------------------------------------
let names = data.names;
// Select the dropdown element
let dropdownMenu = d3.select("#selDataset");

// Populate the dropdown with options
names.forEach(name => {
  dropdownMenu.append("option").text(name).property("value", name);
});

// Initialize the chart with the first option
getData();

});

// // Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
   // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
updatePlotly(dataset);
}

// // Update the restyled plot's values
function updatePlotly(newdata) {
 // let newdata =  getDataForDataset(newdata);
 


Plotly.update("bar", "values", [newdata]);
}
d3.select("#selDataset").on("change", getData);
