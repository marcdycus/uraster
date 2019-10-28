$(document).ready(function () {

            var topic = [];

            function displayGifs() {
                
                var kind = $(this).attr("data-name");

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + kind + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
                
                $.ajax({
                  url: queryURL,
                  method: "GET"
                }).then(function(response) {
                    
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        var topicDiv = $("<div class='eachGif'>");
                        var p = $("<p>").text("Rating: " + results[i].rating);
                        var topicImage = $("<img>");
                        
                        topicImage.attr("src", results[i].images.original_still.url);
                        topicImage.attr("data-still", results[i].images.original_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height.url);
                        topicImage.attr("data-state", "still");
                        topicImage.addClass("gif");

                        topicDiv.append(p);
                        topicDiv.append(topicImage);

                        $("#gifContainer").prepend(topicDiv);
                        
                    }
                }); 
            
            }
            

            function renderButtons() {

                $("#buttons").empty();

                for (var i = 0; i < topic.length; i++) {
                    var a = $("<button>");
                    a.addClass("topic-btn");
                    a.attr("data-name", topic[i]);
                    a.text(topic[i]);
                    $("#buttons").append(a);
                }
            }

            $("#addCategory").on("click", function() {
                event.preventDefault();

                var theme = $("#topicSearch").val().trim();

                topic.push(theme);

                renderButtons();
            });

            $(".gif").on("click", function() {
                console.log("hello")
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                
            });

            $(document).on("click", ".topic-btn", displayGifs);

            


            renderButtons();

        });
