import React from 'react';
import './simpleBarChart.css';
import data from '../data/first250rows.json';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3";

function SimpleBarChart() {
  const artists = data.artists;
  console.log(artists[0].artist_mb, artists[0].country_mb);
  const artistCountryBandNames = {};
  const artistCountryCount = {};

  for (let i=0; i<artists.length;i++){
    if (!(artists[i].country_mb in artistCountryCount)){
      artistCountryCount[artists[i].country_mb] = 1;
      artistCountryBandNames[artists[i].country_mb] = [artists[i].artist_mb];
    }
    else{
      artistCountryCount[artists[i].country_mb] += 1;
      artistCountryBandNames[artists[i].country_mb].push(artists[i].artist_mb);
    }
  }
  console.log(artistCountryCount);
  console.log(artistCountryBandNames);

  const artistCountryCountArray = [];

  for (var a in artistCountryCount){
    let b = {"country": a,"count":artistCountryCount[a]};
    artistCountryCountArray.push(b);
  }

  console.log(artistCountryCountArray);

  const width = 500;
  const height = 200;
  const padding = 20;

  const [chartdata] = useState(artistCountryCountArray);
  const svgRef= useRef()
  
  useEffect(
    ()=>{

      const xScale = d3.scalePoint()
                      .domain(chartdata.map( (d) => d.country ))
                      .range([(0+padding),(width - padding)])
      console.log('Start - End',xScale('United Kingdom'),xScale('Germany'))

      const yScale = d3.scaleLinear()
                      .domain([0, d3.max( chartdata, function (d) {return d.count})])
                      .range([(height - padding), (0 + padding)])
                             
      console.log('Start - End',yScale(0),yScale(d3.max( chartdata, function (d) {return d.count}))) 

      const line = d3.line()
                    .x((d)=> xScale(d.country))
                    .y( (d)=>yScale(d.count) )
                    .curve(d3.curveMonotoneX)

      console.log('chart draw commands', line(chartdata) )

      d3.select(svgRef.current)
        .select('path')
        .attr('d', (value) => line(chartdata))
        .attr('fill','none')
        .attr('stroke', 'black')
      
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

     //  7] Draw x and y Axes   -------------------------//
      d3.select('#xaxis').remove()
      d3.select(svgRef.current)
        .append('g')
        .attr('transform',`translate(0,${height - padding})`)
        .attr('id','xaxis')
        .call(xAxis)
         
      d3.select('#yaxis').remove()
      d3.select(svgRef.current)
        .append('g')
        .attr('transform',`translate(${padding},0)`)
        .attr('id','yaxis')
        .call(yAxis)   
      
      d3.select('#title').remove()
      d3.select(svgRef.current)
        .append("text")
        .attr("x", (width / 2))             
        .attr("y", (height / 8))
        .attr("text-anchor", "middle")  
        .style("font-size", "7px") 
        .text("Band Count vs Country Line Chart")
        .attr('id','title');

      d3.select('#xaxis-label').remove()
      d3.select(svgRef.current)
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height+5)
        .text("Bands from Countries")
        .attr('id','xaxis-label')
        .style("font-size", "7px") ;

      d3.select('#yaxis-label').remove()
      d3.select(svgRef.current)
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", 10)
        .attr("y", height/2)
        .text("Band Count")
        .attr('id','yaxis-label')
        .style("font-size", "7px") ;
    

    },[chartdata]
  )
  

  return (
    <div className="simpleBarChart">
      {/* <h3>Line chart here!</h3> */}
      <svg id="chart" ref={svgRef} viewBox="-30 -10 550 250">
        <path d="" fill="none" stroke="black" strokeWidth="2" />   
      </svg>
      <p>
        {/* Chart data - - {JSON.stringify(chartdata)} */}
        {/* <button type='button' onClick={()=> setChartdata(newData())}>
          
        </button> */}
      </p>
    </div>
  );
}

export default SimpleBarChart
