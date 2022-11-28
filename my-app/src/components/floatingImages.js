import React, { useEffect, useRef } from 'react';
import './floatingImages.css';
import data from '../data/first2000rows.json';

function FloatingImages() {
  const artists = data.artists;
  
  const artistGenre = {};

  const imageContainerRef= useRef()

  for (let i=0; i<artists.length;i++){
    if (artists[i].tags_lastfm)
    {
      // console.log(artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';')));
      if (!(artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';')) in artistGenre)){
        artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))] = [artists[i].artist_mb];
      }
      else{
        if (!(artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))].includes(artists[i].artist_mb)))
        artistGenre[artists[i].tags_lastfm.substring(0,artists[i].tags_lastfm.indexOf(';'))].push(artists[i].artist_mb);
      }
    }
  }

  console.log(artistGenre);

  function selectionChange()
  {
    imageContainerRef.current[0].innerHTML = "";
    // console.log("FIRST", imageContainerRef.current[0]);
    var a = document.getElementById('selectGenre').value
      for (var i in artistGenre[a]){
        var el = document.createElement("div");
        el.textContent = artistGenre[a][i]
        imageContainerRef.current[0].appendChild(el);
      }
    
    console.log(imageContainerRef.current[0]);
  }

  useEffect(() => {
    var sel = document.getElementById("selectGenre");
    imageContainerRef.current = document.getElementsByClassName("imageContainer");
    console.log(sel); 

    for (var a in artistGenre){
      try
      {
        var opt = a;
        var el = document.createElement("option");
        el.textContent = opt + "(" + artistGenre[a].length + ")";
        el.value = opt;
        sel.appendChild(el);
      }
      catch(err){
        console.log(err);
      }
    }
  });

  return (
    <div className="floatingImage">
      <h3>Floating Images chart here!</h3>
      <select id="selectGenre" onChange={selectionChange}>
        <option>Choose a genre</option>
      </select>
      <div className="imageContainer">

      </div>
    </div>
  );
}

export default FloatingImages
