// --------------------------------------------------bootstrap-----------------------------
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

// -------------------------------------------------jeu--------------------------------

const sectionChoice = document.getElementsByTagName('section')[0];
const sectionForm = document.getElementsByTagName('section')[1];
const boxLetterContainer = document.getElementById('box-letter-container');
const gallowsDiv = document.getElementById('div-gallows');
const sectionLetterContainer = document.getElementById('section-letter-container');
const letterContainerButton = document.getElementById('letter-container-button');
const sectionDivGallows = document.getElementById('section-div-gallows');
const sectionEnd = document.getElementById('section-end');
const divEnd = document.getElementById('div-end');
const playBtnAnimal = document.getElementById('play-animal');
const playBtnKaamelott = document.getElementById('play-kaamelott');
const playBtnAleatoire = document.getElementById('play-aleatoire');
const reset = document.getElementById('reset');
const winNumber = document.getElementById('win-number');
const playNumber = document.getElementById('play-number');
const looseNumber = document.getElementById('number-loose');
const leaveNumber = document.getElementById('number-leave');

var valeurLetterToTest;
var badLetter = [];
var letterEntered = [];
var wrongLetter;
var score = 0;
var scoreLoose = 0;
var start = 0;
var leave;
var wordBis = [];
var begin = false;
var param;
var randomWord;
var paramDivEndLoose;
var paramDivEndWin;

function open (){
    console.log("le nouveau score est de : "+score);
    leave = start-score-scoreLoose;
    winNumber.textContent = `${score}`;
    looseNumber.textContent = `${scoreLoose}`;
    leaveNumber.textContent = `${leave}`;
    playNumber.textContent = `${start}`;
    choiceGenerate(); 
}
open();

function deleted(){
    badLetter = [];
    letterEntered = [];
    wrongLetter = 0;
    wordBis = [];
    begin = false;

    let menuBtn = document.getElementById('menu');
    let formulaire = document.getElementById('inputBox');
    let gallows = document.getElementById('gallows');
    let tabLetterEntered = document.getElementById('tab-letter-entered');
    let letterContainer = document.getElementById('letter-container');
    let replayBtn = document.getElementById('replay');
    let looseP = document.getElementById('p-loose');
    let winP = document.getElementById('p-win');
    let imgD = document.getElementById('last-gallows');
    formulaire.remove();
    menuBtn.remove();
    tabLetterEntered.remove();
    letterContainer.remove();
    gallows.remove();

    if(paramDivEndLoose == true){
        paramDivEndLoose = false;
        looseP.remove();
        imgD.remove();
        replayBtn.remove();
    }
    if(paramDivEndWin == true){
        paramDivEndWin = false;
        winP.remove();
        replayBtn.remove();
    }
}

function choiceGenerate(){
    sectionChoice.style.display = "block";
    sectionDivGallows.style.display = "none";
    sectionLetterContainer.style.display = "none";
    sectionEnd.style.display = "none";
   
    wrongLetter = 0;

    playBtnAnimal.addEventListener("click", function() {
        if(begin == false){
            begin = true;
            generate();
            play();
            param = "animal";
            randomWordGenerate(param);
        }
    });

    playBtnKaamelott.addEventListener("click", function() {
        if(begin == false){
            begin = true;
            generate();
            play();
            param = "kaamelott";
            randomWordGenerate(param);
        }
    });

    playBtnAleatoire.addEventListener("click", function() {
        if(begin == false){
            begin = true;
            generate();
            play();
            param = "aleatoire";
            randomWordGenerate(param);
        }
    });
    reset.addEventListener("click", function() {
        document.location.reload(true);
    });
}

function randomWordGenerate(param){
    if(param == "animal"){
        let randomNumber = Math.floor(Math.random() *10);
        let wordAnimal = ["chien","baleine","castor","chimpanze","buffle","chevreuil","elephant","mouton","rhinoceros","taupe"];
        console.log(wordAnimal);
        randomWord = wordAnimal[randomNumber];
        console.log(randomWord);
        randomDisplay(randomWord);
    }
    if(param == "kaamelott"){
        let randomNumber = Math.floor(Math.random() *10);
        let wordKaamelott = ["boniche","galoche","tarlouze","poulette","revolte","graal","pucelle","equidistant","peremptoire","clodos"];
        console.log(wordKaamelott);
        randomWord = wordKaamelott[randomNumber];
        console.log(randomWord);
        randomDisplay(randomWord);
    }
    if(param == "aleatoire"){
        let randomNumber = Math.floor(Math.random() *2);
        let wordAleatoire = ["animal","kaamelott"];
        console.log(wordAleatoire);
        param = wordAleatoire[randomNumber];
        console.log("aleatoire"+param);
        randomWordGenerate(param);
    }
}

function generate(){
    sectionChoice.style.display = "none";
    sectionDivGallows.style.display = "block";
    sectionLetterContainer.style.display = "block";
    sectionEnd.style.display = "none";
   
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
    sendLetterToTestConstruct.className = "btn";
    formulaire.appendChild(sendLetterToTestConstruct);
    sendLetterToTestConstruct.innerHTML = "envoyer";
    
    let tabLetterEntered = document.createElement('div');
    tabLetterEntered.id = "tab-letter-entered";
    sectionForm.appendChild(tabLetterEntered);

    let gallows = document.createElement('img');
    gallows.setAttribute('src', './images/potence/potence-0.png');
    gallows.setAttribute('alt','potence du jeu pendu');
    gallows.id = "gallows";
    gallowsDiv.appendChild(gallows);

    let menuBtnConstruct = document.createElement('button');
    menuBtnConstruct.id = "menu";
    menuBtnConstruct.className = "btn";
    letterContainerButton.appendChild(menuBtnConstruct);
    let menuBtn = document.getElementById('menu');
    menuBtn.innerHTML = "Menu";
}

function play (){
    sectionChoice.style.display = "none";
    sectionDivGallows.style.display = "block";
    sectionLetterContainer.style.display = "block";
    sectionEnd.style.display = "none";
    let menuBtn = document.getElementById('menu');
    let formEnv = document.getElementById('inputBox');
    let letterToTest = document.getElementById('letter-to-test');

    start++;
    playNumber.textContent = `${start}`;

    menuBtn.addEventListener("click", function() {
        deleted();
        open();   
    });

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
    let letterContainer = document.createElement('div');
    letterContainer.id = "letter-container";
    boxLetterContainer.appendChild(letterContainer);

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
            winOrNot(wordBis);
        }  
    }
}

function winOrNot(wordBis){
    let wordBisString = wordBis.toString();
    let wordBisReplace = wordBisString.replace(/,/g,"");

    if(randomWord == wordBisReplace){
        score++;
        console.log("le score est de : "+score);
        winNumber.textContent = `${score}`;

        win();
    }
}

function change(wrongLetter) {
    let img = document.getElementById('gallows');

    if(wrongLetter < 7){
        img.setAttribute('src', "./images/potence/potence-"+wrongLetter+".png"); 
    }
    else if(wrongLetter == 7){
        sectionDivGallows.style.display = "none";
        sectionLetterContainer.style.display = "none";
        sectionEnd.style.display = "block";
        let imgD = document.createElement('img');
        imgD.setAttribute('src', "./images/potence/potence-"+wrongLetter+".png");
        imgD.setAttribute('alt','potence du jeu pendu');
        imgD.id = "last-gallows";
        divEnd.appendChild(imgD);
        
        let looseConstruct = document.createElement('p');
        looseConstruct.id = "p-loose";
        divEnd.appendChild(looseConstruct);
        let looseP = document.getElementById('p-loose');
        looseP.innerHTML = "Désolé, vous avez perdu ! !";
        paramDivEndLoose = true;
        scoreLoose++;
        looseNumber.textContent = `${scoreLoose}`;

        rePlay();
    }
}

function rePlay(){
    let replayBtnConstruct = document.createElement('button');
    replayBtnConstruct.id = "replay";
    replayBtnConstruct.className = "btn";
    divEnd.appendChild(replayBtnConstruct);
    let replayBtn = document.getElementById('replay');
    replayBtn.innerHTML = "rejouer";

    if(replayBtn.addEventListener("click", function() {
        deleted();
        open();
    }));
}

function win(){
    sectionDivGallows.style.display = "none";
    sectionLetterContainer.style.display = "none";
    sectionEnd.style.display = "block";

    let winConstruct = document.createElement('p');
    winConstruct.id = "p-win";
    divEnd.appendChild(winConstruct);
    let winP = document.getElementById('p-win');
    winP.innerHTML = "Bravo, vous avez gagné ! !";
    paramDivEndWin = true;

    fiesta();
    rePlay();
}


// --------------------explosion confettis-----------------
const containerSlot = document.querySelector('.slot');
const emojis = ["⭐", "🌟", "🌠", "🏆"];

function fiesta(){

    if(isTweening()) return;

    for(let i = 0; i < 200; i++){
        const confetti = document.createElement('div');
        confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        containerSlot.appendChild(confetti);
    }
    animateConfettis();
}
function animateConfettis(){
    const TLCONF = gsap.timeline();
    TLCONF
    .to('.slot div', { 
        y: "random(-300,300)",
        x: "random(-300,300)",
        z: "random(0,1000)",
        rotation: "random(-90,90)",
        duration: 2,
    })
    .to('.slot div', {autoAlpha: 0, duration: 0.4}, '-=0.2')
    .add(() => {
        containerSlot.innerHTML = "";
    })
}
function isTweening(){
    return gsap.isTweening('.slot div');
}
// ------------------fin animation confetti-----------------