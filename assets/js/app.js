/* ============================================
 * Project: Game Show App
 * Author: Chris Howell
 * Date: 5/25/2018
 * ============================================*/

 
// =========== Variables & Constants ===========

const overlay = $('#overlay');
const qwertyEl = $('#qwerty');
const phraseEl = $('#phrase');
const startBtn = $('.btn__reset');
const scoreboard = $('#scoreboard');

var missed = 0;
const maxGuess = 5;
const phrases = [
        'Explicit is better than implicit',
        'Simple is better than complex',
        'Object Orientated',
        'Unicode',
        'ASCII',
        'Rubberducking',
        'Algorithm',
        'Python', 
        'JavaScript',
        'Templating Engine',
        'Cascading Style Sheets',
    ];

var phraseArray = getRandomPhraseAsArray(phrases);



// =========== Event Listeners ===========

qwertyEl.on('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        e.target.className += " chosen";
        e.target.disabled = true;
        var letter = checkLetter(e.target);
        if (letter == null){ 
            missed += 1; 
            scoreboard.children(':first').children(':first').remove();
        }
        var showNum = $('.show');
        var hasWon = checkWin(showNum, phraseArray);
        
        if(missed < maxGuess && hasWon){
            endGame('win', 'You won!', 'Play again!');
        }else if(missed >= maxGuess && !hasWon){ endGame(); }

        
    }
});

startBtn.on('click', start);

// =========== Functions ===========

function start(){
    var parent = $(this).parent();
    if(parent.css('display') !== 'none'){
        startGame();
        parent.css('display', 'none');
        parent.removeClass().addClass('none');
    }
}

function checkWin(arr1, arr2){
    return arr1.length === countChars(arr2);
}


function countChars(arr){
    var count = 0;
    for(i=0; i < arr.length; i++){
        if(arr[i] !== ' '){
            count++;
        }
    }
    return count;
}

function resetHearts(){
    scoreboard.children(':first').remove();
    var ol = $('<ol></ol>');
    for(i=0; i < maxGuess; i++){
        var li = $('<li><img src="assets/images/liveHeart.png"/></li>');
        ol.append(li);
    }
    scoreboard.append(ol);
}

function checkLetter(btn){
    var letterEls = $('.letter');
    var letter = null;

    $.each(letterEls, (idx, val) => {
        if(btn.textContent.toLowerCase() === letterEls[idx].textContent.toLowerCase()){
            letterEls[idx].className += " show";
            if(letter === null){
                letter = letterEls[idx].textContent.toLowerCase();
            }
        }

    });
    return letter;
}

function getRandomPhraseAsArray(arr){
    let rand = Math.floor(Math.random() * arr.length);
    return Array.from(arr[rand]);
}

function addPhraseToDisplay(arr){
    //var ul = document.getElementById('phrase').firstElementChild;
    var ul = phraseEl.children(':first');
    // do stuff any arr that is passed in, and add to `#phrase ul`
    for(var i = 0; i < arr.length; i++){
        var li = $('<li></li>').text(arr[i]);

        if(arr[i] != ' '){ 
            li.addClass("letter"); 
        }else{
            li.addClass("space"); 
        }
        ul.append(li);
    }
}

function resetElementState(){
    var els = $('#qwerty > .keyrow > button');
    els.removeAttr('disabled').removeAttr('class')
}

function removeChildren(el){
    el.children().empty();
}

function startGame(){
    var ul = phraseEl.first();
    removeChildren(ul);
    resetElementState();
    resetHearts();
    missed = 0;
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

function endGame(state="lose", status="You lose!", btn="Try again?"){
    //var overlay = document.getElementById('overlay');
    var h1 = overlay.children(':first');
    startBtn.text(btn);

    overlay.removeClass().addClass(state);
    h1.text(status);
    overlay.css('display', 'flex');
}