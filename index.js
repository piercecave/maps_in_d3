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
    console.log(nyGeoData.features);
    console.log(airbnbData);

    var width = 500,
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
        .attr("d", geoPath);

    g.attr("transform", "translate(-105, 210) rotate(-40)");
}

initMap();