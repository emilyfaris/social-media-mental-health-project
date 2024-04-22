document.addEventListener("DOMContentLoaded", function() {

const data = [
    { gender: 'Female', facebook: 1 },
    { gender: 'Male', facebook: 0 },
    { gender: 'Trans', facebook: 1 },
    { gender: 'Non-binary', facebook: 1 },
  ];

  // Calculate total Facebook users by gender
  const facebookByGender = d3.rollup(data, v => d3.sum(v, d => d.facebook), d => d.gender);

  // Create pie chart
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const svg = d3.select("#pie-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

  const color = d3.scaleOrdinal()
                  .domain(facebookByGender.keys())
                  .range(d3.schemeCategory10);

  const pie = d3.pie()
                .value(d => d[1]);

  const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

  const arcs = svg.selectAll("arc")
                  .data(pie(facebookByGender))
                  .enter()
                  .append("g");

  arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data[0]));

  arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => d.data[0]);

  // Add legend
  const legend = svg.selectAll(".legend")
                    .data(facebookByGender.entries())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", (d, i) => `translate(0,${i * 20})`);

  legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d[0]));

  legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d[0]);
});