const sectionChoice = document.getElementsByTagName('section')[0];
const sectionForm = document.getElementsByTagName('section')[1];
const potenceDiv = document.getElementById('div-potence');
const letterContainer = document.getElementById('letter-container');
const sectionLetterContainer = document.getElementById('section-letter-container');
const sectionDivPotence = document.getElementById('section-div-potence');
const sectionFin = document.getElementById('section-fin');
var valeurLetterToTest;
var difficultChoice;
var randomWord = "bonjour";
var badLetter = [];
var letterEntered = [];
var wrongLetter;



function open (){
    choiceGenerate();
    console.log("revoilou");
    
}
open();

function choiceGenerate(){
    console.log("oupas");
    
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
        var letterDiv = document.createElement('div');
        letterDiv.className = "letter-div";
        letterContainer.appendChild(letterDiv);
        letterDiv.innerHTML = wordPiece;
        letterDiv.style.visibility = "hidden";
    }
}

function check(lettre){

    if(randomWord.includes(lettre)){
        stock(lettre);
        findLetter(lettre);
    }
    else{
        stock(lettre); 
    }

}

function stock(lettre){
    let tabLetterEntered = document.getElementById('tab-letter-entered');
    let letterToTest = document.getElementById('letter-to-test');

    if(letterEntered.includes(lettre)){
        letterToTest.setAttribute('placeholder', 'Désolé; lettre déjà saisie');
        return;
    }
     
    else{
        letterEntered.push(lettre);
        letterToTest.setAttribute('placeholder', 'Saisissez une lettre');
     
        for(let i=0; i < 1; i++){
            tabLetterEntered.innerHTML += " "+lettre+" ";
        }
        if(randomWord.includes(lettre)){
    
            }
            else{
                wrongLetter++;
                change(wrongLetter);
            }
    }
}

function findLetter(lettre) {
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

    if(wrongLetter < 7){
        console.log("img"+wrongLetter);
        img.setAttribute('src', "./images/potence-"+wrongLetter+".png");
        console.log(img);
    }
    else if(wrongLetter == 7){
        sectionDivPotence.style.display = "none";
        sectionLetterContainer.style.display = "none";
        sectionFin.style.display = "block";
        let imgD = document.createElement('img');
        imgD.setAttribute('src', "./images/potence-"+wrongLetter+".png");
        imgD.setAttribute('alt','potence du jeu pendu');
        sectionFin.appendChild(imgD);
        
        var looseConstruct = document.createElement('p');
        looseConstruct.id = "p-loose";
        sectionFin.appendChild(looseConstruct);
        looseConstruct.innerHTML = "Désolé, vous avez perdu ! !";

        replay();
       
    }
}

function replay(){
    
    let replayBtnConstruct = document.createElement('button');
    replayBtnConstruct.id = "rejouer";
    sectionFin.appendChild(replayBtnConstruct);
    let replayBtn = document.getElementById('rejouer');
    replayBtn.innerHTML = "rejouer";

    if(replayBtn.addEventListener("click", function() {
        document.location.reload(true);
    }));

}