
var secCounter = 0;
var toCount = 0;
var t;
var currdrinks = 0;
var selectedSound;

function incrementCounter(isHack){
	if(secCounter == 60){
		secCounter = 0;
		currdrinks = currdrinks + 1;
		document.getElementById("drinkbreakdown").innerHTML = currdrinks + ' of ' + toCount;
		document.getElementById("drinkbreakdownoz").innerHTML = currdrinks * 1.5 + ' of ' + toCount * 1.5 + ' fl. oz.';
		//document.getElementById("drinkbreakdownbeers").innerHTML = currdrinks / 8 + ' of ' + toCount / 8 + ' beers';
		selectedSound = getCheckedValue(document.forms['soundForm'].elements['audio']);
		
		EvalSound(selectedSound);	
	}
	secCounter = secCounter + 1;
	document.getElementById("countdown").innerHTML = secCounter;

	if(currdrinks < toCount){
		if(!isHack){
			t=setTimeout("incrementCounter()", 1000);
		}
	} else {
		document.getElementById("countdown").innerHTML = "Gratz!";
	}
}

function startParty(){
	toCount = document.getElementById("numdrink").value;
	selectedSound = getCheckedValue(document.forms['soundForm'].elements['audio']);

	if(toCount && selectedSound){
		document.getElementById("currdrink").innerHTML = 'Current Drink:';
		document.getElementById("drinkbreakdown").innerHTML = currdrinks + ' of ' + toCount;
		document.getElementById("drinkbreakdownoz").innerHTML = currdrinks * 1.5 + ' of ' + toCount * 1.5 + ' fl. oz.';
		//document.getElementById("drinkbreakdownbeers").innerHTML = currdrinks / 8 + ' of ' + toCount / 8 + ' beers';
		document.getElementById("startPartyButton").disabled = true;
		document.getElementById("stopPartyButton").disabled = false;
		incrementCounter();
	} else {
		alert("Please enter the number of drinks you are playing and select an alert sound.");
	}
}

function stopParty(){
	clearTimeout(t);
	document.getElementById("startPartyButton").disabled = false;
	document.getElementById("stopPartyButton").disabled = true;
	resetValues();
}

function resetValues(){
	secCounter=0;
	toCount=0;
	currdrinks=0;
	document.getElementById("currdrink").innerHTML = '';
	document.getElementById("drinkbreakdown").innerHTML = '';
	document.getElementById("drinkbreakdownoz").innerHTML = '';
	document.getElementById("drinkbreakdownbeers").innerHTML = '';
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

if (!$.browser.webkit && !$.browser.msie) {
	var browserStuff = document.getElementById("browserMessage");
	browserStuff.style.visibility = "visible";
}

alert("Drinking is a total blast and you're about to do a bit of it but please remember DO NOT DRINK AND DRIVE! \n\n Good luck. \n Kaplaaah!!");


