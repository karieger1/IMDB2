$(document).ready(function() {
	var rowString = $("#movieTemplate").html();
	var filmResults = _.template(rowString);

	var Pages = Backbone.Router.extend ({

		routes: {
			"": "home",
			"home": "home",
			"results/:query": "results",
			"watchList": "watchList"
		},

		home: function() {
			$(".page").hide();
			$("#home").show();
			
		},

		results: function(query) {
			$(".page").hide();
			$("#results").show();

				$.get(
				"http://www.omdbapi.com/?",
				{
					s: query
				},
				getFilms,
				"json"
			);

			function getFilms(films) {
			
				var watchList = [];

				console.log(films);
			
				for(var i=0; i<films.Search.length; i++) {
					$("#display-results").append(filmResults(films.Search[i]));
					
				}

				$(".movieTemplate").on("click", function(e) {
					var $added = ($(e.target)).clone();
					watchList.push($added);
					console.log(watchList);
					$("#toWatch").append($added);
				});
			}
		},

		 watchList: function() {
            $(".page").hide();
            $("#watchList").show();
            $("#myWatchList").html($("#toWatch").html());
        }
    });

	var myRouter = new Pages();
	Backbone.history.start();


    $("#search-form").on("submit", function(e) {
        e.preventDefault();
        $("#display-results").html("");
        var query = $("#query").val();
        myRouter.navigate("results/"+query, {trigger: true});
        $("#query").val("");
    });



	$("#go-back").on("click", function(e) {
		myRouter.navigate("home", {trigger: true});

		$("#query").val("");
	});




});