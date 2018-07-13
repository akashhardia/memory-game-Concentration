/*
 * Create a list that holds all of your cards
 */
let moves           = 0,
    deck            = document.querySelector('.deck'),
    dialog          = document.getElementById("myDialog");
        
const cardList      = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb',
                       'fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb'],
      openList      = [],
      matchedList   = [];

document.querySelector('.restart').addEventListener('click',restart);

function restart(){
    // window.location.reload();
    deck.innerHTML = '';
    display();
    moves = 0;
    setScore();
}
 
function showDialog(){
    const str           = `<h1>Congratulations! You Won</h1>
                            with   ${moves} moves <br>
                            <button  class='play-again' onclick=closeDialog()>Play Again</button>`
    dialog.innerHTML = str;
    dialog.show();
}

function closeDialog(){
    restart();
    dialog.close();
}

let display = function(){
    const shuffledList  = shuffle(cardList);
    console.log(shuffledList);
    const deck          = document.querySelector('.deck');
    shuffledList.forEach(function(item){
        let newElement    = document.createElement('li'); 
        newElement.innerHTML = '<i class="'+item+'"></i>';
        newElement.classList.add('card');
        deck.appendChild(newElement);
    });
}

document.addEventListener('DOMContentLoaded',display);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let setScore = function(){
    document.querySelector('.moves').textContent = moves;
} 

let openCard = function(event){
    const target = event.target;
    if(target.nodeName === 'LI'){ 
        moves++;
        setScore();
        if(openList.length < 2){                // 0,1
            console.log(target);
            if(openList.length>0 && target.firstElementChild.className === openList[0].firstElementChild.className){
                    target.classList.add('show','open','match');
                    var item = openList.pop();
                    item.classList.add('match');
                    matchedList.push(item, target);
            }else{                              // when 0 and not same
                openList.push(target);
                target.classList.add('open','show');
            }
        }else{                                  // 2
            var item = openList.pop();
            item.classList.remove('open','show');
            var item = openList.pop();
            item.classList.remove('open','show');
            openList.push(target);
            target.classList.add('open','show');
        }
    }
    if(matchedList.length === 16){
        showDialog();
    }
}

deck.addEventListener('click',openCard);