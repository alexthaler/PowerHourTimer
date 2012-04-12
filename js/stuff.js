
var secCounter = 0;
var toCount = 0;
var t;
var currdrinks = 0;
var selectedSound;
var night = true;
var paused = false;

function incrementCounter(isHack) {

	if(secCounter == 60) {
		secCounter = 0;
		currdrinks = currdrinks + 1;
		document.getElementById("drinkbreakdown").innerHTML = currdrinks + ' of ' + toCount;
		document.getElementById("drinkbreakdownoz").innerHTML = currdrinks * 1.5 + ' of ' + toCount * 1.5 + ' fl. oz.';
		selectedSound = getCheckedValue(document.forms['soundForm'].elements['audio']);
		
		EvalSound(selectedSound);	
	}

    if(!paused) {
        secCounter = secCounter + 1;
        document.getElementById("countdown").innerHTML = secCounter;
    }

	if(currdrinks < toCount) {
        if(!isHack) {
            t = setTimeout("incrementCounter()", 1000);
        }
	} else {
		document.getElementById("countdown").innerHTML = "Gratz!";
	}

}

function startParty(){

    var playStopButton = document.getElementById("playStopButton");
    playStopButton.onclick = stopParty;
    playStopButton.setAttribute("class", "button delete");
    playStopButton.innerHTML = "Stop Party"

	toCount = document.getElementById("numdrink").value;
	selectedSound = getCheckedValue(document.forms['soundForm'].elements['audio']);
    document.getElementById("gamecontent").style.display = 'block'
    document.getElementById("pregamecontent").style.display = 'none'

	if(toCount && selectedSound){
		document.getElementById("currdrink").innerHTML = 'Current Drink:';
		document.getElementById("drinkbreakdown").innerHTML = currdrinks + ' of ' + toCount;
		document.getElementById("drinkbreakdownoz").innerHTML = currdrinks * 1.5 + ' of ' + toCount * 1.5 + ' fl. oz.';
		incrementCounter();
	} else {
		alert("Please enter the number of drinks you are playing and select an alert sound.");
	}
}

function stopParty(){

    var playStopButton = document.getElementById("playStopButton");
    playStopButton.onclick = startParty;
    playStopButton.setAttribute("class", "button play");
    playStopButton.innerHTML = "Start Party"

    document.getElementById("gamecontent").style.display = 'none'
    document.getElementById("pregamecontent").style.display = 'block'
	clearTimeout(t);
	resetValues();
}

function resetValues(){
	secCounter=0;
	toCount=0;
	currdrinks=0;
	document.getElementById("currdrink").innerHTML = '';
	document.getElementById("drinkbreakdown").innerHTML = '';
	document.getElementById("drinkbreakdownoz").innerHTML = '';
	document.getElementById("countdown").innerHTML = secCounter;
}

function EvalSound(soundobj) {
  	var thissound=document.getElementById(soundobj);
  	thissound.play();
}

function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function dayNight() {
    if(night) {
        night = false;
        document.getElementById('emaillink').style.color = 'black';
        document.body.className = 'day';
    } else {
        night = true;
        document.getElementById('emaillink').style.color = 'white';
        document.body.className = 'night';
    }
}

function togglePause() {
    if(!paused) {
        paused = !paused;
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.innerHTML = "Resume"
    } else {
        paused = !paused;
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.innerHTML = "Smoke Break"
    }
}

if ($.browser.webkit) {
	var browserStuff = document.getElementById("browserMessage");
	browserStuff.style.visibility = "visible";
}

alert("Drinking is a total blast and you're about to do a bit of it but please remember DO NOT DRINK AND DRIVE! \n\n Good luck. \n Kaplaaah!!");


