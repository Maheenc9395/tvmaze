// load the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}                    











let apiURL = 'https://api.tvmaze.com/';

// initialize page after HTML loads
window.onload = function() {
   closeLightBox();  // close the lightbox because it's initially open in the CSS
   document.getElementById("button").onclick = function () {
     searchTvShows();
   };
   document.getElementById("lightbox").onclick = function () {
     closeLightBox();
   };
} // window.onload


// get data from TV Maze
async function searchTvShows() {
  document.getElementById("main").innerHTML = "";
  
  let search = document.getElementById("search").value;  
   
  try {   
      const response = await fetch(apiURL + 'search/shows?q=' + search);
      const data = await response.json();
      console.log(data);
      showSearchResults(data);
  } catch(error) {
    console.error('Error fetching tv show:', error);
  } // catch
} // searchTvShows 
 

// change the activity displayed 
function showSearchResults(data) {
  
  // show each tv show from search results in webpage
  for (let tvshow in data) {
    createTVShow(data[tvshow]);
  } // for

} // updatePage

// in the json, genres is an array of genres associated with the tv show 
// this function returns a string of genres formatted as a bulleted list
function showGenres(genres) {
   let output = "<ul>";
   for (g in genres) {
      output += "<li>" + genres[g] + "</li>"; 
   } // for       
   output += "</ul>";
   return output; 
} // showGenres

// constructs one TV show entry on webpage
function createTVShow (tvshowJSON) {
  
    // get the main div tag
    var elemMain = document.getElementById("main");
    
    // create a number of new html elements to display tv show data
    
showtitleDiv = document.getElementById("showtitle");
genreDiv = document.getElementById("genre");
RatingDiv =document.getElementById("rating");
summaryDiv = document.getElementById("summary");


    var elemDiv = document.createElement("div");
    var elemImage = document.createElement("img");
    
    var elemShowTitle = document.createElement("h2");
    elemShowTitle.classList.add("showtitle"); // add a class to apply css
    
    var elemGenre = document.createElement("div");
    var elemRating = document.createElement("div");
    var elemSummary = document.createElement("div");
    
    // add JSON data to elements


if (tvshowJSON.show.image){
  let elemImage = document.createElement("img");
  elemImage.src = tvshowJSON.show.image.medium;
  elemDiv.appendChild(elemImage);
}




    // if (tvshowJSON.show.image == null) {
    //   elemImage.src = tvshowJSON.show.image;
    // } else if (tvshowJSON.show.image != null) {
    //   elemImage.src = tvshowJSON.show.image.original;
    // } else {
    //   elemImage.src = "sorry no image Avaliable: "
    // }



// if(tvshowJSON.show.image == null){
//   elemImage.src = tvshowJSON.show.image.medium;
// }else{
//   elemImage.src = "sorry no image avaliable: "
// }



    // elemImage.src = tvshowJSON.show.image.medium;
    
    elemShowTitle.innerHTML = tvshowJSON.show.name;
    elemGenre.innerHTML = "Genres: " + showGenres(tvshowJSON.show.genres);
    elemRating.innerHTML = "Rating: " + tvshowJSON.show.rating.average;
    elemSummary.innerHTML = tvshowJSON.show.summary;
    
       
    // add 5 elements to the div tag elemDiv
    elemDiv.appendChild(elemShowTitle);  
    elemDiv.appendChild(elemGenre);
    elemDiv.appendChild(elemRating);
    elemDiv.appendChild(elemSummary);
    elemDiv.appendChild(elemImage);
    
    // get id of show and add episode list
    let showId = tvshowJSON.show.id;
    fetchEpisodes(showId, elemDiv);
    
    // add this tv show to main
    elemMain.appendChild(elemDiv);
    
} // createTVShow

// fetch episodes for a given tv show id
async function fetchEpisodes(showId, elemDiv) {
     
  console.log("fetching episodes for showId: " + showId);
  
  try {
     const response = await fetch(apiURL + 'shows/' + showId + '/episodes');  
    
     const data = await response.json();
     console.log("episodes");
     console.log(data);
     showEpisodes(data, elemDiv);
  } catch(error) {
    console.error('Error fetching episodes:', error);
  } // catch
    
} // fetch episodes



function lightbox(data){
  console.log(data);
  for (index in data){
    console.log(data[index]);
    let newDiv = document.createElement("div");
    let newimage = document.createElement("img");
    newimage.src = data[index].show.image.medium;
    newimage.alt = data[index].show.name;
    newimage.appendChild(newimage);
  
  
    letshowtitle = document.createElement("h2");
    newshowtitle.src = data[index].show.title;
    newshowtitle.alt = data[index].show.title;
    newshowtitle.appendChild(newshowtitles);

    let showgenre = document.createElement("h3");
    newgenre.src = data[index].show.genres;
    newgenre.alt = data[index].show.genres;
    newgenres.appendChild(newgenere);


    letRating = document.createElement("h3");
    newRating.src = data[index].show.rating;
    newrating.alt = data[index].show.rating;
    newrating.appendChild(newrating);

    letsummary = document.createElement("h3");
    newsummary.src = data[index].show.summary;
    newsummary.alt = data[index].show.summary;
    newsummary.appendChild(newsummary);





  
    elemMian.appendChild(newDiv);
  }

}

// list all episodes for a given showId in an ordered list 
// as a link that will open a light box with more info about
// each episode
function showEpisodes (data, elemDiv) {
     
    let elemEpisodes = document.createElement("div");  // creates a new div tag
    let output = "<ol>";
    for (episode in data) {
        output += "<li><a href='javascript:showLightBox(" + data[episode].id + ")'>" + data[episode].name + "</a></li>";
    }
    output += "</ol>";
    elemEpisodes.innerHTML = output;
    elemDiv.appendChild(elemEpisodes);  // add div tag to page
        
} // showEpisodes




// async function fetchEpiinfo(){

// try{
//   const response = await fetch(apiURL + "episodes/" ,EpisodeId);
//   const info = await response.json();


// }for(index in info){
//   document.getElementById("message").innerHTML = "<h3>" + info.name + "</h3>";
//   document.getElementById("message").innerHTML += "<p>" + "season" + "" + info.season;
// }if(info.image == null){
//   document.getElementById("message").innerHTML = "<img src=" + info.image.medium;
// }
// document.getElementById("message").innerHTML += "<p>" + info.summary + "</p>";
// }







function showLightBox(episodeNumber){
  fetch('https://api.tvmaze.com/episodes/' + episodeNumber)
 .then(response => response.json())
 .then(data => createEpisode(data));


// document.getElementById("message").innerHTML = 'https://api.tvmaze.com/episodes/' + episodeNumber;    

} // showLightBox

// close the lightbox
function closeLightBox(){
  document.getElementById("lightbox").style.display="none";
document.getElementById("message").innerHTML = "";
} // closeLightBox


function createEpisode(data){
console.log(data);
document.getElementById("lightbox").style.display="block";

let output = document.getElementById("message");
let name = document.createElement("div");
let season = document.createElement("div");
let image = document.createElement("img");
let summary = document.createElement("summary");
summary.setAttribute("id", "summary");









// get json
if (data.image != null) {
image.src = data.image.medium;
}
  

name.innerHTML = data.name;
season.innerHTML = "Season: " + data.season + ", Episode: " + data.number;
if( data.summary != null && data.summary !=""){
summary.innerHTML = data.summary;
output.appendChild(summary);
}
else{
summary.innerHTML = "No summary available yet";
output.appendChild(summary);
}

output.appendChild(image);
output.appendChild(name);
output.appendChild(season);

} // createEpisode





















