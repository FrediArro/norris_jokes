let utterance = new SpeechSynthesisUtterance("Chuck Norris once got an A+ for eating his essay and calling his 7th Grade teacher a pussy");

function speak() {
    if (window.speechSynthesis.speaking) {
        console.log("resume");
        window.speechSynthesis.resume();
    }
    else {
        console.log("speak");
        window.speechSynthesis.speak(utterance);
    }
    console.log("window.speechSynthesis.speaking = " + window.speechSynthesis.speaking);
    console.log("window.speechSynthesis.paused = " + window.speechSynthesis.paused);
}

function pause() {
    console.log("pause");
    window.speechSynthesis.pause();
    console.log("window.speechSynthesis.speaking = " + window.speechSynthesis.speaking);
    console.log("window.speechSynthesis.paused = " + window.speechSynthesis.paused);
}

function stepForward() {

}

function stepBackward() {

}

function mute() {
    
}