var breedImage = $("#breed-image");
var dropDown = $("#dog-breeds");
var allowSubmit = true;
var breed;


$.get('https://dog.ceo/api/breeds/list/all', function(data){
    let dogBreeds = data.message;
    // console.log(dogBreeds);

    for(let breedVal in dogBreeds){
        dropDown.append('<option value= "' + breedVal + '">' + breedVal + '</option>')
    }
});


/* if dropDown option is changed */
/* The change event occurs when the value of an element has been changed (only works on <input>, <textarea> and <select> elements).*/
dropDown.change(function(){
    allowSubmit = true;
});


$('form button').click(function(event){
    event.preventDefault();

    if(allowSubmit){
        breed = dropDown.val(); /* The .val() method is primarily used to get the values of form elements such as input, select and textarea. */
        displayDogImage(breed);
        allowSubmit = false;
    }
});


function displayDogImage(breed){
    /* eg: https://dog.ceo/api/breed/<BreedName>/images */
    let url = "https://dog.ceo/api/breed/" + breed + "/images/random";

    $('#breed-image img').remove(); /* The remove() method removes the selected elements, including all text and child nodes. */
    
    $.get(url, function(data){
        let imageUrl = data.message;
        breedImage.append('<img src=" ' + imageUrl + '" alt="' + breed + '">');
    });
}


$('#next').click(function(event){
    event.preventDefault();
    $('#dog-image img').remove();
    /* the .val() When called on an empty collection, it returns undefined. */
    if(breed !== undefined){
         displayDogImage(breed);
    }
});
