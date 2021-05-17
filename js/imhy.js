//Hyobin Im - 991526068

//gets categories from the json file by calling it
$(document).ready(function(){
    $.ajax({
        dataType : "json",
        url : "http://api.icndb.com/categories",
        type : "get",
        //on success empty the dropdown list from the HTML
        success : function(data){
            $('#dropdown').empty();

            //add an option that says choose category
            $('#dropdown').append('<option> Choose Category </option>');

            //for loop to go through all the values and put them into the drop down list
            for (let i = 0; i < data.value.length; i++){
                $('#dropdown').append(`<option>${data.value[i]}</option`);
            }
        },
        
        //error alert if fail to retrieve API
        error : function(){
            alert("Error in retrieving API");
        }
    })
})

//function that runs onclick of the button from HTML
async function btnClick(){

    //set the variable category to be the value that is selected
    let category = document.getElementById('dropdown').value;

    //if category is choose category, call the random API
    if (category == "Choose Category"){
        await $.ajax({
            dataType : "json",
            url : "http://api.icndb.com/jokes/random",
            type : "get",
            
            //on successful call, set the joke and category to local storage
            success : function(data){
                localStorage.setItem("joke", JSON.stringify(data.value.joke));
                localStorage.setItem("category", "Any");
            },

            //error alert if fail to retrieve API
            error : function(){
                alert("Error in retrieving API");
            }
        })
    //else limit the category to the chosen category on call for API
    }else {
        await $.ajax({
            dataType : "json",
            url : `http://api.icndb.com/jokes/random?limitTo=${category}`,
            type : "get",

            //on successful call, set joke and category to local storage
            success : function(data){
                localStorage.setItem("category", category);
                localStorage.setItem("joke", JSON.stringify(data.value.joke));
            },

            //error alert if fail to retrieve API
            error : function(){
                alert("Error in retrieving API");
            }
        })
    }

    //direct to quote page
    redirectPage("pages/quote.html");
}

//redirect the user to a new page
const redirectPage = (page) => {
    // get current URL from browser
    let URL = window.location.href;
    // remove get parameters from the URL
    URL = URL.slice(0, URL.lastIndexOf('/'));
    // replace the current URL with that of the URL for the new page
    window.location.href = `${URL}/${page}`;
}