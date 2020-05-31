<img width="427" alt="logo" src="https://user-images.githubusercontent.com/55370959/82830153-f5808880-9e82-11ea-9806-b07c0ab8fafb.png">

## Background and Overview 
Flatten is an interactive data visualizations that depict the impact of social distancing on infections/mortality and graphically represent New York's overall testing capacity.

[Live Link](https://naziaislam80.github.io/Flattener-/)

## Features
Users can interact with graph to see the impact social distancing had on decreasing mortality.
![naz](https://user-images.githubusercontent.com/55370959/82834929-890c8600-9e90-11ea-9bc6-b4db0cf5f8ab.gif)


Users can see how daily testing can help to reveal the rate of new infections in New York. 
<img width="1440" alt="Screen Shot 2020-05-25 at 12 51 26 PM" src="https://user-images.githubusercontent.com/55370959/82831570-c53ae900-9e86-11ea-8e3c-b191d42cdf56.png">

<img width="1440" alt="Screen Shot 2020-05-25 at 12 51 40 PM" src="https://user-images.githubusercontent.com/55370959/82831571-c704ac80-9e86-11ea-9dac-a2706c98ec5a.png">

## Technology 
* D3.js
* JavaScript
* CSS
* HTML
* [IHME](http://www.healthdata.org)

## Code Highlight 
Implemented an update chart function so users can zoom in and change graph to see details along with a double click, so once users are done they can double click to return to the original graph. 

```
 function updateChart() {
                                    extent = d3.event.selection
                                    if (!extent) {
                                        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
                                        x.domain([4, 8])
                                    } else {
                                        x.domain([x.invert(extent[0]), x.invert(extent[1])])
                                        area.select(".brush").call(brush.move, null) 
                                    }

                                    xAxis.transition().duration(1000).call(d3.axisBottom(x))
                                    area
                                        .select('.myArea')
                                        .transition()
                                        .duration(1000)
                                        .attr("d", areaGenerator)
                                }


                                svg1.on("dblclick", function () {
                                    x.domain(d3.extent(data, function (d) { return d.date; }))
                                    xAxis.transition().call(d3.axisBottom(x))
                                    area
                                        .select('.myArea')
                                        .transition()
                                        .attr("d", areaGenerator)
                                });

                            })
  ```

 

 
 


