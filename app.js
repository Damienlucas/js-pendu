const sectionChoice = document.getElementsByTagName('section')[0];
const sectionForm = document.getElementsByTagName('section')[1];
const letterContainer = document.getElementById('letter-container');
let valeurLetterToTest;
var difficultChoice;
var randomWord = "bonjour";
var badLetter = [];
var letterEntered = [];



function open (){
    choiceGenerate();
    
}
open();

function choiceGenerate(){
    var playBtnFacileConstruct = document.createElement('button');
    playBtnFacileConstruct.id = "facile";
    sectionChoice.appendChild(playBtnFacileConstruct);
    var playBtnFacile = document.getElementById('facile');
    playBtnFacile.innerHTML = "test";

    if(playBtnFacile.addEventListener("click", function() {
        difficultChoice = playBtnFacile;
        generate();
        play(difficultChoice);
        randomDisplay();
    }));
}

function generate(){
    sectionChoice.style.display = "none";

    var formulaire = document.createElement('form');
    formulaire.id = "inputBox";
    sectionForm.appendChild(formulaire);

    var labelInstruct = document.createElement('label');
    labelInstruct.id = "label-instruct";
    formulaire.appendChild(labelInstruct);
    labelInstruct.innerHTML = "Veuillez sisir une lettre SVP";

    var letterToTestConstruct = document.createElement('input');
    letterToTestConstruct.setAttribute('required', 'true|false');
    letterToTestConstruct.setAttribute('type','text');
    letterToTestConstruct.setAttribute('maxlength','1');
    letterToTestConstruct.setAttribute('placeholder', 'Saisissez une lettre')
    letterToTestConstruct.id = "letter-to-test";
    formulaire.appendChild(letterToTestConstruct);
    //ou formulaire.innerHTML = '<input id="letter-to-test" maxlength="1" type="text" required></input>';

    var envoyerLetterToTestConstruct = document.createElement('button');
    envoyerLetterToTestConstruct.id = "envoyer-letter-to-test";
    formulaire.appendChild(envoyerLetterToTestConstruct);
    envoyerLetterToTestConstruct.innerHTML = "envoyer";
    
    var tabLetterEntered = document.createElement('div');
    tabLetterEntered.id = "tab-letter-entered";
    sectionForm.appendChild(tabLetterEntered);
}

function play (difficultChoice){
    let formEnv = document.getElementById('inputBox');
    let letterToTest = document.getElementById('letter-to-test');

    difficultChoice.style.display = "none";

    formEnv.addEventListener("submit", (e) => {
        e.preventDefault();
        var valeurLetterToTest = letterToTest.value;
        console.log(valeurLetterToTest);
        check(valeurLetterToTest);
        stock(valeurLetterToTest);
        // effacer la valeur saisie dans le champ input
        document.getElementById("letter-to-test").value = '';
    })
}

function randomDisplay(){

    var tabDisplay = [];
    for(i=0; i < randomWord.length; i++){
        let wordPiece = randomWord.substring(i,i+1);
        tabDisplay.push(wordPiece);
        console.log(tabDisplay);
        var letterDiv = document.createElement('div');
        letterDiv.className = "letter-div";
        letterContainer.appendChild(letterDiv);
        letterDiv.innerHTML = wordPiece;
        // letterDiv.style.visibility = "hidden";
    }

}

function check(lettre){
    if(randomWord.includes(lettre)){
        console.log("super");

    }
    else{
        console.log("pasbien");
    }

}

function stock(lettre){
    let tabLetterEntered = document.getElementById('tab-letter-entered');
    let letterToTest = document.getElementById('letter-to-test');

    if(letterEntered.includes(lettre)){
        console.log("deja saisi");
        letterToTest.setAttribute('placeholder', 'Désolé; lettre déjà saisie');
        
    }
     
    else{
        letterEntered.push(lettre);
        console.log(letterEntered);
        letterToTest.setAttribute('placeholder', 'Saisissez une lettre');
     
    for(let i=0; i < 1; i++){
        tabLetterEntered.innerHTML += " "+lettre+" ";
    }
    }
}