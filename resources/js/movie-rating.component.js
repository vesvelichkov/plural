(function() {

  'use strict'

  let module = angular.module('psMovies');

  module.component("movieRating", {
    templateUrl: "js/movie-rating.component.html",
    bindings: {
      value: "<"
    },
    controllerAs: "model",
    controller: function() {
        var model = this;

        model.$onInit = function() {
          model.entries = new Array(model.value);
        };

        model.$onChanges = function() {
          model.entries = new Array(model.value);
        }
    }

  });

} ());
