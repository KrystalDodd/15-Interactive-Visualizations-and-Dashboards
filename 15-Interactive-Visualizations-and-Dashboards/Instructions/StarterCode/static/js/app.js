
function buildMetadata(selection){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        var table = d3.select("#sample-metadata");
       
        table.html("")       
          

        metadata.forEach(sample => {
            if (sample.id == selection){
                Object.entries(sample).forEach(([key, value]) => {
                    // console.log(key,value)
                    table.append("p").text(`${key}: ${value}`)
                } )
        
            }
        })
            

            
})
}    



function buildCharts(selection){
    d3.json("samples.json").then((data)=> {
    var samples = data.samples;
    var barData = samples.filter(i => i.id == selection)[0];
    var sampValues = Object.values(barData.sample_values);
    var otuIds = Object.values(barData.otu_ids);
    var otuLabels = Object.values(barData.otu_labels);
    var data = [{
      x: sampValues.slice(0, 11).reverse(),
      y: otuIds.map(d => `ID: ${d}`).slice(0,11).reverse(),
      type: "bar",
      text: otuIds,
      orientation: 'h' 
    }];
    var layout = {
      title: 'Top 10 OTUs'
    };
    Plotly.newPlot("bar", data, layout);

  

  
//Chart 2
  var data2 = [{
    x: otuIds,
    y: sampValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampValues,
      color: otuIds
    }
  }];
 
  var layout2 = {
    title: "Bacterial Bubble Chart",
    showlegend: false,
    xaxis:{
        title: {
            text:"OTU ID",
        }
    }
  };
  Plotly.newPlot("bubble", data2, layout2);

})
}


function init() {
    d3.json("samples.json").then((data) => {

        var id_names = data.names;
        var dropdown = d3.select("#selDataset")
        id_names.forEach(id => {
            var option = dropdown.append("option");
            option.text(id);
            option.property("value", id);
        });
        var first_sample= id_names[0];
        buildMetadata(first_sample)
        buildCharts(first_sample);
    })
}            
function optionChanged(selection) {


    buildMetadata(selection);
    buildCharts(selection);
    
}

init();
