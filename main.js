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

// API url
moviesApp.url = "https://api.themoviedb.org/3/search/movie";
// API key
moviesApp.key = "71bddb9affbe35fa416aaaadad7cac9e";

// crete a method on the moviesApp object which requests info. from the API
moviesApp.getMovies = function(movieInput) {
    // use the URL constructor to specify the parameters we wish to incldue in our API endpoint.
    const url = new URL(moviesApp.url);
    url.search = new URLSearchParams({
        // pass in our API key as a parameter
        api_key: moviesApp.key,
        query: movieInput
    })

    // using  the fetch API to make a request to the TMDB API movie search endpoint
    // pass in the new URL with params from the URLSearchParams constructor
    fetch(url)
    .then(function(response) {
        // parse this response into JSON
        // return the JSON response to pass it on to the next function
        // return response.json();
        console.log("hallelujah!!");
        return response.json();
    })
    // parse the JSON Promise response and get JSON formatted data
    .then(function(jsonResponse) {
        console.log(jsonResponse);
    })
}



// an init method that will run when our app first loads.
moviesApp.init = function() {
    // calling the methods which makes the request to the API
    moviesApp.getMovies();
}

// call the init method to kickstart our app
moviesApp.init();

/* 
fetch("https://api.themoviedb.org/3/search/movie?api_key=71bddb9affbe35fa416aaaadad7cac9e&query=fight club")
.then(function(response) {
    return response.json();
})
.then(function(responseData) {
    console.log(responseData);
})
 */
fetch("https://api.themoviedb.org/3/movie/550?api_key=71bddb9affbe35fa416aaaadad7cac9e")
.then(function(resp) {
    console.log("sup");
    return resp.json();
})
.then(function(jsonResp) {
    console.log(jsonResp);
})