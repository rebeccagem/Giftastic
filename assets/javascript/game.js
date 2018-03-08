$(document).ready(function () {

    var cuteThings = ["nothingisfunny", "oliversin", "eloylannoo", "100soft", "batburl", "JamesGuthman", "xponentialdesign", "caromartini", "blakekathryn", "russelletchen", "asugarhigh", "patakk", "AnchorPoint", "parthkothekar", "anamouyis", "oliviawhen", "guillellano", "alvaroabrante", "sophia-antidz", "bigbadbarth", "shuttertoast", "hoppip", "Parallel_studio_", "brinkofsound", "lazymom", "ioanahara", "samcannon", "andrewbenson", "29thfloor", "nikitaliskov", "pernillekjaer", "sakkesoini", "philipparice"];

    var notCuteThings = ["traffic", "work"]

    var cuteName;

    function displayGifs() {

        // Here we grab the text from the input box
        cuteName = $(this).data('name');

        // Here we construct our URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?username=" + cuteName + "&api_key=LCfpjoSmQfkLZR5namsFIB3hqM7uFLLh&limit=10&rating=g";
        var queryURL2 = "https://api.giphy.com/v1/gifs/search?q=" + cuteName + "&api_key=LCfpjoSmQfkLZR5namsFIB3hqM7uFLLh&limit=10&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //this stores a part of the returned api object in a variable
            if(response.data.length===10){
                for (i = 0; i < 10; i++) {

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
    
                    var saveBtn = $("<a>").addClass("saveBtns btn");
    
                    saveBtn.text("Download");
                    saveBtn.attr("href", response.data[i].images.original.url).attr("target", "_blank");
                    console.log(response.data[i].images.original.url);
                    imgCard.append(cuteImage, saveBtn);
                    // $(cuteImage).appendTo(".imgCard");
                    // $(saveBtn).appendTo(".imgCard");
                    $("#images").prepend(imgCard);
                }
                return null
            } else {
                return  $.ajax({url: queryURL2, method: "GET"})
            }
        }).then(function (response) {
            if(!response) return
            console.log(response);
        })
    }


function displayGIFs(){
    
}


function makeBtn() {
    $("#btnContainer").empty();
    for (i = 0; i < cuteThings.length; i++) {
        ///this adds the buttons with classes and data names
        var a = $("<button>").addClass("cuteBtn").attr("data-name", cuteThings[i]).text(cuteThings[i]);

        var connect = $("<a>").attr("href", "https://giphy.com/" + cuteThings[i]).attr("target", "_blank").append("<i class='fas fa-external-link-alt'>");

        a.append(connect);

        $("#btnContainer").append(a);
    }
}

//when user clicks submit
$("#submitBtn").on("click", function (event) {
    //prevents page from refreshing
    event.preventDefault();
    //takes value of user submission and assigns it to variable userInput
    var userInput = $("#userInput").val().trim();
    cuteThings.push(userInput);

    //runs with new buttons added
    makeBtn();
});


$(".saveBtns").click(function () {
    var href = $(".saveBtns").attr("href");
    window.location.href = href;
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
