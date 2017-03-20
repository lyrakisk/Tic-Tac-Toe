var board = [];
hideBoard();
var playerSide = "";
var computerSide = "";
var turn = "X"; //Player X always starts first
var choice;
var playerScore = 0;
var computerScore = 0;

function hideBoard(){
  var elements = document.getElementsByClassName("row");
  for(var i=0; i<elements.length; i++){
    elements[i].style.display = 'none';
  }
  document.getElementById("score").style.display = 'none';
}

function showBoard(){
  var elements = document.getElementsByClassName("row");
  for(var i=0; i<elements.length; i++){
    elements[i].style.display = 'flex';
  }
  document.getElementById("score").style.display = 'block';
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("computer-score").innerHTML = computerScore;
}

function startGameFirstTime(){
  showBoard();
  initialize(); 
  if(turn==computerSide){
    computerMove();
  }
}

function startGame(){
  setTimeout(function(){hideResult();showBoard();initialize(); if(turn==computerSide){
    computerMove();
  }},1000);
}

function initialize(){
  board = ["","","","","","","","",""];
  for(var i=0; i<=8; i++){
    var id= "block-" + i.toString();
    document.getElementById(id).innerHTML = board[i];
  }
}

function setSide(side){
  playerSide = side;
  if(side=="X"){
    computerSide = "O";
  }
  else{
    computerSide = "X";
  }
}

function hideGreet(){
  document.getElementById("greet").style.display = "none";
}

function updateBoard(turn, position){
  if(board[position] == ""){
    board[position] = turn;
    var id= "block-" + position.toString();
    document.getElementById(id).innerHTML = board[position];
  }
}



function playerMove(position){
  if(turn==playerSide && !won(board) && board[position]==""){
    updateBoard(playerSide,position);
    turn = computerSide;
    if(won(board)){
      playerScore++;
      showResult("You won!");
      startGame();
      return;
    }
    else if(isTie(board)){
      showResult("It's a tie!");
      startGame();
      return;
    }
    if(!won(board)){
      computerMove();
    }
  }
}

function computerMove(){ 
  if(!won(board)){
    var currentScore = minimax(board,turn);
    updateBoard(computerSide,choice);
    turn = changeTurn(turn);
    if(won(board)){
      computerScore++;
      showResult("Computer won!");
      startGame();
      return;
    }
    else if(isTie(board)){
      showResult("It's a tie!");
      startGame();
      return;
    }
  }
}

function showResult(result){
  var elements = document.getElementsByClassName("row");
  for(var i=0; i<elements.length; i++){
    elements[i].className += " blur";
  }
  document.getElementById("end-of-game-text").innerHTML = result;
  document.getElementById("end-of-game").style.display = 'block';
}

function hideResult(){
  var elements = document.getElementsByClassName("row");
  for(var i=0; i<elements.length; i++){
    elements[i].classList.remove("blur");
    document.getElementById("end-of-game").style.display = 'none';
  }
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function score(board, turn){
  if(won(board) && turn == computerSide){
    return 10;
  }
  else if (won(board) && turn == playerSide){
    return -10;
  }
  else{
    return 0;
  }
}

function availableMoves(board){
  var availableMoves = [];
  for(var i=0; i<board.length; i++){
    if(board[i]==""){
      availableMoves.push(i);
    }
  }
  return availableMoves;
}

function minimax(board, turn){
  var scores = [];
  var moves = [];
  if(won(board) || isTie(board)){
    return score(board,turn);
  }
  var possibleMoves = availableMoves(board);
  
  //Populate the scores array, recursing as needed
  for(var i=0; i<possibleMoves.length; i++){
    var possibleGame = board.slice();
    possibleGame[possibleMoves[i]] = turn;
    scores.push(minimax(possibleGame,changeTurn(turn)));
    moves.push(possibleMoves[i]);
  }
   
  //Do the min or the max calculation
  if (turn == playerSide){
    var max_score_index = scores.indexOf(getMaxOfArray(scores));
    choice = moves[max_score_index];
    return scores[max_score_index];
  }
  else{
    var min_score_index = scores.indexOf(getMinOfArray(scores));
    choice = moves[min_score_index];
    return scores[min_score_index];
  }
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray){
  return Math.min.apply(null,numArray);
}

function changeTurn(turn){
  if(turn==playerSide){
    return computerSide;
  }
  else{
    return playerSide;
  }
}

function isTie(board){
  if(!won(board) && availableMoves(board)==0){
    return true;
  }
  else{
    return false;
  }
}

function won(board){
  if(board[0]==board[1] && board[0]==board[2] && board[0]!=""){
    return true;
  }
  if(board[3]==board[4] && board[3]==board[5] && board[3]!=""){
    return true;
  }
  if(board[6]==board[7] && board[6]==board[8] && board[6]!=""){
    return true;
  }
  if(board[0]==board[3] && board[0]==board[6] && board[0]!=""){
    return true;
  }
  if(board[1]==board[4] && board[1]==board[7] && board[1]!=""){
    return true;
  }
  if(board[2]==board[5] && board[2]==board[8] && board[2]!=""){
    return true;
  }
  if(board[0]==board[4] && board[0]==board[8] && board[0]!=""){
    return true;
  }
  if(board[2]==board[4] && board[2]==board[6] && board[2]!=""){
    return true;
  }
  return false;
}