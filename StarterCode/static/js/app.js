// set up the initial dashboard
function init() {
    // connect to dropdown id element in html
    var dropdown= d3.select("#selDataset");
  
    // connect to data and add subject "names" to dropdown options
    d3.json("samples.json").then((subjectData) => {
      console.log(subjectData);
      var subjectNames = subjectData.names;
  
      subjectNames.forEach((subject) => {
        dropdown.append("option").text(subject).property("value", subject);
      });
  
      // Use the first subject to build default plots
      var firstSubject = subjectNames[0];
      buildCharts(firstSubject );
      buildDemoinfo(firstSubject );
    });
  }
  
  function optionChanged(newSubject) {
    // update dashobard when new data selected
    buildCharts(newSubject);
    buildDemoinfo(newSubject);
  }
// build demographic info panel
  function buildDemoinfo(subject) {
    d3.json("samples.json").then((subjectData) => {
      console.log(subjectData);
      var demoData= subjectData.metadata;
      // Filter data to get to info for selected sample "name"
      var subjectArray = demoData.filter(sampleObj => sampleObj.id == subject);
      var result = subjectArray[0];
      console.log(result);
      var panel = d3.select("#sample-metadata");
  
      // clear data
      panel.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
  
      // BONUS: Build the Gauge Chart
      // buildGauge(result.wfreq);
    });
  }
  // build charts
  function buildCharts(subject) {
      d3.json("samples.json").then((subjectData) => {
        console.log(subjectData);
        var samples = subjectData.samples;
        var subjectArray = samples.filter(sampleObj => sampleObj.id == subject);
        var result = subjectArray[0];
        console.log(result);
  
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;

      var labels = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
      var barData = [
        {
          y: labels.reverse(),
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
      };
  
      Plotly.newPlot("bar", barData, barLayout);
  
      // Build a Bubble Chart

      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "YlGnBu"
          }
        }
      ];
      
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
    });
  }
  
  // Initialize the dashboard
  init();