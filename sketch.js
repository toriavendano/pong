//tamanho e localização da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//movimento da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//dimensões das raquetes
let larguraRaquete = 10;
let alturaRaquete = 90;

//localização da minha raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;
let chanceDeErrar = 0;

//localização da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//movimento da raquete do oponente
let velocidadeYRaqueteOponente;

//colisão usando a biblioteca
let colidiu = false;

//placar de pontos
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.wav");
  ponto = loadSound("ponto.wav");
  trilha = loadSound("trilha.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeBolinha();
  verificarBorda();
  mostrarRaquete(xMinhaRaquete, yMinhaRaquete);
  movimentaMinhaRaquete();
  //verificarColisaoRaquete();
  verificarColisaoBiblioteca(xMinhaRaquete, yMinhaRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponenteComputador();
  //movimentarRaqueteOponenteMultiplayer();
  verificarColisaoBiblioteca(xRaqueteOponente, yRaqueteOponente)
  incluirPlacar();
  marcarPonto()
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function velocidadeBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostrarRaquete(x, y){
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yMinhaRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yMinhaRaquete += 10;
  }
}

//função inutilizada porque estou usando o codigo da biblioteca
function verificarColisaoRaquete(){
  if (xBolinha - raio < xMinhaRaquete + larguraRaquete && 
      yBolinha - raio < yMinhaRaquete + alturaRaquete && 
      yBolinha + raio > yMinhaRaquete){
    velocidadeXBolinha *= -1
  }
}

function verificarColisaoBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

//ativar essa função para jogar com o computador
function movimentarRaqueteOponenteComputador(){
  velocidadeYRaqueteOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYRaqueteOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

//ativar essa função para jogar com outro player
function movimentarRaqueteOponenteMultiplayer(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
  
}