var numOnly = /^[0-9]*$/;
var startDate = new Date();
var numDrinksGoal = 0;
var lastNumDrinksCompleted = 0;
var numBeersGoal = 0;
var numOzGoal = 0;
var shotSize = 2.5;
var silentMode = false;
var stopped = false;
var paused = false;
var pausedTimeMillis = 0;

$(".collapse").collapse();
$('.tabs').button();

function playAudioTag(tagId) {
    document.getElementById(tagId).play();
}

function playSelectedAudio() {
    var selectedAudio = document.getElementById('soundInput').value;
    if(selectedAudio == "cd") {
        $.jRecorder.stop();
    } else {
        playAudioTag(selectedAudio);
    }
}

function startGame() {
    if(validateTextInput()) {
        stopped = false;
        startDate = new Date();
        populateValues();
        hideElement('formdisplay');
        showElement('gamedisplay');
        syncTimer();
    }
}

function stopGame() {
    clearTimeout(t);    
    hideElement('gamedisplay');
    showElement('formdisplay');
    stopped = true;
    pausedTimeMillis = 0;
    lastNumDrinksCompleted = 0;
}

function populateValues() {
    numDrinksGoal = document.getElementById('numDrinksToPlay').value;   
    numBeersGoal = Math.floor((numDrinksGoal*shotSize)/12);
    numOzGoal = Math.floor(numDrinksGoal*shotSize);
    silentMode = document.getElementById('silentmodecheck').checked;
}

function syncTimer() {
    var currDate = new Date()

    if(!paused) {
        var milliDifference = currDate-startDate-pausedTimeMillis;
        if(determineCountDirection() == 'Down') {
            var countDownSetValue = 60 - Math.round(milliDifference/1000)%60;
        } else {
            var countDownSetValue = Math.round(milliDifference/1000)%60;
        }
        var numDrinksCompleted = Math.floor((milliDifference/1000)/60);
        document.getElementById('countDownSec').innerHTML = countDownSetValue;
        document.getElementById('numDrink').innerHTML = numDrinksCompleted + ' of ' + numDrinksGoal;
        document.getElementById('numBeers').innerHTML = Math.floor(numDrinksCompleted/2.5) + ' of ' + numBeersGoal + ' beers';
        document.getElementById('numOz').innerHTML = Math.floor(numDrinksCompleted*2.5) + ' of ' + numOzGoal + ' oz';

        if(numDrinksCompleted != lastNumDrinksCompleted) {
            if(!silentMode){
                playSelectedAudio();
            } else {
                displaySilentAlert();
            }
            lastNumDrinksCompleted = numDrinksCompleted;
        }

    } else {
        pausedTimeMillis = pausedTimeMillis + 1000;
    }

    if(!stopped && numDrinksGoal != numDrinksCompleted) {
        t = setTimeout("syncTimer()", 1000);
    }
}

function displaySilentAlert() {
    var alertElement = document.getElementById('silentAlert');
    alertElement.style.opacity = 1;
    showElement('silentAlert');
    fadeElement('silentAlert', 5, 200);
}

function togglePause() {
    if(paused) {
        document.getElementById('pausebutton').innerHTML = 'Smoke Break';
    } else {
        document.getElementById('pausebutton').innerHTML = 'Resume';
    }
    paused = !paused;
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

function debug() {
    startDate = startDate-1000;
}

function hideElement(el) {
    document.getElementById(el).style.display = 'none';
}

function showElement(el) {
    document.getElementById(el).style.display = 'block';
}

function setSelectedAudioValue(value) {
    document.getElementById('soundInput').value = value;
}

function fadeElement(el, ttime, interval) {
    var element = document.getElementById(el);
    element.style.opacity = element.style.opacity - 1/(ttime/(interval/1000));
    if (element.style.opacity == 0 || element.style.opacity < 0 || element.style.opacity < .2) {
        hideElement(el);
        document.getElementById(el).style.opacity = 1;
    } else {
        t = setTimeout(function(){fadeElement(el, ttime, interval)}, interval);
    }
}

function addLoadEvent(func) {
    if(typeof window.onload != 'function')
        window.onload = func;
    else {
        var oldLoad = window.onload;

        window.onload = function() {
        if(oldLoad) oldLoad();
            func();
        }
    }
}

addLoadEvent(function() {
    if($.browser.msie) {
        showElement('browserdisclaimer');
    }
});