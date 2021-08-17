let seenJokes = [];
//Had to have same starter joke, because couldn't solve the problem, where the first random joke is not received quick enough (I did not have enough time for this)
let currentJoke = "NASA wants to save money so they asked Chuck Norris to kick the rockets into space and he tied a rope to the rocket to pull it back.";
let i = 0;

//function to get JSON info taken from: https://stackoverflow.com/questions/9838812/how-can-i-open-a-json-file-in-javascript-without-jquery
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function cardMove() {
    const classes = document.getElementById("card_1").classList;
    if (classes.length === 1) {
        document.getElementById("card_1").classList.add("cardToCenter");
        return
    }
    if (classes.length === 2) {
        document.getElementById("card_1").classList.add("cardFlipped");
        return
    }
    if (classes.length === 3) {
        document.getElementById("card_1").classList.remove("cardFlipped");
        document.getElementById("card_1").classList.add("cardToBin");
        if (seenJokes.length <= 5) {
            seenJokes.push(document.getElementsByClassName("cardBack")[0].textContent);
            loadJSON("https://api.chucknorris.io/jokes/random?category=money",function(data) { jokesManager(data); }, function(xhr) { console.error(xhr); });
        }
        else {
            if(i===4) {
                currentJoke = seenJokes[i];
                i = 0;
            }
            else {
                currentJoke = seenJokes[i];
                i++;
            }
        }
        //element removal code taken from: https://stackoverflow.com/questions/3387427/remove-element-by-id
        setTimeout(function () {
            document.getElementById("card_1").remove();
            createCard();},1500);
        return;
    }
}

function createCard() {
    let table = document.getElementById("table");
    let card = document.createElement("div");
    table.appendChild(card);
    card.classList.add("flipCard");
    card.id = "card_1";
    card = document.getElementById("card_1");
    let innerCard = document.createElement("div");
    innerCard.classList.add("innerCard");
    card.appendChild(innerCard);
    let cardFront = document.createElement("div");
    cardFront.classList.add("cardFront");
    innerCard.appendChild(cardFront);
    let cardDrawing = document.createElement("div");
    cardDrawing.classList.add("cardDrawing");
    cardFront.appendChild(cardDrawing);
    let cardBack = document.createElement("div");
    cardBack.classList.add("cardBack");
    innerCard.appendChild(cardBack);
    let text =document.createElement("p");
    while(currentJoke.length < 1) {
        console.log("Waiting for joke");
    }
    text.innerText = currentJoke;
    cardBack.appendChild(text);
}

function jokesManager(data) {
    currentJoke = data.value;
    console.log(currentJoke);
}

window.onload = loadJSON(
    "https://api.chucknorris.io/jokes/random?category=money",
    function(data) { jokesManager(data); },
    function(xhr) { console.error(xhr); }

);

window.onload = createCard();
