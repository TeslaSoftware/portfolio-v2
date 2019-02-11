var introText = [
    "Hi there!",
    "I'm Sebastian Tysler",
    "Full Stack Software Developer",
    "Scroll down to get to know me... "
]
let pauseBetweenLines = 2000;
let pauseBetweenCharacters = 50;
let cursorBlinkingSpeed = 600;
let textLineIndex =0;
let textLineCharacterIndex = 0;

$( document ).ready(function() {
    document.getElementById('typed-terminal').innerHTML = "&gt ";
    setTimeout(function(){
        typeOneLetterOfIntro(introText[textLineIndex]);
    }, 1200);

    setInterval(function(){
        $('#blinking-cursor').toggleClass('hidden')
    }, cursorBlinkingSpeed);

    $(".nav-menu").click(function(){
        $("#off-canvas-nav").toggleClass("open-menu");
    });
    




});


function typeOneLetterOfIntro(textLine){
    document.getElementById('typed-terminal').innerHTML += textLine[textLineCharacterIndex];
    
    textLineCharacterIndex++;
    //if you did not run out of characters for current line run this function again
    if(textLineCharacterIndex < textLine.length){
        setTimeout(function(){
            typeOneLetterOfIntro(textLine)
        }, pauseBetweenCharacters);
    }
    //if you run out of characters and there is more lines run this function starting from begining of next line
    else if(textLineIndex < introText.length-1 ){
        document.getElementById('typed-terminal').innerHTML += '<br>';
        document.getElementById('typed-terminal').innerHTML += "&gt ";
        textLineCharacterIndex = 0;
        textLineIndex++;        
        setTimeout(function(){
            typeOneLetterOfIntro(introText[textLineIndex])
        }, pauseBetweenLines);
    }

}