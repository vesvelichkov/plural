(function() {

  'use strict'

  var module = angular.module('psMovies');

  function fetchMovies($http) {
    return $http.get('data/movies.json')
                .then(function(response){
                  return response.data;
                });
  }

  function controller($http) {

    var model = this;
    model.movies = [];

    model.$onInit = function() {
      fetchMovies($http).then(function(movies) {
        model.movies = movies;
      });
    };

    model.upRating = function(movie) {
      console.log(movie);
      if(movie.rating < 5) {
        movie.rating ++;
      }
    };

    model.downRating = function(movie) {
      if(movie.rating > 1) {
        movie.rating --;
      }
    };

  }

  module.component("movieList", {
    templateUrl: "js/movie-list.component.html",
    controllerAs: "model",
    controller: ['$http', controller]
  });

} ());
