const topicbtn = document.getElementById("topicwise");
const continentsales = document.getElementById("continentsales");
const coursesbtn = document.getElementById("coursessales");
const totalsales = document.getElementById("totalsales");
const panel = document.getElementById("pie-chart");
const totalreveneu = document.getElementById("total");
const totaltopical = document.getElementById("totaltopic");
const totalcourse = document.getElementById("totalcource");
topicbtn.addEventListener('click', topicwisesales);
coursesbtn.addEventListener('click', coursessales);

function coursessales() {
  fetch('/courses')
    .then(response => response.json())
    .then(courses => {
      const totalsalesvalues = courses.reduce((acc, course) => acc + course.sales, 0);
      const totalprice = courses.reduce((acc, course) => acc + course.price, 0);
      

      totalreveneu.innerText = `$${totalsalesvalues*totalprice}`

      // Aggregate sales data for each course
      const coursedata = courses.map(course => ({
        course: course.name,
        sales: course.sales
      }));
      
      //removing the double data that is produced
      const uniquecoursedata = Array.from(new Set(coursedata.map(a => a.course)))
        .map(course => {                                   //this will return the data of the uniwue values only
          return coursedata.find(a => a.course === course)
        });

        totalcourse.innerText = `${uniquecoursedata.length}`
      // Set up SVG dimensions
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      // Create SVG element
      let svg = d3.select("#pie-chart").select("svg");
      if (!svg.empty()) {
        svg = svg.remove();
        svg = d3.select("#pie-chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
      }
      else if (svg.empty()) {
        svg = d3.select("#pie-chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
      }
      // Define pie layout
      const pie = d3.pie()
        .value(d => d.sales)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      // Generate pie slices
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      // Append slices to the pie chart
      const slices = svg.selectAll("path")
        .data(pie(uniquecoursedata))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);

      const text = svg.selectAll("text")
        .data(pie(uniquecoursedata))
        .enter()
        .append("text")
        .attr("transform", function (d) {
          const angle = (d.startAngle + d.endAngle) / 2 * 180 / Math.PI - 90;
          return `translate(${arc.centroid(d)}) rotate(${angle})`;
        })
        .attr("dy", ".20em")
        .text(function (d) { return d.data.course; })
        .style("text-anchor", "middle") // Center the text
        .style("font-size", "13px") // Set the font size
        .style("fill", "black"); // Set the text color

      slices.append("title")
        .text(d => `${d.data.course}: ${d.data.sales}`);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function topicwisesales() {
  fetch('/sales')
    .then(response => response.json())
    .then(data => {
      const salesData = data;
      const salesByTopic = {};
      let count = 0;
      salesData.forEach(sale => {
        sale.topics.forEach(topic => {
          if (!salesByTopic[topic]) {
            salesByTopic[topic] = 0;
          }
          salesByTopic[topic] += sale.sales;
          count++;
        });
      });
      console.log(salesByTopic);
      totaltopical.innerText = count

      const pieData = Object.entries(salesByTopic).map(([topic, sales]) => ({ topic, sales }));
      const width = 500;
      const height = 500;
      const radius = Math.min(width, height) / 2;

      const colorScheme = d3.scaleOrdinal()
        .domain(d3.range(pieData.length))
        .range(d3.quantize(t => d3.interpolateRainbow(t), pieData.length));

      let svg = d3.select("#pie-chart").select("svg");
      if (!svg.empty()) {
        svg = svg.remove();
        svg = d3.select("#pie-chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
      }
      else if (svg.empty()) {
        svg = d3.select("#pie-chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
      }
      const pie = d3.pie()
        .value(d => d.sales)
        .padAngle(0.007)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const slices = svg.selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colorScheme(i));

      const text = svg.selectAll("text")
        .data(pie(pieData))
        .enter()
        .append("text")
        .attr("transform", function (d) {
          const angle = (d.startAngle + d.endAngle) / 2 * 180 / Math.PI - 90;
          return `translate(${arc.centroid(d)}) rotate(${angle})`;
        })
        .attr("dy", ".20em")
        .text(function (d) { return d.data.topic; })
        .style("text-anchor", "middle") // Center the text
        .style("font-size", "13px") // Set the font size
        .style("fill", "white"); // Set the text color
      slices.append("title")
        .text(d => `${d.data.topic}: ${d.data.sales}`);
    })
}

