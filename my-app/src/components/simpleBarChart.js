import React from 'react';
import './simpleBarChart.css';
import data from '../data/first250rows.json';
// import * as d3 from "d3";

function SimpleBarChart() {
  const artists = data.artists;
  console.log(artists[0].artist_mb, artists[0].country_mb);
  const artistName = {};
  const artistCountry = {};

//   for (let i=0; i<artists.length;i++){
//     if (artists[i])
//   }

  return (
    <div className="simpleBarChart">
      <h3>Bar chart here!</h3>
      {/* <div id="my_dataviz"></div> */}
    </div>
  );
}

export default SimpleBarChart
