// Form Submission
// storing form element in a variable
const formEl = document.getElementById('movieForm');
const displayResultsEl = document.getElementById('displayResults');
// listen for the submit on the form and store the "value" in a variable
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    // store the searched input value in a variable
    const inputEl = document.getElementById('movieName');
    // get the value of the value property and save it in a variable
    const movieSearch = inputEl.value;
    // call moviesApp.getMovies();
    moviesApp.getMovies(movieSearch);
})


//api key 
// a namespace object to hold our app:
const moviesApp ={};

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
 const movieLists= (movies.results).slice(0,9);
 console.log(movieLists);
 movieLists.forEach(function(movie){
  // poster_img link: https://image.tmdb.org/t/p/w300/p1F51Lvj3sMopG948F5HsBbl43C.jpg
  
  //get movie's id and store it in ID variable. 
  
  const ID = movie.id;

  moviesApp.getMoviePage(ID).then(homepage=>{
    console.log("response is? ",homepage );
    //console.log("Homepage is ", homepage);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="This is the movie's poster">
    <div>
      <p class='movieInfo'> Release Date: ${movie.release_date}, Score: ${movie.vote_average}</p>  
      <a href= "${homepage}" target="_blank">Find More</a>
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
 let homepage = await fetch(url)
    .then(function(response){
     if(response.ok){
       return response.json();
     }else{
       throw new Error(response.statusText);
     }
     
    })
    .then(function(responseData){
     
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



//make init function 
moviesApp.init=function(){
 moviesApp.getInput();
}


//run init function 
moviesApp.init();
