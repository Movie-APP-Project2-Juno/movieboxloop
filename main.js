
//name space object
const moviesApp ={};

// get input from search bar

moviesApp.getInput = function(){
  const input =document.querySelector('#movieName');
  //const subButton = document.querySelector('#submitBtn');
  const form = document.querySelector('.searchForm');
  
  form.addEventListener('submit', function(e){
   e.preventDefault();
   //moviesApp.removeMovies();
   // remove movies
   document.querySelector('#displayResults').innerHTML="";
   fetch(`https://api.themoviedb.org/3/search/movie?api_key=71bddb9affbe35fa416aaaadad7cac9e&language=en-US&query=${input.value}&page=1&include_adult=false`)
     .then(function(response){
      if(response.ok){
        return response.json();
      }else{
        throw new Error(response.statusText);
      }
      
     })
     .then(function(responseData){
        console.log(responseData);
      moviesApp.displayMovies(responseData);
     })
     .catch(function(err){
      if (err.message === "Not Found") {
        alert("We couldn't find that movie!");
      } else {
        alert("Something went wrong...");
      }
     })
   input.value="";
  })
  
}

//display results 

moviesApp.displayMovies = async function(movies){
 console.log(movies.results);
 const movieLists= (movies.results).slice(0,8);
 console.log(movieLists);

 movieLists.forEach(function(movie){
  // poster_img link: https://image.tmdb.org/t/p/w300/p1F51Lvj3sMopG948F5HsBbl43C.jpg
  
  //get movie's id and store it in ID variable. 
  
  const ID = movie.id;
//   const movieOverview = movie.overview;

  moviesApp.getMoviePage(ID).then(homepage =>{
    console.log("response is? ",homepage );
    //console.log("Homepage is ", homepage);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="This is the movie's poster">
    <div>
      <p class='movieInfo'> Release Date: ${movie.release_date}</p> 
      <p> Score: ${movie.vote_average} </p> 
      <a href= "${homepage}" target="_blank">Find More</a>
    </div>

    <div class="synopsisOverlay">
        <p class="synopsisText">${movie.overview}</p>
    </div>
     `
    const ul = document.querySelector('#displayResults');
    ul.append(listItem);
  })
 

  
 })
}

// // //remove display results
// // moviesApp.removeMovies= function(){
// //   const ul = document.querySelector('#displayResults');
// //   ul.innerHTML="";
// }

//getMoviePage function
moviesApp.getMoviePage = async function(ID){
 // get another url to fetch more info data about the movie
 const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=71bddb9affbe35fa416aaaadad7cac9e`;

/*  let movieIdObject = await fetch(url)
 .then(function(response) {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
 })
 .then(function(responseData) {
    return responseData;
 })
 .catch(function(err) {
    if (err.message === "Not Found") {
       alert("We couldn't find that movie!");
     } else {
       alert("Something went wrong...");
     }
    })
 
 return movieIdObject; */

 let homepage = await fetch(url)
    .then(function(response){
     if(response.ok){
       return response.json();
     }else{
       throw new Error(response.statusText);
     }
     
    })
    .then(function(responseData){
     console.log(responseData);
     console.log(responseData.overview);
     return responseData.homepage;
    })
    .catch(function(err){
     if (err.message === "Not Found") {
       alert("We couldn't find that movie!");
     } else {
       alert("Something went wrong...");
     }
    })
    console.log("inside homepage is ", homepage)
    return homepage;
 }

//  PSEUDOCODE FOR WATCHLIST
//  make a button to click on and trigger the event handler
// it will store the li item in

const buttons = document.querySelectorAll('.tabButton');
const tabs = document.querySelector('.tabBox');
const tabContentEl = document.querySelectorAll('.tabContent');

tabs.addEventListener('click', function(e) {
    // console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    console.log(id);

    /* if(id) {
        // remove active from other buttons
        buttons.forEach(function(btn) {
            btn.classList.remove('active');
            e.target.classList.add('active');
        });
        // hide other tab content
        tabContentEl.forEach(function(tabContent) {
            tabContent.classList.remove('active');
        });
        const element = document.getElementById(id);
        element.classList.add('active');
    } */
});

/* fetch('https://api.themoviedb.org/3/movie/343611?api_key=71bddb9affbe35fa416aaaadad7cac9e')
.then(function(resp) {
    return resp.json();
})
.then(function(respJson) {
    console.log(respJson);
}) */

//make init function 
moviesApp.init=function(){
 moviesApp.getInput();
}


//run init function 
moviesApp.init();
