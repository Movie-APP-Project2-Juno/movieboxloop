//name space object
const moviesApp ={};
moviesApp.key= '71bddb9affbe35fa416aaaadad7cac9e';
// get input from search bar

moviesApp.getInput = function(){
  const input =document.querySelector('#movieName');
  const form = document.querySelector('.searchForm');
  
  form.addEventListener('submit', function(e){
   e.preventDefault();
   // remove movies
   document.querySelector('#displayResults').innerHTML="";
   
   // get movie data from API and display movies
   const url = new URL('https://api.themoviedb.org/3/search/movie?')
   url.search = new URLSearchParams({
    api_key:moviesApp.key,
    language:'en-US',
    query:`${input.value}`,
    page:'1',
    include_adult:'false'
   });
   fetch(url)
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

moviesApp.displayMovies = function(movies){
 
  //get a list of movies and store them in a variable
 const movieLists= (movies.results).slice(0,8);
 
 movieLists.forEach(function(movie){
  
  //get movie's id and store it in ID variable. 
  
  const ID = movie.id;

  moviesApp.getMoviePage(ID).then(homepage=>{
    // create li item
    const listItem = document.createElement('li');
    // if the homepage link doesn't exist, trun off the link; 
    const movieurl= (homepage!=""? 
    `<a href= "${homepage}" target="_blank">Find Me</a>`:
    `<a href= "javascript:void(0)">No Page</a>`)

    // if the poster img doesn't exist, load dummy img. 

    const moviePoster =( movie.poster_path!=null?
    `<img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="This is the movie's poster">`:
    `<img src="./assets/dummy.png" alt="This is a placeholder image">`
    );
    
    // add innerhtml to li item
    listItem.innerHTML = `
    
    ${moviePoster}
    <div>
      <p>Title: ${movie.title}</p>
      <p class='movieInfo'> Release Date: ${movie.release_date}</p> 
      <p> Score: ${movie.vote_average} </p> 
      ${movieurl}
    </div>

    <div class="synopsisOverlay">
      <p class="synopsisText">${movie.overview}</p>
    </div>
     `
     // append list item to ul 
    const ul = document.querySelector('#displayResults');
    ul.append(listItem);
  })
  
 })
}



//getMoviePage function
moviesApp.getMoviePage =  function(ID){
 // get another url to fetch more info data about the movie
 const movieurl = new URL(`https://api.themoviedb.org/3/movie/${ID}`)
 movieurl.search = new URLSearchParams({
  api_key:'71bddb9affbe35fa416aaaadad7cac9e'
 })
 let homepage = fetch(movieurl)
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
    
    return homepage;
 }




//make init function 
moviesApp.init=function(){
 moviesApp.getInput();
}


//run init function 
moviesApp.init();