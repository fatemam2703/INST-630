import React, { useEffect, useRef } from 'react';
import './floatingImages.css';
import data from '../data/first2000rows.json';

function FloatingImages() {
  const artists = data.artists;
  
  const artistGenre = {};

  const imageContainerRef= useRef()

  const artistListeners = {};

  var minListen = Infinity;

  var maxListen = -1;

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
      artistListeners[artists[i].artist_mb] = Number(artists[i].listeners_lastfm)
      // var artistListen = Number(artists[i].listeners_lastfm);
      if (artistListeners[artists[i].artist_mb] > maxListen) { maxListen = artistListeners[artists[i].artist_mb]; }
      if (artistListeners[artists[i].artist_mb] < minListen) { minListen = artistListeners[artists[i].artist_mb]; }
    }
  }

  // console.log(artistGenre);
  // console.log(artistListeners);
  // console.log(minListen,maxListen);

  function selectionChange()
  {
    imageContainerRef.current[0].innerHTML = "";
    document.getElementById("my_frame").style.display = "none";
    // console.log("FIRST", imageContainerRef.current[0]);

    var a = document.getElementById('selectGenre').value;
    artistGenre[a].sort();
      for (var i in artistGenre[a]){
        // console.log(artistGenre[a].);
        imageContainerRef.current[0].style.setProperty('--grid-rows', artistGenre[a].length/6);
        imageContainerRef.current[0].style.setProperty('--grid-cols', 6);
        var size = artistListeners[artistGenre[a][i]]/(maxListen-minListen)*350;
        // console.log(size.toString());
        var el = document.createElement("div");
        var ol = imageContainerRef.current[0].appendChild(el)
        // console.log(ol);
        ol.className = "grid-item";
        ol.style.width = size.toString()+"px";
        ol.style.height = size.toString()+"px";
        // console.log(ol.style.width);
        ol.textContent = artistGenre[a][i]
        // console.log(iFrameDiv);
        el.addEventListener("click", openIframe);

        if(artistGenre[a][i]==="Coldplay"){
          // el.addEventListener("click",openIframe);
          el.style.backgroundImage = "url('https://i.scdn.co/image/ab67706f00000003a231f671c289555cfd09f716')";
          el.style.backgroundPosition = "center";
          el.style.backgroundSize = "cover";
        }
        // imageContainerRef.current[0].appendChild(el);
      }
    
    // console.log(imageContainerRef.current[0]);
    // makeRows(artistGenre.length,7);

    // getData("YFoolâ€™s Garden");

  }

  async function openIframe(){
    console.log("hi",this.textContent);
    const id = await getData(this.textContent);
    var iFrameDiv = document.getElementById("my_iframe");
    iFrameDiv.src = "https://open.spotify.com/embed/artist/"+id+"?utm_source=generator";
    var el = document.getElementById("my_frame");
    el.style.display = "inline";
    console.log(el.style.display);
    window.scrollTo(0, document.body.scrollHeight)
  }

  async function getData(artist_name) {
    const token = "BQDOhrvrerfFOVp_xY6DKEODVqiG_WfeEh9jI7rsNw6zPR7IytQelwf_vz9pqP3was5m7qus_-_FzX3X5dZVXlO3VWFnRkG1JqNIUwi9qUqhLhKWROosjLg57_to1TywB8tUGZ6y8OlMZsoYGzQGSv9eJFgLRCA9RAcyDdai1XA_N6A3yGB62-bTFK9pR1g";
    const data = await fetch('https://api.spotify.com/v1/search?q='+artist_name+'&type=artist', {
      method: "GET",
      headers: {"Authorization": `Bearer ${token}`}
    })
    const json = await data.json();
    console.log(json.artists.items[0].id, json.artists.items[0].name);
    return (json.artists.items[0].id)
  }

  useEffect(() => {
    var sel = document.getElementById("selectGenre");
    imageContainerRef.current = document.getElementsByClassName("imageContainer");
    // console.log(sel); 

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
      <div className='simpleChartContainer'>
        <div className="title-header">
          <h3>Find Top Artists across Genres</h3>
        </div>
        <select id="selectGenre" onChange={selectionChange}>
          <option>Choose a genre</option>
        </select>
        <br></br>
        <br></br>
        <p id="text-para">Click on a bubble to play some music!</p>
        <br></br>
        <br></br>
        <div className="imageContainer">

        </div>
        <br></br>
        <div id="my_frame">
          <iframe title ="my_frame" id="my_iframe" src="https://open.spotify.com/embed/artist/4gzpq5DPGxSnKTe4SA8HAU?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
}

export default FloatingImages
