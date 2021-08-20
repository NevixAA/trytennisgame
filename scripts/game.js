
let can;
let canvasContext;
let ballX=50;//ball started size
let ballSpeedX=5;//moving speed
let ballY=50;
let ballSpeedY=4;//moving speed
let playerLeft=250;
const PADDLE_HEIGHT=100;
const PADDLE_THICKNESS=10;
let playetRight=250;

let playerLeftScore=0;
let playetRightScore=0;
const WINNING_SCORE=3;
let showingWinScreen=false;

// function to calcutate place of mouse and return real time pos
function calculateMousePos(evt){
    let rect=can.getBoundingClientRect();// control canvas 
    let root=document.documentElement;// contorilng html page
    let mouseX=evt.clientX-rect.left-root.scrollLeft;// calc x pos
    let mouseY=evt.clientY-rect.top-root.scrollTop;// calc y pos
    return{
        x:mouseX,
        y:mouseY
    };
}
function handleMouseClick(evt)
{
    if(showingWinScreen){
            playetRightScore=0;
            playerLeftScore=0;
            showingWinScreen=false;
        }
}
window.onload=function(){
    can=document.getElementById('gamecanvas');//canvas of game
    canvasContext=can.getContext('2d');
    let framesForSec=30;// how many frames for sec the ball should move
    setInterval(function(){
                moveSome();//moving the ball
                drawSome();// drawing elements
                },1000/framesForSec);
    
    can.addEventListener('mousedown',handleMouseClick);
                // event listener to know from where the mouse was moving
    can.addEventListener('mousemove',function(evt){
        let mousePos=calculateMousePos(evt);
        playerLeft=mousePos.y-(PADDLE_HEIGHT/2);// move player left to y pos of mouse scrolling

    })
}
//function to start ball if there was a score
function ballReset()
{
  if(playetRightScore>=WINNING_SCORE||playerLeftScore>=WINNING_SCORE)
    {
                showingWinScreen=true;
    }
    ballX=can.width/2;
    ballY=can.height/2;
}

function computerMov(){
    let playetRightCenter=playetRight+(PADDLE_HEIGHT/2);
    if(playetRightCenter<ballY-35){
        playetRight=playetRight+7;
    }else if(playetRightCenter>ballY+35){
        playetRight=playetRight-7;
    }
}
function moveSome(){
        computerMov();

         ballX=ballX+ballSpeedX;
         ballY=ballY+ballSpeedY;

        if(ballX>can.width)// right edge
             {
            if(ballY>playetRight&&
             ballY<playetRight+PADDLE_HEIGHT){
                ballSpeedX=-ballSpeedX;
                let deltaY=ballY-(playetRight+PADDLE_HEIGHT/2);
                        ballSpeedY=deltaY*0.35;
            }
            else
            {
                playerLeftScore++;
                ballReset();
            }}
        if(ballX<0)//left edge
                {
                    if(ballY>playerLeft&&
                     ballY<playerLeft+PADDLE_HEIGHT){
                        ballSpeedX=-ballSpeedX;
                        let deltaY=ballY-(playerLeft+PADDLE_HEIGHT/2);
                        ballSpeedY=deltaY*0.35;
                    }
                    else{
                        playetRightScore++;
                        ballReset();
                    }
                        }
        if(ballY>can.height)
                ballSpeedY=-ballSpeedY;
        if(ballY<0)
                ballSpeedY=-ballSpeedY;
        
}
function drawNet(){

    for(let i=0;i<can.height;i+=40)
        colorRect(can.width/2-1,i,2,20,'white');
}

function drawSome(){

    colorRect(0,0,can.width,can.height,'black');// canvas background

    if(showingWinScreen){
        canvasContext.fillStyle='white';
        if(playerLeftScore>=WINNING_SCORE)
        canvasContext.fillText("playerLeft Won",350,200,'white');
        else if(playetRightScore>=WINNING_SCORE)
                      canvasContext.fillText("playerRight Won",350,200);

        canvasContext.fillText("click to continue",350,500);
        return;
    }
    drawNet();
    colorRect(0,playerLeft,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');// left player element
    colorRect(can.width-PADDLE_THICKNESS,playetRight,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');// right player element
    drawCircle(ballX,ballY,5,'white');
    canvasContext.fillText(playerLeftScore,100,100);
    canvasContext.fillText(playetRightScore,can.width-100,100);

}

function drawCircle(centerX,centerY,radius,color)
{
    // line for ball drawing
    canvasContext.fillStyle=color;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}

function colorRect(leftX,topY,width,height,drawColor)
{
    canvasContext.fillStyle=drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}