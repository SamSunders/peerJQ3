var apikey = 'd45b7e7fdaaba16377b27ad541b918a2027822a3'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
    for(var i = 0; i< results.length; i++){

    	$(".gameResults").append("<div class='game thumbnail'></div>");
    	var el = $('.game').last();
    	el.append("<img class='icon' src=" + results[i].image.icon_url + ">");
    	el.append("<h1 class = 'nameText'>" + results[i].name + "</h1>");
    	el.append("<h3 class = 'makeHide gameTop'>Release Date: " + results[i].original_release_date + "</h3>");
    	el.append("<h3 class = 'makeHide'>Platforms: </h3");

    	for(var j = 0; j < results[i].platforms.length; j++){   		
			el.append("<h6 class = 'makeHide'>" + results[i].platforms[j].name + "</h6>");
			console.log(results[i].platforms[j].name);
		}
		el.append("<h3 class = 'makeHide'>Description: " + results[i].description + "</h3>");
    }
}

$(document).ready(function() {
	
	console.log("DOM LOADED");
	
	// Start the search here!
	$("body").on("click", ".searchButton", function(event){
		event.preventDefault();
		// event.preventDefault;
		var userSearch = $("#testing :input").val();
		$('.gameResults').children().remove();
		//console.log(userSearch);
		search(userSearch);
		// for(var i = 0; i < results.length; i++){
		// 	$(".game").append(data.results[i].name);
		// 	$(".game").append(data.results[i].photo);
		//$(".game1").append("<p>The game info will go here");	

		// }
	});
	
	//console.log(userInput);
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	        console.log("Results Finished");
	    }
	});

}
