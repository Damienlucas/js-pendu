const sectionChoice = document.getElementsByTagName('section')[0];
const sectionForm = document.getElementsByTagName('section')[1];
const gallowsDiv = document.getElementById('div-gallows');
const letterContainer = document.getElementById('letter-container');
const sectionLetterContainer = document.getElementById('section-letter-container');
const sectionDivGallows = document.getElementById('section-div-gallows');
const sectionEnd = document.getElementById('section-end');
var valeurLetterToTest;
var difficultChoice;
// var randomWord = "bonjour";
var badLetter = [];
var letterEntered = [];
var wrongLetter;
var score = 0;
var wordBis = [];

function open (){
    choiceGenerate(); 
}
open();

function choiceGenerate(){
    
    let playBtnEasyConstruct = document.createElement('button');
    playBtnEasyConstruct.id = "easy";
    sectionChoice.appendChild(playBtnEasyConstruct);
    let playBtnEasy = document.getElementById('easy');
    playBtnEasy.innerHTML = "test";

    if(playBtnEasy.addEventListener("click", function() {
        difficultChoice = playBtnEasy;
        wrongLetter = 0;
        generate();
        play(difficultChoice);
        // randomDisplay();
        randomwordGenerate()
    }));
}
function randomwordGenerate(){
    var randomNumber = Math.floor(Math.random() *5);
    console.log(randomNumber);
    let wordList = ["bonjour","coucou","neurastenique","prout","grenouille"];
    console.log(wordList);
    randomWord = wordList[randomNumber];
    console.log(randomWord);
    randomDisplay(randomWord);


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

    let sendLetterToTestConstruct = document.createElement('button');
    sendLetterToTestConstruct.id = "send-letter-to-test";
    formulaire.appendChild(sendLetterToTestConstruct);
    sendLetterToTestConstruct.innerHTML = "envoyer";
    
    let tabLetterEntered = document.createElement('div');
    tabLetterEntered.id = "tab-letter-entered";
    sectionForm.appendChild(tabLetterEntered);

    let gallows = document.createElement('img');
    gallows.setAttribute('src', './images/potence-0.png');
    gallows.setAttribute('alt','potence du jeu pendu');
    gallows.id = "gallows";
    gallowsDiv.appendChild(gallows);
}

function play (difficultChoice){
    let formEnv = document.getElementById('inputBox');
    let letterToTest = document.getElementById('letter-to-test');

    difficultChoice.style.display = "none";

    formEnv.addEventListener("submit", (e) => {
        e.preventDefault();
        var valeurLetterToTest = letterToTest.value;
        check(valeurLetterToTest);
        
        // effacer la valeur saisie dans le champ input
        document.getElementById("letter-to-test").value = '';
    })
}

function randomDisplay(randomWord){
    console.log("recu"+randomWord);

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

function check(letter){
    
    let onlyAccept = /^[A-Za-z]+$/;

    if(letter == "" || letter == " " || !letter.match(onlyAccept)){
        document.getElementById("letter-to-test").value = '';
        document.getElementById("letter-to-test").placeholder = "Ce n'est pas une lettre...";
        return;
    }
    else{
        compare(letter);
    }

}
function compare(letter){

    if(randomWord.includes(letter)){
        stock(letter);
        findLetter(letter);
    }
    else{
        stock(letter); 
    }
}

function stock(letter){
    let tabLetterEntered = document.getElementById('tab-letter-entered');
    let letterToTest = document.getElementById('letter-to-test');

    if(letterEntered.includes(letter)){
        letterToTest.setAttribute('placeholder', 'Désolé; lettre déjà saisie');
        return;
    }
     
    else{
        letterEntered.push(letter);
        letterToTest.setAttribute('placeholder', 'Saisissez une lettre');
     
        for(let i=0; i < 1; i++){
            tabLetterEntered.innerHTML += " "+letter+" ";
        }
        if(randomWord.includes(letter)){
    
            }
            else{
                wrongLetter++;
                change(wrongLetter);
            }
    }
}

function findLetter(letter) {
    let letterDiv = document.getElementsByClassName('letter-div');
    
    for(i=0; i < randomWord.length; i++){
        
        if(randomWord[i] == letter){
            letterDiv[i].style.visibility = "visible";  
            wordBis[i] = letter;
            console.log(wordBis);
            winOrNot(wordBis);
        }  
    }
}
function winOrNot(wordBis){
    console.log("envoi"+wordBis);
    let wordBisString = wordBis.toString();
    let wordBisReplace = wordBisString.replace(/,/g,"");
    console.log(wordBisReplace);

    if(randomWord == wordBisReplace){
        console.log("youhou");
        score++;
        console.log("le score est de : "+score);
        win();
    }
}

function change(wrongLetter) {
    
    let img = document.getElementById('gallows');

    if(wrongLetter < 7){
        img.setAttribute('src', "./images/potence-"+wrongLetter+".png");
       
    }
    else if(wrongLetter == 7){
        sectionDivGallows.style.display = "none";
        sectionLetterContainer.style.display = "none";
        sectionEnd.style.display = "block";
        let imgD = document.createElement('img');
        imgD.setAttribute('src', "./images/potence-"+wrongLetter+".png");
        imgD.setAttribute('alt','potence du jeu pendu');
        sectionEnd.appendChild(imgD);
        
        let looseConstruct = document.createElement('p');
        looseConstruct.id = "p-loose";
        sectionEnd.appendChild(looseConstruct);
        let looseP = document.getElementById('p-loose');
        looseP.innerHTML = "Désolé, vous avez perdu ! !";

        rePlay();
       
    }
}

function rePlay(){

    let replayBtnConstruct = document.createElement('button');
    replayBtnConstruct.id = "replay";
    sectionEnd.appendChild(replayBtnConstruct);
    let replayBtn = document.getElementById('replay');
    replayBtn.innerHTML = "rejouer";

    if(replayBtn.addEventListener("click", function() {
        document.location.reload(true);
    }));

}
function win(){
    sectionDivGallows.style.display = "none";
    sectionLetterContainer.style.display = "none";
    sectionEnd.style.display = "block";

    let winConstruct = document.createElement('p');
    winConstruct.id = "p-win";
    sectionEnd.appendChild(winConstruct);
    let winP = document.getElementById('p-win');
    winP.innerHTML = "Bravo, vous avez gagné ! !";

    rePlay();
}