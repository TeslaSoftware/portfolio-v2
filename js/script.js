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
let indexOfSection = 0;

//References to elements for handling modal images (using vanilla JS)
var modalDiv;
var projectImages;
var modalImage;
var modalImageCaption;


if(isIE()){
    console.log("Internet Explorer detected. Loaded IE specific stylesheet.");
}
else{
    console.log("No IE detected. Removed IE specific stylesheet.");
    removeCSSforIE();
}


$( document ).ready(function() {
    initRefVars();
    document.getElementById('typed-terminal').innerHTML = "&gt ";
    setTimeout(function(){
        typeOneLetterOfIntro(introText[textLineIndex]);
    }, 1200);

    $(".nav-menu").click(function(){
        $("#off-canvas-nav").toggleClass("open-menu");
    });
    
    addNavItemsListener();
    addProjectImageClickListeners();

    //IE does not support smooth scrolling
    if(isIE() || !CSS.supports('scroll-behavior','smooth')){
        console.log("Native CSS scroll behaviour not supported by this browser.");
        addSmoothScrollListener();
    }
    else{
        console.log("Native CSS scroll behaviour is supported by this browser.");
    }
    

});

//Initializes reference variables
function initRefVars(){
    modalDiv = document.getElementById('modal-div');
    projectImages = document.getElementsByClassName('project-image');
    modalImage = document.getElementById('modal-image');
    modalImageCaption = document.getElementById('modal-image-caption');
}


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

function addNavItemsListener(){
    //to get to given element there are only two way: by scolling or clicking the link.
    //However if you click nav button it will scroll to this section, so we can consider only scrolling
    //bind position of user's scroll
    $(window).scroll(function(){
        let oldindexOfSection = indexOfSection;
        let scrollPositionY = $(window).scrollTop();
        let offsetOfNavBar = $('header').outerHeight();
        let lastSection = $('.section-nav-scroll').last();
        $('.section-nav-scroll').each(function(idx){            
            let positionToActivateLastSection =  scrollPositionY + $(window).outerHeight() + lastSection.outerHeight();
            if(scrollPositionY > $(this).position().top - offsetOfNavBar - 200){
                indexOfSection =idx;                
            }
            //consider last section as special case because section never reaches the top of the window (height is too small)
            else if(lastSection.position().top < positionToActivateLastSection){
                indexOfSection = $('#top-nav ul').children().length-1;
            }
        });
        if(Math.abs(oldindexOfSection - indexOfSection) >= 1){
            $('.top-nav-active').removeClass('top-nav-active');
            $('#top-nav li a').eq(indexOfSection).addClass('top-nav-active');            
        }
        

    });

}

function addSmoothScrollListener(){
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();        
        var distanceToTravel = Math.abs($($(this).attr('href')).offset().top - $('.top-nav-active').offset().top);
        let timeToScroll = distanceToTravel  < 500?  500 : Math.floor(distanceToTravel/200)*75 ;
        let positionY = $($(this).attr('href')).offset().top-100;
        positionY = positionY <200 ? 0 : positionY; 
        $('html, body').animate(
          {
            scrollTop: positionY,
          },
          timeToScroll,
          'linear'
        );
      });
}

function addProjectImageClickListeners(){
    //click listeners to open modal image
    for(let i=0; i < projectImages.length; i++){
        //attach click listener to each image
        projectImages[i].onclick = function(){
            modalDiv.style.display = "block";
            modalImage.src = this.src;
            modalImageCaption.innerHTML = this.alt;
        }
    }
    //click listener to close modal image
    document.getElementById('modal-close-button').onclick = function(){
        modalDiv.style.display = "none";       
    }
}

/*Detect if browser used by user is IE*/
function isIE() {
    let ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}

function removeCSSforIE(){
    try{
        document.querySelector('link[href$="styleIE.css"]').remove();
        console.log("IE specific CSS Style Sheets removed successfully.");
    }
    catch(err){
        console.log("ERROR!. Cound not remove IE specific CSS Style Sheets. Error: " + err.message);
    }
}