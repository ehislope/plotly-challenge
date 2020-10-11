
// pull in data, set up dropdown data
function init(){
    let dropdown = d3.select("#selDataset");
 
  d3.json("samples.json").then(data =>  { 
    console.log(data);
    let subjects= data.names;
    subjects.forEach((subject) => {
        dropdown
          .append("option")
          .text(data)
          .property("value", data)
      });
  
      // Use the first subject info list to build the default plots
      var firstSubject= subjects[0];
      updatePlotly(firstSubject);
      updateMetadata(firstSubject);
    });
 }
  
  // updated info based on new selection in dropdown
 function optionChanged(newSubject) {
    updatePlotly(newSubject);
    updateMetadata(newSubject);
  }

  function updatePlotly(){
    d3.json("samples.json").then(data =>  { 
      console.log(data)
      
      var barTrace1= [
        {
          y: otu_ids.map(otuID => `OTU ${otuID}`).slice(0,10),
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
      };
  
      Plotly.newPlot("bar", barTrace, barLayout);
    });
  }
  
  









// initial charts
  init();


