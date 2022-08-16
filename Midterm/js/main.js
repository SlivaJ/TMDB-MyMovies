$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();

    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  //make request to api using axios
  // Make a request for a user with a given ID
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=7e867338b98b433d55d1c391aa3d75bb&language=en-US&query=" +
        searchText
    )
    .then(function (response) {
      let movies = response.data.results;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center ">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5><br>
              <div class="bold">Description: ${movie.overview}</div>
              <div class="bold">Released: ${movie.release_date}</div>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Add Movie</a>
            </div>
          </div>
        `;
      });
      $("#movies").html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

var myMovieList = [];

function movieSelected(id) {
  console.log("ID: ", id);
  myMovieList = JSON.parse(sessionStorage.getItem("sessionMovieList"));
  myMovieList.push(id);
  console.log("movie id list: ", myMovieList);
  sessionStorage.setItem("sessionMovieList", JSON.stringify(myMovieList));
  //sessionStorage.setItem('movieId', id);
  //myMovieList.push(id);

  //essionStorage.setItem('sessionMovieList', JSON.stringify(myMovieList));

  //window.location = 'myMovies.html';
}

function getMyMovies() {

  console.log("parseing list");
  myMovieList = JSON.parse(sessionStorage.getItem("sessionMovieList"));
  console.log("getting my movies", myMovieList);
  var myMovies = [];
  myMovieList.forEach(movieID => {
    console.log(movieID);
    axios.get("https://api.themoviedb.org/3/movie/" + movieID+ "?api_key=7e867338b98b433d55d1c391aa3d75bb")
        .then(function (response){
            console.log(response.data);
            console.log(response.data.title,response.data.overview,response.data.poster_path);
            //new MovieDisplay(response.data.title,response.data.description,response.data.poster_path);
            
            myMovies.push(new MovieDisplay(response.data.title,response.data.overview,response.data.poster_path));
        });
  });  
  
  
  
  
  myMovies.forEach
  
  output = "";
  output += `
          <div class="col-md-3">
            <div class="well text-center ">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5><br>
              <div class="bold">Description: ${movie.overview}</div>
              <div class="bold">Released: ${movie.release_date}</div>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Add Movie</a>
            </div>
          </div>
        `;

}


function MovieDisplay(title,description,poster_path){
    this.title = title;
    this.description = description;
    this.poster_path = poster_path;
}