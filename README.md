# belly-button-challenge
## Introduction
In this activity I have tasked to build an interactive dashboard to explore the Belly Button Biodiversity dataset , which catalogues the microbes that colonise human navels. 
## Following steps were taken to get the desired results:
1.	Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
2.	Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  -	Use sample_values as the values for the bar chart.
  -	Use otu_ids as the labels for the bar chart.
  -	Use  otu_labels as the hovertext for the chart.

3.	Create a bubble chart that displays each sample.
  -	Use  otu_ids for the x values.
  -	Use  sample_values for the y values.
  -	Use  sample_values for the marker size.
  -	Use  otu_ids for the marker colors.
  -	Use  otu_labels for the text values.
4.	Display the sample metadata, i.e., an individual's demographic information.
  -	Display each key-value pair from the metadata JSON object somewhere on the page. 
  -	Update all the plots when a new sample is selected. 

Additionally, I have built the visuals asked in the Advance challenge. Using Gauge Chart to and plot the weekly frequency of the individual. 

The code used to build this dashboard is saved in Static/js folder as app.js file. 

