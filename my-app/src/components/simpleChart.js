import React from 'react';
import './simpleChart.css';
import data from '../data/first500rows.json';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3";

function SimpleChart() {
  const artists = data.artists;
  // console.log(artists[0],artists[0].artist_mb, artists[0].country_mb);
  const artistCountryBandNames = {};
  const artistCountryCount = {};

  for (let i=0; i<artists.length;i++){
    // console.log(artists[i].mbid, "-", artists[i].country_mb)
    if (artists[i].country_mb!==undefined )
    {
      if (!(artists[i].country_mb in artistCountryCount)){
        artistCountryCount[artists[i].country_mb] = 1;
        artistCountryBandNames[artists[i].country_mb] = [artists[i].artist_mb];
      }
      else{
        artistCountryCount[artists[i].country_mb] += 1;
        artistCountryBandNames[artists[i].country_mb].push(artists[i].artist_mb);
      }
    }
    // console.log(artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';')));
    // if (!(artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';')) in artistGenre)){
    //   artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))] = 1;
    // }
    // else{
    //   artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))] += 1;
    // }
  }
  // console.log(artistCountryCount);
  // console.log(artistCountryBandNames);

  const artistCountryCountArray = [];

  for (var a in artistCountryCount){
    let b = {"country": a,"count":artistCountryCount[a]};
    artistCountryCountArray.push(b);
  }

  // console.log(artistCountryCountArray);

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
      // console.log('Start - End',xScale('United Kingdom'),xScale('Germany'))

      const yScale = d3.scaleLinear()
                      .domain([0, d3.max( chartdata, function (d) {return d.count})])
                      .range([(height - padding), (0 + padding)])
                             
      // console.log('Start - End',yScale(0),yScale(d3.max( chartdata, function (d) {return d.count}))) 

      const line = d3.line()
                    .x((d)=> xScale(d.country))
                    .y( (d)=>yScale(d.count) )
                    .curve(d3.curveMonotoneX)

      // console.log('chart draw commands', line(chartdata) )

      d3.select(svgRef.current)
        .select('path')
        .attr('d', (value) => line(chartdata))
        .attr('fill','none')
      
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

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
        .attr("y", (height / 15))
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")
        .style("color","#E458A4") 
        .text("Music Production across Countries")
        .attr('id','title')
        .style("fill","#548DF7")
        .style("font-weight",500);

      d3.select('#xaxis-label').remove()
      d3.select(svgRef.current)
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height+5)
        .text("Countries")
        .attr('id','xaxis-label')
        .style("font-size", "7px")
        .style("fill","#548DF7");

      d3.select('#yaxis-label').remove()
      d3.select(svgRef.current)
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", 10)
        .attr("y", height/2)
        .text("Artists")
        .attr('id','yaxis-label')
        .style("font-size", "7px")
        .style("fill","#548DF7");

    },[chartdata]
  )
  

  return (
    <div className="simpleChart">
      {/* <h3>Line chart here!</h3> */}
      <div className='simpleChartContainer'>
        <svg id="chart" ref={svgRef} viewBox="-20 -30 520 250">
          <path d="" fill="none" stroke="#548DF7" strokeWidth="1" />   
        </svg>
      </div>
    </div>
  );
}

export default SimpleChart
