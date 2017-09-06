    // https://github.com/diegocasmo/tic-tac-toe-minimax/blob/master/js/main.js

const prompt = require('prompt-sync')();
const _ = require('lodash');

var choice;

    function Game () {

        this.jogadas = [];
        this.jogadas[0] = [];
        this.jogadas[1] = [];
        this.jogadas[2] = [];
        this.jogadas[0][0] = '-';
        this.jogadas[0][1] = '-';
        this.jogadas[0][2] = '-';
        this.jogadas[1][0] = '-';
        this.jogadas[1][1] = '-';
        this.jogadas[1][2] = '-';
        this.jogadas[2][0] = '-';
        this.jogadas[2][1] = '-';
        this.jogadas[2][2] = '-';
        this.jogador = 'X';


        this.verificaJogada = function(linha, coluna) {
            if(linha >= 0 && linha < 3 && coluna >= 0 && coluna < 3){
                return this.jogadas[linha][coluna] === '-';
            }else {
                return false;
            }
        }

        this.hasWiner = function () {
            for(var y  in this.jogadas) {
                if(this.jogadas[y][0] === this.jogador && this.jogadas[y][1] === this.jogador && this.jogadas[y][2] === this.jogador) {
                    if(this.jogador === 'X') return 2
                    return 3;
                }
            }

            for(var x in this.jogadas) {
                if(this.jogadas[0][x] === this.jogador && this.jogadas[1][x] === this.jogador && this.jogadas[2][x] === this.jogador) {
                    if(this.jogador === 'X') return 2
                    return 3;
                }
            }

            if(this.jogadas[0][0] === this.jogador && this.jogadas[1][1] === this.jogador && this.jogadas[2][2] === this.jogador) {
                if(this.jogador === 'X') return 2
                return 3;
            }

            if(this.jogadas[2][0] === this.jogador && this.jogadas[1][1] === this.jogador && this.jogadas[0][2] === this.jogador) {
                if(this.jogador === 'X') return 2
                return 3;
            }

            var contagem = 0;
            for(var i in  this.jogadas) {
                for(var x in this.jogadas[i]){
                    if(this.jogadas[i][x] !== '-') contagem++;
                }
            }
            if (contagem === 9) return 1;

            return 0;
        }

        for(var i = 0; i < 9; i++){
            if(i % 2 === 0){
                var linha = prompt('Digite a linha: ');
                var coluna = prompt('Digite a coluna: ');
                this.jogador = 'X';
                if(this.verificaJogada(linha, coluna)){
                    this.jogadas[linha][coluna] = 'X';
                    if(this.hasWiner() === 2){
                        console.log('Fim de Jogo => Vencedor foi o Humano');
                        break;
                    }
                    if(this.hasWiner() === 1){
                        console.log('Fim de Jogo => EMPATE');
                        break;
                    }
                } else {
                    console.log('Jogada invalida');
                    i--;
                }
            } else {
                this.jogador = 'O';
                minimax(_.cloneDeep(this), 0);
                this.jogadas[choice[0]][choice[1]] = 'O';
                console.log(this.jogadas);
                if(this.hasWiner() === 3){
                    console.log('Fim de Jogo => Vencedor foi o Computador');
                    break;
                }
                if(this.hasWiner() === 1){
                    console.log('Fim de Jogo => EMPATE');
                    break;
                }
            }

            imprimeJogo(this);
        }

    }

    function score(game, depth) {
        var score = game.hasWiner();
        if (score === 1)
            return 0;
        else if (score === 2)
            return depth-10;
        else if (score === 3)
            return 10-depth;
    }

    function minimax(jogoTemporario, depth) {
        if (jogoTemporario.hasWiner())
            return score(jogoTemporario, depth);

        depth++;

        var scores = [];
        var moves = [];
        var availableMoves = jogadasDisponiveis(jogoTemporario.jogadas);
        var jogadaTemp, possible_game;

        for(var i=0; i < availableMoves.length; i++) {
        	jogadaTemp = availableMoves[i];
            possible_game = _.cloneDeep(jogoTemporario);
            possible_game.jogadas[jogadaTemp[0]][jogadaTemp[1]] = possible_game.jogador;
            console.log('Jogador: ' + possible_game.jogador)
            possible_game.jogador = possible_game.jogador === 'X' ? 'O' : 'X';
            console.log('Mudou a vez para: ' + possible_game.jogador)
            scores.push(minimax(possible_game, depth));
            moves.push(jogadaTemp);
        }

        var max_score, max_score_index, min_score, min_score_index;

        if (jogoTemporario.jogador === "O") {
            max_score = Math.max.apply(Math, scores);
            max_score_index = scores.indexOf(max_score);
            choice = moves[max_score_index];
            return scores[max_score_index];

        } else {
            min_score = Math.min.apply(Math, scores);
            min_score_index = scores.indexOf(min_score);
            choice = moves[min_score_index];
            return scores[min_score_index];
        }
    }

    function jogadasDisponiveis(jogadas) {
        var possibilidades = [];
        for (var i = 0; i < jogadas.length; i++) {
            for(var j = 0; j < jogadas[i].length ; j++) {
                if (jogadas[i][j] === '-') possibilidades.push([i,j]);
            }
        }
        return possibilidades;
    }

    function imprimeJogo(jogo) {
        let jogoString = '';
        for(var i in  jogo.jogadas) {
            jogoString += '|'
            for(var x in jogo.jogadas[i]){
                jogoString += jogo.jogadas[i][x]+ '|'
            }
            jogoString += '\n';
        }

        console.log(jogoString);

    }

    var x = new Game();
