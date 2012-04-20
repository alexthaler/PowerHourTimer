var numOnly = /^[0-9]*$/;
var startDate = new Date();
var numDrinksGoal = 0;
var lastNumDrinksCompleted = 0;
var numBeersGoal = 0;
var numOzGoal = 0;
var shotSize = 2.5;

$(".collapse").collapse();
$('.tabs').button();

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
        populateValues();
        hideElement('formdisplay');
        showElement('gamedisplay');
        syncTimer();
    }
}

function populateValues() {
    numDrinksGoal = document.getElementById('numDrinksToPlay').value;   
    numBeersGoal = Math.floor((numDrinksGoal*shotSize)/12);
    numOzGoal = Math.floor(numDrinksGoal*shotSize);
}

function syncTimer() {
    var currDate = new Date()
    var milliDifference = currDate-startDate;
    var countDownSetValue = 60 - Math.round(milliDifference/1000)%60;
    var numDrinksCompleted = Math.floor((milliDifference/1000)/60);
    document.getElementById('countDownSec').innerHTML = countDownSetValue;
    document.getElementById('numDrink').innerHTML = numDrinksCompleted + ' of ' + numDrinksGoal;
    document.getElementById('numBeers').innerHTML = Math.floor(numDrinksCompleted/2.5) + ' of ' + numBeersGoal + ' beers';
    document.getElementById('numOz').innerHTML = Math.floor(numDrinksCompleted*2.5) + ' of ' + numOzGoal + ' oz';

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

function determineCountDirection() {
    if(document.getElementById('countdownbutton').className=='btn active') {
        return 'Down';
    } else {
        return 'Up';
    }
}

function hideElement(el) {
    document.getElementById(el).style.display = 'none';
}

function showElement(el) {
    document.getElementById(el).style.display = 'block';
}