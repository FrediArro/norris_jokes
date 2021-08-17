let seenJokes = [];
//Had to have same starter joke, because couldn't solve the problem, where the first random joke is not received quick enough (I did not have enough time for this)
let currentJoke = "\"Let the Bodies Hit the Floor\" was originally written as Chuck Norris' theme song.";
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


let utterance = new SpeechSynthesisUtterance(currentJoke);
utterance.volume = 1;
utterance.onend = function () {
    document.getElementById("play").classList.remove("playBlinking");
    document.getElementById("leftCog").classList.remove("fa-spin");
    document.getElementById("rightCog").classList.remove("fa-spin");
};

function speak() {
    if (window.speechSynthesis.speaking) {
        console.log("resume");
        window.speechSynthesis.resume();
    }
    else {
        console.log("speak");
        window.speechSynthesis.speak(utterance);
    }
    document.getElementById("play").classList.add("playBlinking");
    document.getElementById("pause").classList.remove("pauseBlinking");
    document.getElementById("leftCog").classList.add("fa-spin");
    document.getElementById("rightCog").classList.add("fa-spin");
}

function pause() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        document.getElementById("leftCog").classList.remove("fa-spin");
        document.getElementById("rightCog").classList.remove("fa-spin");
        document.getElementById("play").classList.remove("playBlinking");
        document.getElementById("pause").classList.add("pauseBlinking");
        console.log("pause");
    }
}

function stepForward() {
    window.speechSynthesis.cancel();
    document.getElementById("leftCog").classList.remove("fa-spin");
    document.getElementById("rightCog").classList.remove("fa-spin");
    document.getElementById("play").classList.remove("playBlinking");
    document.getElementById("pause").classList.remove("pauseBlinking");
    seenJokes.push(currentJoke);
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
    utterance = new SpeechSynthesisUtterance(currentJoke);
    document.getElementById("runningJoke").innerText = currentJoke;
}

function stepBackward() {
    speechSynthesis.cancel();
    document.getElementById("leftCog").classList.remove("fa-spin");
    document.getElementById("rightCog").classList.remove("fa-spin");
    document.getElementById("play").classList.remove("playBlinking");
    document.getElementById("pause").classList.remove("pauseBlinking");
}

function jokesManager(data) {
    currentJoke = data.value;
    console.log(currentJoke);
}

window.onload = loadJSON(
    "https://api.chucknorris.io/jokes/random?category=music",
    function(data) { jokesManager(data); },
    function(xhr) { console.error(xhr); });