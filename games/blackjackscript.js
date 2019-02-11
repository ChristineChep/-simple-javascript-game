  
     //Card variables
     let suits = ['Hearts', ' Clubs', 'Diamonds', 'Spades'],
     values = ['Ace','King' ,'Queen','Jack','Ten','Nine','Eight','Seven','Six','Five','Four','Three','Two'];
     
     //DOM variables
     let textArea = document.getElementById ("text-area"),
      newGameButton = document.getElementById ("new-game-button"),
      hitButton = document.getElementById ("hit-button"),
      stayButton = document.getElementById ("stay-button");

      //Game variables
     let gameStarted = false,
         gameOver = false,
         playerWon = false,
         dealerCards = [],
         playerCards = [],
         dealerScore = 0,
         playerScore = 0,
         deck =[];

     hitButton.style.display ='none';
     stayButton.style.display = 'none';
     showStatus();

     newGameButton.addEventListener('click',function(){
         gameStarted = true;
         gameOver = false;
         playerWon = false;

         deck = createDeck();
         shuffleDeck(deck);
         dealerCards = [ getNextCard(),getNextCard() ];
         playerCards = [ getNextCard(),getNextCard() ];


         newGameButton.style.display = 'none';
         hitButton.style.display = 'inline';
         stayButton.style.display = 'inline';
         showStatus();
     });

     hitButton.addEventListener('click',function(){
         playerCards.push(getNextCard());
         checkForEndOfGame();
         showStatus();
     });

     stayButton.addEventListener('click', function(){
         gameOver = true;
         checkForEndOfGame();
         showStatus();
     });
  
     function createDeck(){
         let deck = [];
      for ( let suitIdx = 0 ;suitIdx < suits.length; suitIdx++){
         for (valueIdx = 0 ;valueIdx < values.length; valueIdx++){
       let card = {
           suit:suits[suitIdx],
           value: values[valueIdx]
       };
       deck.push(card);
         }
     }
    
     return deck;
     }

     function getCardString(card){
         return card.value + 'of' +card.suit;
     }

     function shuffleDeck(deck){
         for (let i =0; i < deck.length ;i++){
             let swapIdx = Math.trunc ( Math.random() * deck.length);
             let tmp = deck[swapIdx];
             deck[swapIdx] = deck[i];
             deck[i] = tmp;
         }
     }
  
    
      function getNextCard(){
         return deck.shift();
     }

      function getCardNumericValue(card){ 
       switch (card.value){
           case 'Ace':
           return 1;
           //break;
           case 'Two':
           return 2;
           //break;
           case 'Three':
           return 3;
           //break;
           case 'Four':
           return 4;
           //break;
           case 'Five':
           return 5;
           //break;
           case 'Six':
           return 6;
           //break;
           case 'Seven':
           return 7;
           //break;
           case 'Eight':
           return 8;
           //break;
           case 'Nine':
           return 9;
           //break;
           default:
           return 10;
           //break;
                      }
                                        }


       function getScore(cardArray){
           let score = 0;
           let hasAce = false;
           for (let i = 0 ; i<cardArray.length ; i++){
               let card = cardArray[i];
               score += getCardNumericValue(card);
               if (card.value === 'Ace'){
                   haAce = true;
               }
           }
        
           //let hasAce = '';
           if (hasAce && score + 10 <= 21){

               return score + 10;
           }
           return score;
        }
       
 
      function updateScores(){
          dealerScore = getScore(dealerCards);
          playerScore = getScore(playerCards);
      }

     

     
        function checkForEndOfGame(){

            updateScores();

        if (gameOver){
            //let daler take card
            while (dealerScore < playerScore
             && playerScore <= 21
             && dealerScore <= 21){
                 dealerCards.push(getNextCard());
                 updateScores();
            } 
        }

        if (playerScore > 21){
          playerWon = false;
          gameOver = true;

        }

        else if (dealerScore > 21 ){
            playerWon = true;
            gameOver = true;
        }

        else if (gameOver){
            if (playerScore > dealerScore){
                playerWon = true;
            }
            else{
                playerWon = false;
            }
        }
        
    }
    
        function showStatus(){
            if (!gameStarted)  {
                textArea.innerText ="Welcome to Blackjack!";
                return ;
                               }
        
          let dealerCardString = '';
          for (let i=0; i < dealerCards.length; i++){
              dealerCardString += getCardString(dealerCards[i]) + '\n';
          }
  
          let playerCardString ='';
          for(let i = 0 ;i < playerCards.length ;i++){
            playerCardString += getCardString(playerCards[i]) + '\n';
          }
          
          updateScores();
  
          textArea.innerText = 'Dealer has:\n' +dealerCardString +
          '(score: '+dealerScore + ')\n\n' +
  
          'Player has:\n' +playerCardString +
          'score: ' +playerScore + ')\n\n';
  
          if(gameOver){
              if(playerWon){
                  textArea.innerText += "YOU WIN!";
              }
              else{
                  textArea.innerText += "DEALER WINS";
              }
              newGameButton.style.display = 'inline';
              hitButton.style.display = 'none';
              stayButton.style.display = 'none';
          }
        }

      //  updateScores();
        
        //textArea.innerText =
        //"Dealer has:\n" +
        //dealerCardString +
        //'(score: '+ dealerScore + ')\n\n' +

        //"player has :\n"+
        //playerCardString+
        //'(score: '+playerScore + ')\n\n';

        //if (gameOver){
          //  if (playerWon){
            //    textArea.innerText +="YOU WIN!";

           // }else{
             //   textArea.innerText+="DEALER WINS!";
            //}
            //newGameButton.style.display ='inline';
            //hitButton.style.display ='none';
            //stayButton.style.display ='none';
            

        //} 
      
     //let deck = createDeck();
      //for (i = 0;i<deck.length;i++){
        // textArea.innerText = " " +getCardString(deck[i]);
     //}
      
      //}