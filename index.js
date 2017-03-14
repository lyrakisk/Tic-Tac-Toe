var board = [];
hideBoard();
var playerSide = "";
var computerSide = "";
var turn = "X"; //Player X always starts first

window.onload = function(){
}

function hideBoard(){
  var elements = document.getElementsByClassName("row");
  for(var i=0; i<elements.length; i++){
    elements[i].style.display = 'none';
  }
}

function showBoard(){
  var elements = document.getElementsByClassName("row");
  for(var i=0; i<elements.length; i++){
    elements[i].style.display = 'flex';
  }
}

function startGame(){
  showBoard();
  initialize();
  if(turn==computerSide){
    computerMove();
  }
}

function initialize(){
  board = ["","","","","","","","",""];
  for(var i=0; i<8; i++){
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

function updateBoard(move, position){
  if(board[position] == ""){
    board[position] = move;
    var id= "block-" + position.toString();
    document.getElementById(id).innerHTML = board[position];
  }
}

function playerMove(position){
  if(turn==playerSide && !won()){
    updateBoard(playerSide,position);
    turn = computerSide;
    if(!won()){
      computerMove();
    }
    }
}

function computerMove(){
  for(var i=0; i<8; i++){
    if(board[i]=="" && turn==computerSide && !won()){
      updateBoard(computerSide, i);
      turn = playerSide;
      break;
    }
  }
}

function won(){
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