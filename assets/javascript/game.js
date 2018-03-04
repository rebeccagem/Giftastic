$(document).ready(function () {

    var cuteThings = ["ducklings", "kittens", "puppies", "piglets"];


    // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=LCfpjoSmQfkLZR5namsFIB3hqM7uFLLh&limit=5");
    // xhr.done(function (data) { console.log("success got data", data); });

    function displayGifs() {
        // $("#gifContainer").empty();

        // Here we grab the text from the input box
        var cuteName = $(this).data('name');

        // Here we construct our URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cuteName + "&api_key=LCfpjoSmQfkLZR5namsFIB3hqM7uFLLh&limit=20";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                //this stores a part of the returned api object in a variable
                var imageUrl = response.data.image_original_url;

                //this creates an image tag to hold the generated gif
                var cuteImage = $("<img>");

                //this puts the image url from the api into the image tag src
                cuteImage.attr("src", imageUrl);
                cuteImage.attr("alt", cuteName);

                //this makes each image created load above the older images
                $("#images").prepend(cuteImage);

            });
    }

    function makeBtn() {
        $("#btnContainer").empty();
        for (i = 0; i < cuteThings.length; i++) {
            ///this adds the buttons with classes and data names
            var a = $("<button>").addClass("cuteBtn").attr("data-name", cuteThings[i]).text(cuteThings[i]);
            $("#btnContainer").append(a);
        }
    }

    //when user clicks submit
    $("#submitBtn").on("click", function () {
        //prevents page from refreshing
        event.preventDefault();
        //takes value of user submission and assigns it to variable userInput
        var userInput = $("#userInput").val().trim();
        cuteThings.push(userInput);

        //runs with new buttons added
        makeBtn();
    });

    //listen to document for click event
    $(document).on("click", ".cuteBtn", displayGifs);

    //creates initial set of buttons
    makeBtn();

});
