    // set the dimensions of the canvas
    var margin = {
            top: 40,
            right: 20,
            bottom: 70,
            left: 40
        },
        width = 1000 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

     //tooltip   
     var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Value:</strong> <span style='color:red'>" + d[" 3-2013"] + "</span>";
          })


    // add the SVG element
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    svg.call(tip);   

    // load the data
    d3.json("./JSON/foodgrain.json", function(error, data) {

        data.forEach(function(d) {

            d.Particulars = d.Particulars;
            d[" 3-2013"] = +d[" 3-2013"];
        });

        //sort the data
        data.sort(function(a, b) {
            return b[" 3-2013"] - a[" 3-2013"];
        });

        // scale the range of the data
        x.domain(data.map(function(d) {
            return d.Particulars;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d[" 3-2013"];
        })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Production")



        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(d.Particulars);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d[" 3-2013"]);
            })
            .attr("height", function(d) {
                return height - y(parseFloat(d[" 3-2013"]))
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

    });

    function type(d) {
    d[" 3-2013"] = +d[" 3-2013"];
      return d[" 3-2013"];
    }