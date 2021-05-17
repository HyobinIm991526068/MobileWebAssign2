//Hyobin Im - 991526068

$(document).ready(function(){
    
    //get data from local storage and store into the variables
    var joke = localStorage.getItem("joke");
    var category = localStorage.getItem("category");

    //append to the proper sections in the HTML to print the output
    $('#joke').append(joke);
    $('#category').append(category);
})