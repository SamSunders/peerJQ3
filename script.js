var apikey = 'd45b7e7fdaaba16377b27ad541b918a2027822a3'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
    for(var i = 0; i< results.length; i++){
    	$(".gameResults").append("<div class='game thumbnail'></div>");
    	var el = $('.game').last();
    	el.append("<img src=" + results[i].image.icon_url + ">");
    	el.append("<p>Title: " + results[i].name + "</p>");
    	el.append("<p id = 'hidden'>Description: " + results[i].description + "</p>");
    	el.append("<p id = 'hidden'>Release Date: " + results[i].original_release_date + "</p>");
    	for(var j = 0; j < results[i].platforms.length; j++){
    		
			el.append("<p id = 'hidden'>Platform: " + results[i].platforms[j].name + "</p>");
			console.log(results[i].platforms[j].name);
		}
    }
}

$(document).ready(function() {
	
	console.log("DOM LOADED");
	
	// Start the search here!
	$("body").on("click", ".searchButton", function(event){
		event.preventDefault();
		// event.preventDefault;
		var userSearch = $("#testing :input").val();
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
