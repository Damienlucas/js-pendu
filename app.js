const sectionChoice = document.getElementsByTagName('section')[0];
const sectionForm = document.getElementsByTagName('section')[1];
const potenceDiv = document.getElementById('div-potence');
const letterContainer = document.getElementById('letter-container');
var valeurLetterToTest;
var difficultChoice;
var randomWord = "bonjour";
var badLetter = [];
var letterEntered = [];
var wrongLetter;



function open (){
    choiceGenerate();
    
}
open();

function choiceGenerate(){
    let playBtnFacileConstruct = document.createElement('button');
    playBtnFacileConstruct.id = "facile";
    sectionChoice.appendChild(playBtnFacileConstruct);
    let playBtnFacile = document.getElementById('facile');
    playBtnFacile.innerHTML = "test";

    if(playBtnFacile.addEventListener("click", function() {
        difficultChoice = playBtnFacile;
        wrongLetter = 0;
        generate();
        play(difficultChoice);
        randomDisplay();
    }));
}

function generate(){
    sectionChoice.style.display = "none";

    let formulaire = document.createElement('form');
    formulaire.id = "inputBox";
    sectionForm.appendChild(formulaire);

    let labelInstruct = document.createElement('label');
    labelInstruct.id = "label-instruct";
    formulaire.appendChild(labelInstruct);
    labelInstruct.innerHTML = "Veuillez saisir une lettre SVP";

    let letterToTestConstruct = document.createElement('input');
    letterToTestConstruct.setAttribute('required', 'true|false');
    letterToTestConstruct.setAttribute('type','text');
    letterToTestConstruct.setAttribute('maxlength','1');
    letterToTestConstruct.setAttribute('placeholder', 'Saisissez une lettre')
    letterToTestConstruct.id = "letter-to-test";
    formulaire.appendChild(letterToTestConstruct);
    //ou formulaire.innerHTML = '<input id="letter-to-test" maxlength="1" type="text" required></input>';

    let envoyerLetterToTestConstruct = document.createElement('button');
    envoyerLetterToTestConstruct.id = "envoyer-letter-to-test";
    formulaire.appendChild(envoyerLetterToTestConstruct);
    envoyerLetterToTestConstruct.innerHTML = "envoyer";
    
    let tabLetterEntered = document.createElement('div');
    tabLetterEntered.id = "tab-letter-entered";
    sectionForm.appendChild(tabLetterEntered);

    let potence = document.createElement('img');
    potence.setAttribute('src', './images/potence-0.png');
    potence.setAttribute('alt','potence du jeu pendu');
    potence.id = "potence";
    potenceDiv.appendChild(potence);
}

function play (difficultChoice){
    let formEnv = document.getElementById('inputBox');
    let letterToTest = document.getElementById('letter-to-test');

    console.log("play"+wrongLetter);

    difficultChoice.style.display = "none";

    formEnv.addEventListener("submit", (e) => {
        e.preventDefault();
        var valeurLetterToTest = letterToTest.value;
        check(valeurLetterToTest);
        
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
        letterDiv.style.visibility = "hidden";
    }
}

function check(lettre){

    if(randomWord.includes(lettre)){
        console.log("super");
        stock(lettre);
        goodLetter(lettre);
    }
    else{
        console.log("pasbien");
        stock(lettre); 
    }

}

function stock(lettre){
    let tabLetterEntered = document.getElementById('tab-letter-entered');
    let letterToTest = document.getElementById('letter-to-test');

    if(letterEntered.includes(lettre)){
        console.log("deja saisi");
        letterToTest.setAttribute('placeholder', 'Désolé; lettre déjà saisie');
        return;
    }
     
    else{
        letterEntered.push(lettre);
        console.log(letterEntered);
        letterToTest.setAttribute('placeholder', 'Saisissez une lettre');
     
        for(let i=0; i < 1; i++){
            tabLetterEntered.innerHTML += " "+lettre+" ";
        }
        if(randomWord.includes(lettre)){
    
            }
            else{
                wrongLetter++;
                console.log("avantenvoi"+wrongLetter);
                change(wrongLetter);
                console.log("envoi"+wrongLetter);
            }
    }
}

function goodLetter(lettre) {
    let letterDiv = document.getElementsByClassName('letter-div');
    
    for(i=0; i < randomWord.length; i++){
        
        if(randomWord[i] == lettre){
            letterDiv[i].style.visibility = "visible";  
        }  
    }
}

function change(wrongLetter) {
    console.log("resultat"+wrongLetter);
    let img = document.getElementById('potence');

    if(wrongLetter <= 7){
        console.log("img"+wrongLetter);
        img.setAttribute('src', "./images/potence-"+wongLetter+".png");
    }
    else{
        var looseConstruct = document.createElement('p');
        looseConstruct.id = "p-loose";
        formulaire.appendChild(looseConstruct);
        looseConstruct.innerHTML = "Désolé, vous avez perdu ! !";
    }
}