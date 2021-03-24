$(document).ready(() => {
    $("#searchForm").on('submit', (e) => {
        e.preventDefault();

        let searchText = $("#searchText").val();
        getMovies(searchText);
    });
});

function getMovies(searchText) {
    //make request to api using axios
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=7e867338b98b433d55d1c391aa3d75bb&language=en-US&query=" + searchText)
        .then(function(response) {
            let movies = response.data.results;
            let output = '';
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
            $('#movies').html(output);
        })
        .catch(function(error) {
            console.log(error);
        });
}

var myMovieList = [];

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    myMovieList.push(id);
    //attempting to add stringify and store the movie wishlist to show more than one movie in my list
    //sessionStorage.setItem(myList, JSON.stringify(myMovieList));
    //console.log(JSON.stringify(myMovieList));

    window.location = 'myMovies.html';
    return false;
}

function getMyMovies() {

    let movieId = sessionStorage.getItem('movieId');
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=7e867338b98b433d55d1c391aa3d75bb")
        .then(function(response) {
            let movie = response.data;
            console.log(movie);
            let output = `
            <div class="col-md-3">
            <div class="well text-center ">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5><br>
              <div class="bold">Description: ${movie.overview}</div>
              <div class="bold">Released: ${movie.release_date}</div>
              
            </div>
          </div>
          </div>
          
          `;
            $('#movie').html(output);
        })
        .catch(function(error) {
            console.log(error);
        });

}