$(document).ready(function () {



    var arrAnimals = [
        "Aardvark",
        "Albatross",
        "Alligator",
        "Alpaca",
        "Ant",
        "Anteater",
        "Antelope",
        "Ape",
        "Armadillo",
        "Donkey",
        "Baboon",
        "Badger",
        "Barracuda",
        "Bat",
        "Bear",
        "Beaver",];


    //  Function to display animal buttons on top of the page
    function renderButtons() {

        for (var i = 0; i < arrAnimals.length; i++) {
            $("#forWords").append(`
            <button type="button" class="btn btn-primary clickAnimal" data-name=`+ arrAnimals[i] + `>` + arrAnimals[i] + `</button>
            `)
        }

    }

    function displayGif() {

        $("#forGifs").empty();
        var giffy = $(this).attr("data-name");


        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giffy + "&api_key=YAqL6dbgrqaHpwYRWmBXqPiAVIAE7YQd&limit=10";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            for (var i = 0; i < response.data.length; i++) {
                
                var gifDiv = $("<div>");

                gifDiv.addClass("col-md-4");

                gifDiv.attr('id', "gif");

                var gifRating = response.data[i].rating;

                var gifImage = response.data[i].images.fixed_width_still.url;

                gifDiv.append("<p> Rating : " + gifRating);

                gifDiv.append("<img src=" + gifImage + " data-animate="+response.data[i].images.fixed_width.url+ " data-still="+gifImage+" data-state='still'>");


                $("#forGifs").append(gifDiv);


            }

        });

    }

    function gifClick(){
        var state = $(this).attr("data-state");

        if (state == "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }else {
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    };

    function addBtn() {

        event.preventDefault();

        $("#forWords").empty();

        var newBtn = $("#animal-input").val();

        arrAnimals.push(newBtn);

        renderButtons();

        $("#animal-input").val("");

       
    }


    $(document).on("click", ".clickAnimal", displayGif);

    $(document).on("click", "#add-animal", addBtn);

    $(document).on("click", "img", gifClick);

    renderButtons();



})

