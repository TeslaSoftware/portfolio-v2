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

$( document ).ready(function() {
    document.getElementById('typed-terminal').innerHTML = "&gt ";
    setTimeout(function(){
        typeOneLetterOfIntro(introText[textLineIndex]);
    }, 1200);

    //setInterval(function(){         $('#blinking-cursor').toggleClass('hidden')    }, cursorBlinkingSpeed);

    $(".nav-menu").click(function(){
        $("#off-canvas-nav").toggleClass("open-menu");
    });

    addNavItemsListener();
    if(!CSS.supports('scroll-behavior','smooth')){
        console.log("Native CSS scroll behaviour not supported by this browser.");
        addScrollListener();
    }
    else{
        console.log("Native CSS scroll behaviour is supported by this browser.");
    }
    

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

function addScrollListener(){
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault()
      
        var distanceFromTop = $($(this).attr('href')).offset().top;
        distanceFromTop = distanceFromTop  < 500?  500 : Math.floor(distanceFromTop/2) ;
        $('html, body').animate(
          {
            scrollTop: $($(this).attr('href')).offset().top,
          },
          distanceFromTop,
          'linear'
        )
      });
}