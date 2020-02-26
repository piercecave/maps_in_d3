"user strict;"

const initMap = () => {
    fetch("./nygeo.json")
        .then(response => response.json())
        .then(fetchAirbnbData);
}

const fetchAirbnbData = (nyGeoData) => {
    d3.csv("./data.csv", function (airbnbData) {
        drawMap(nyGeoData, airbnbData);
    });
}

const drawMap = (nyGeoData, airbnbData) => {

    var width = 450,
        height = 450;

    var svg = d3.select("#mapContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g");

    var albersProjection = d3.geoAlbers()
        .scale(50000)
        .rotate([0, 0])
        .center([-74.0060, 40.7128])
        .translate([width / 2, height / 2]);

    var geoPath = d3.geoPath()
        .projection(albersProjection);

    g.selectAll("path")
        .data(nyGeoData.features)
        .enter()
        .append("path")
        .attr("fill", "#ccc")
        .style("stroke", "black")
        .attr("d", geoPath);

    g.attr("transform", "translate(-105, 190) rotate(-40)");

    g.selectAll("circle")
        .data(airbnbData)
        .enter()
        .append("circle")
        .attr("fill", "blue")
        .attr('r', '2px')
        .style("stroke", "#a9a9a9")
        .style("stroke-width", ".5px")
        .attr("cx", function (d) {
            // console.log(albersProjection([d['longitude'], d['latitude']]))
            return albersProjection([d['longitude'], d['latitude']])[0];
        })
        .attr("cy", function (d) {
            return albersProjection([d['longitude'], d['latitude']])[1];
        })
        .on("click", function () {
            d3.select(this)
                .attr("opacity", 1)
                .transition()
                .duration(5000)
                .attr("cx", width+200)
                .attr("cy", height / 2)
                .attr("opacity", 0)
                .on("end", function () {
                    d3.select(this).remove();
                })
        });
}

initMap();