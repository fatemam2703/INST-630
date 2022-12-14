import React from 'react';
import './barChart.css';
import data1 from '../data/first2000rows.json';
import { useEffect, useRef } from 'react';
import {
  select,
  scaleBand,
  axisBottom,
  scaleLinear,
  axisLeft,
} from "d3";

function BarChart() {
  const artists = data1.artists;

  const svgRef = useRef();

  const allData = []

  const artistGenre = {};

  for (let i=0; i<artists.length;i++){
    if (artists[i].tags_lastfm)
    {
      // console.log(artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';')));
      if (!(artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';')) in artistGenre)){
        artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))] = 1;
      }
      else{
        artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))] += 1;
      }
    }
  }

  console.log(artistGenre);

  for (var a in artistGenre){
    if (artistGenre[a]>20)
    {
      let b = {name: a,value:artistGenre[a]};
      allData.push(b);
    }
  }
  

  useEffect(() => {
    const svg = select(svgRef.current);
    const width = 500;
    const height = 100;
    // const padding = 20;

    // scales
    const xScale = scaleBand()
      .domain(allData.map(d => d.name))
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...allData.map(d => d.value))])
      .range([height, 0]);

      svg.selectAll(".bar")
         .data(allData)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.name); })
         .attr("y", function(d) { return yScale(d.value); })
         .attr("width", 15)
         .attr("height", function(d) { return height - yScale(d.value); })
         .attr("fill","#548DF7");

    // axes
    const xAxis = axisBottom(xScale);
    svg.select('#xaxis').remove()
    svg
      .append('g')
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .attr('id','xaxis')
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select('#yaxis').remove()
    svg
      .append('g')
      .attr('id','yaxis')
      .call(yAxis)  

    svg.select('#title').remove()
    svg
      .append("text")
      .attr("x", (width / 2))             
      .attr("y", (height / 500))
      .attr("text-anchor", "middle")  
      .style("font-size", "10px") 
      .text("Artists across Top Genres")
      .attr('id','title')
      .style("fill","#548DF7")
      .style("font-weight",500);

    svg.select('#xaxis-label').remove()
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2)
      .attr("y", height+25)
      .text("Genre")
      .attr('id','xaxis-label')
      .style("font-size", "7px")
      .style("fill","#548DF7") ;

    svg.select('#yaxis-label').remove()
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", -5)
      .attr("y", height/2)
      .text("Artists")
      .attr('id','yaxis-label')
      .style("font-size", "7px")
      .style("fill","#548DF7");
  });

  return (
    
    <div className="simpleBarChart">
      <div className='simpleChartContainer'>
        <svg id="chart" ref={svgRef} viewBox="-30 -40 550 180">
        </svg>
      </div>
    </div>
  );
}

export default BarChart