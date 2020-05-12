document.addEventListener("DOMContentLoaded", () => {
    const margin = { top: 10, right: 30, bottom: 30, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 460 - margin.top - margin.bottom;
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("./src/data.csv",
        function (d) {
            return { date: d3.timeParse("%Y-%m-%d")(d.date), deaths: d.deaths_mean }
        },
        function (data) {
            // data = data.filter(function (d, i) { return i })

            const x = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.date; }))
                .range([0, width]);
           const xAxis = svg.append("g")
                .attr("transform", "translate(0," + (height + 5) + ")")
                .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

            const y = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return +d.deaths; }))
                .range([height, 0]);
           const yAxis = svg.append("g")
                .attr("transform", "translate(-5,0)")
                .call(d3.axisLeft(y).tickSizeOuter(0));


            const clip = svg.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", width)
                .attr("height", height)
                .attr("x", 0)
                .attr("y", 0);

            const brush = d3.brushX()
                .extent([[0, 0], [width, height]])
                .on("end", updateChart)

            const area = svg.append('g')
                .attr("clip-path", "url(#clip)")

            // Create an area generator
            const areaGenerator = d3.area()
                .x(function (d) { return x(d.date) })
                .y0(y(0))
                .y1(function (d) { return y(d.deaths) })


            area.append("path")
                .datum(data)
                .attr("class", "myArea")
                .attr("fill", "#69b3a2")
                .attr("fill-opacity", .3)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("d", areaGenerator)
            // .attr("d", d3.area()
            //     .x(function (d) { return x(d.date) })
            //     .y0(height)
            //     .y1(function (d) { return y(d.deaths) })

            // )

            area
                .append("g")
                .attr("class", "brush")
                .call(brush);

            const idleTimeout
            function idled() { idleTimeout = null; }

            function updateChart() {
                extent = d3.event.selection
                if (!extent) {
                    if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
                    x.domain([4, 8])
                } else {
                    x.domain([x.invert(extent[0]), x.invert(extent[1])])
                    area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
                }

                xAxis.transition().duration(1000).call(d3.axisBottom(x))
                area
                    .select('.myArea')
                    .transition()
                    .duration(1000)
                    .attr("d", areaGenerator)
            }


            // svg.selectAll("myCircles")
            //     .data(data)
            //     .enter()
            //     .append("circle")
            //     .attr("fill", "red")
            //     .attr("stroke", "none")
            //     .attr("cx", function (d) { return x(d.date) })
            //     .attr("cy", function (d) { return y(d.deaths) })
            //     .attr("r", 3)



            svg.on("dblclick", function () {
                x.domain(d3.extent(data, function (d) { return d.date; }))
                xAxis.transition().call(d3.axisBottom(x))
                area
                    .select('.myArea')
                    .transition()
                    .attr("d", areaGenerator)
            });

        })

})  