var numOnly = /^[0-9]*$/;
var startDate = new Date();
var numDrinksGoal = 0;
var lastNumDrinksCompleted = 0;

function playAudioTag(tagId) {
    document.getElementById(tagId).play();
}

function playSelectedAudio() {
    var selectedAudio = document.getElementById('soundInput').value;
    playAudioTag(selectedAudio);
}

function startGame() {
    if(validateTextInput()) {
        startDate = new Date();
        numDrinksGoal = document.getElementById('numDrinksToPlay').value;
        document.getElementById('formdisplay').style.display = 'none';
        document.getElementById('gamedisplay').style.display = 'block';
        syncTimer();
    }
}

function syncTimer() {
    var currDate = new Date()
    var milliDifference = currDate-startDate;
    var countDownSetValue = Math.round(milliDifference/1000)%60;
    var numDrinksCompleted = Math.floor((milliDifference/1000)/60);
    document.getElementById('countDownSec').innerHTML = countDownSetValue;
    document.getElementById('numDrink').innerHTML = numDrinksCompleted + ' of ' + numDrinksGoal;
    if(numDrinksCompleted != lastNumDrinksCompleted) {
        playSelectedAudio();
        lastNumDrinksCompleted = numDrinksCompleted;
    }
    t = setTimeout("syncTimer()", 1000);
}

function validateTextInput() {
    var text = document.getElementById('numDrinksToPlay').value;
    var numDrinkGroup = document.getElementById('numDrinkGroup');

    if(text.search(numOnly)==-1) {
        numDrinkGroup.className = 'control-group error';
        return false;
    } else {
        if(numDrinkGroup.className = 'control-group error') {
            numDrinkGroup.className = 'control-group success';
        }
    }
    return true;
}