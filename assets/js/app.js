var qwertyEl = document.getElementById('qwerty');
var phraseEl = document.getElementById('phrase');
var startBtn = document.getElementById('overlay').lastElementChild;

var missed = 0;
var phrases = ['Rubberducking','Python', 'JavaScript', 'ASCII', 'Algorithm'];

startBtn.addEventListener('click', function(e){
    var parent = this.parentElement;
    if(parent.style.display != 'none'){
        parent.style.display = 'none';
    }
});


function checkWin(){

}

function checkLetter(){

}

function getRandomPhraseArray(arr){
    //do stuff to any arr that is passed in 
}

function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
}