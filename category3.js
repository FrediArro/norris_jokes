let seenJokes = [];
//Had to have same starter joke, because couldn't solve the problem, where the first random joke is not received quick enough (I did not have enough time for this)
let currentJoke = "Chuck Norris is the ultimate mutex, all threads fear him.";
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

function jokesManager(data) {
    currentJoke = data.value;
    console.log(currentJoke);
}

function updateJoke() {
    if (seenJokes.length <= 5) {
        loadJSON(
            "https://api.chucknorris.io/jokes/random?category=music",
            function(data) { jokesManager(data); },
            function(xhr) { console.error(xhr); });
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
    document.getElementById("title").innerText = currentJoke;
    seenJokes.push(currentJoke)
}

window.onload = loadJSON(
    "https://api.chucknorris.io/jokes/random?category=dev",
    function(data) { jokesManager(data); },
    function(xhr) { console.error(xhr); }

);

window.onload = updateJoke();