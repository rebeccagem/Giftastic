$(document).ready(function () {

    var cuteThings = ["dragonfly", "kittens", "puppies", "piglets"];


    // var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=LCfpjoSmQfkLZR5namsFIB3hqM7uFLLh&limit=5");
    // xhr.done(function (data) { console.log("success got data", data); });

    function displayGifs() {
        // $("#gifContainer").empty();

        // Here we grab the text from the input box
        var cuteName = $(this).data('name');

        // Here we construct our URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cuteName + "&api_key=LCfpjoSmQfkLZR5namsFIB3hqM7uFLLh&limit=3&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                //this stores a part of the returned api object in a variable
                for (i = 0; i < 3; i++) {
                    var imageUrl = response.data[i].images.fixed_height_still.url;
                    var imageURLGif = response.data[i].images.fixed_height.url;

                    //creates div to hold image and its buttons
                    var imgCard = $("<div>").addClass("imgCard");

                    //this creates an image tag to hold the generated gif
                    var cuteImage = $("<img>").addClass("imageClass");

                    //this puts the image url from the api into the image tag src
                    cuteImage.attr("src", imageUrl);
                    cuteImage.attr("alt", cuteName);
                    //this makes each image created load above the older images

                    var saveBtn = $("<button>").addClass("saveBtns");

                    saveBtn.text("Download");
                    imgCard.append(cuteImage, saveBtn);
                    // $(cuteImage).appendTo(".imgCard");
                    // $(saveBtn).appendTo(".imgCard");
                    $("#images").prepend(imgCard);

                }
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


    $(document).on("click", ".imageClass", hello);


    function hello() {
        console.log("HI");
        console.log(this);

        if (this.src.indexOf("_s") != -1) {
            $(this).attr('src', $(this).attr('src').replace('_s', ''));
        }
        //listens for the user to click on an image and then plays the image
        else {
            $(this).attr('src', $(this).attr('src').replace('.gif', '_s.gif'));
        }


    }
    //creates initial set of buttons
    makeBtn();

});
