// set up the initial dashboard
function init() {
  // connect to dropdown id element in html
  var dropdown = d3.select("#selDataset");

    // connect to data and add subject "names" to dropdown options
  d3.json("samples.json").then((subjectData) => {
  console.log(subjectData);
   
  var subjects = subjectData.names;
  
  subjects.forEach((subject) => {
    dropdown.append("option").text(subject).property("value", subject);

  });
    
  var firstSubject = subjects[0];
  buildCharts(firstSubject);
  buildDemoinfo(firstSubject);
     
     
  function optionChanged(newSubject) {
    // update dashobard for when new data selected
    buildCharts(newSubject);
    buildDemoinfo(newSubject);
    }
})
}
  // Initialize the dashboard
init();
// plot bar and bubble chats
function buildCharts(subject) {
    // load data into chart function
  d3.json("samples.json").then((subjectData) => {
    console.log(subjectData)
      // set variables to build charts
    var subjects= subjectData.samples;
    var subjectResult = subjects.filter(sampleObj => sampleObj.id == subject);
    var result = subjectResult[0];
  
      // build bar chart
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var ylabels = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
     
    var barData = [
        {
          y: ylabels.reverse(),
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      
      var barLayout = {
        title: "Top 10 OTU Samples"
      }
      Plotly.newPlot("bar", barData, barLayout);
    });

  // Build a Bubble Chart

  // load data into chart function
    d3.json("samples.json").then((subjectData) => {
      console.log(subjectData)
  //set variables to build charts
    var subjects= subjectData.samples;
    var subjectResult = subjects.filter(sampleObj => sampleObj.id == subject);
    var result = subjectResult[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
      
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }];

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };
  
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  })
  // fill in dempgraphic data
function buildDemoinfo(subject) {
  d3.json("samples.json").then((subjectData) => {
    console.log (subjectData)
  var demoData = subjectData.metadata;
    // Filter the data for the object with the desired sample number
  var subjectArray = metadata.filter(sampleObj => sampleObj.id == subject);
  var result = subjectArray[0];
      
  // Use d3 to select the panel with id of `#sample-metadata`
  var PANEL = d3.select("#sample-metadata");
  
  // Use `.html("") to clear any existing metadata
  PANEL.html("");
  
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
  
//       // BONUS: Build the Gauge Chart
//       buildGauge(result.wfreq);
});
}
