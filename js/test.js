var numOnly = /^[0-9]*$/;
var startDate = new Date();

function playAudioTag(tagId) {
    document.getElementById(tagId).play();
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function playSelectedAudio() {
    var selectedAudio = document.getElementById('soundInput').value;
    playAudioTag(selectedAudio);
}

function startGame() {
    if(validateTextInput()) {
        document.getElementById('formdisplay').style.display = 'none';
        document.getElementById('gamedisplay').style.display = 'block';
    }
}

function syncTimer() {
    var currDate = new Date()
    document.getElementById('countDownSec').innerHTML = Math.round((currDate-startDate)/1000)%60;
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