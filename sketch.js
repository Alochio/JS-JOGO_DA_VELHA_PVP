let tabuleiro= [
  ['','',''],
  ['','',''],
  ['','','']
];

let jogador1= -1;
let jogador2 = 1;

let vezJogador1 = true;

let casasDisponiveis = [];
let gameover = false;

function reiniciarJogo() {
  // Limpar o tabuleiro
  tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  descobrirCasasDisponiveis();

  vezJogador1 = true;

  gameover = false;

  let mensagem = select('p');
  if (mensagem) {
    mensagem.remove();
  }
}

function keyPressed() {
  if (keyCode === 13) {
    reiniciarJogo();
  }
}

function desenhaJogadas(){
  
  let w = width/3;
  let h = height/3;
  
  
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      
      let alvo = tabuleiro[j][i];
      
      let x= i*w+w/2;
      let y= j*h+h/2;
      let xraio = w/4;
      
      strokeWeight(4);
      
      if(alvo==jogador1){
        stroke(color('blue'));
        line(x-xraio,y-xraio, x+xraio,y+xraio);
        line(x+xraio,y-xraio, x-xraio,y+xraio);
        
      }else if(alvo==jogador2){
        stroke(color('green'));
        circle(x,y, xraio);
      }
      
    }
  }
  
  
}
    
function desenharTabuleiro(){
  let w = width/3;
  let h = height/3;
  
  strokeWeight(5);  
  stroke(0);
  
  line(w,0,w,height);
  line(2*w,0,2*w,height);
  line(0,h,width,h);
  line(0,2*h,width,2*h);
}

function descobrirCasasDisponiveis(){
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(tabuleiro[i][j]==''){
        casasDisponiveis.push([i,j]);
      }
    }
  }
}

function checarDisponibilidadeCasa(casaClicada){
  for(let i=0;i<casasDisponiveis.length;i++){
    if(casasDisponiveis[i][0] == casaClicada[0] &&
      casasDisponiveis[i][1] == casaClicada[1]){
      return i;
    }
  }
  return -1;
}


function checarVitoria(){
  
  let soma = 0;
  
  
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      soma+=tabuleiro[i][j];
    }
    
    if(soma==-3){
      return jogador1;
    }else if(soma==3){
      return jogador2;
    }
    
    soma=0;
  }
  
  
  for(let j=0;j<3;j++){
    for(let i=0;i<3;i++){
      soma+=tabuleiro[i][j];
    }
    if(soma==-3){
      return jogador1;
    }else if(soma==3){
      return jogador2;
    }
    
    soma=0;
  }
  
  soma+= tabuleiro[0][0];
  soma+= tabuleiro[1][1];
  soma+= tabuleiro[2][2];
  
  if(soma==-3){
      return jogador1;
    }else if(soma==3){
      return jogador2;
    }
    
  soma=0;
  
  soma+= tabuleiro[0][2];
  soma+= tabuleiro[1][1];
  soma+= tabuleiro[2][0];
  
  if(soma==-3){
      return jogador1;
  }else if(soma==3){
      return jogador2;
  }
  
  return null;
}


function setup() {
  createCanvas(1000, 1000);
  descobrirCasasDisponiveis();
}

function draw() {
  background(255);
  desenharTabuleiro();
  desenhaJogadas();
}

function mousePressed(){
  
  if(gameover){
    
  }else{
    

    let tamanhoCasa = width/3;

    let i = floor(mouseY/tamanhoCasa);
    let j = floor(mouseX/tamanhoCasa);


    let indiceCasa = checarDisponibilidadeCasa([i,j]);

    if(indiceCasa !=-1){
      let jogadorDaVez = vezJogador1 ? jogador1 : jogador2;

      tabuleiro[i][j] = jogadorDaVez;

      casasDisponiveis.splice(indiceCasa,1);
      vezJogador1 = !vezJogador1;

      let vencedor = checarVitoria();

      if(vencedor==null){
        if(casasDisponiveis.length==0){
          let p = createP('EMPATE <br> Precione ENTER para reiniciar');
          p.style('font-size','50px');
          p.position(width/2,height/2);
          gameover = true;
        }
      }else if(vencedor == jogador1){
          let p = createP('JOGADOR 1- GANHOU <br> Precione ENTER para reiniciar');
          p.style('font-size','50px');
          p.position(width/2,height/2);
          gameover = true;
      }else if(vencedor == jogador2){
        let p = createP('JOGADOR 2- GANHOU <br> Precione ENTER para reiniciar');
        p.style('font-size','50px');
        p.position(width/2,height/2);
        gameover = true;
      }

    }
  }
  
  
}