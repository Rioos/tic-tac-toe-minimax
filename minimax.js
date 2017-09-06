    // https://github.com/diegocasmo/tic-tac-toe-minimax/blob/master/js/main.js

const prompt = require('prompt-sync')();
const _ = require('lodash');

var iteracoesComputador = 0;
var totalIteracoes = 0;
var jogadasComputador = 0;
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

        //Este método deve verificar se a jogada feita pelo jogador é valida
        this.verificaJogada = function(linha, coluna) {
            //Verifica se é uma posição dentro do Array (0-2 para linha e 0-2 para coluna)
            if(linha >= 0 && linha < 3 && coluna >= 0 && coluna < 3){
                //Verifica se a posição está disponível
                return this.jogadas[linha][coluna] === '-';
            }else {
                return false;
            }
        }

        /*
            Retorna 0 para 'JOGO NAO FINALIZADO'
            Retorna 1 para 'EMPATE'
            Retorna 2 para 'VITORIA HUMANO (X)'
            Retorna 3 para 'VITORIA COMPUTADOR (O)'
        */
        this.hasWiner = function () {
            //Percorre as linhas para ver se temos um vencedor
            for(var y  in this.jogadas) {
                //Verifica se o 'X' foi o vencedor
                if(this.jogadas[y][0] === 'X' && this.jogadas[y][1] === 'X' && this.jogadas[y][2] === 'X') {
                    return 2;
                }
                //Verifica se o 'O' foi o vencedor
                if(this.jogadas[y][0] === 'O' && this.jogadas[y][1] === 'O' && this.jogadas[y][2] === 'O') {
                    return 3;
                }
            }

            //Percorre as colunas para ver se temos um vencedor
            for(var x in this.jogadas) {
                //Verifica se o 'X' foi o vencedor
                if(this.jogadas[0][x] === 'X' && this.jogadas[1][x] === 'X' && this.jogadas[2][x] === 'X') {
                    return 2;
                }
                //Verifica se o 'O' foi o vencedor
                if(this.jogadas[0][x] === 'O' && this.jogadas[1][x] === 'O' && this.jogadas[2][x] === 'O') {
                    return 3;
                }
            }

            //Verifica se o 'X' ganhou na diagonal começando em 0-0
            if(this.jogadas[0][0] === 'X' && this.jogadas[1][1] === 'X' && this.jogadas[2][2] === 'X') {
                return 2;
            }

            //Verifica se o 'O' ganhou na diagonal começando em 0-0
            if(this.jogadas[0][0] === 'O' && this.jogadas[1][1] === 'O' && this.jogadas[2][2] === 'O') {
                return 3;
            }

            //Verifica se o 'X' ganhou na diagonal começando em 2-0
            if(this.jogadas[2][0] === 'X' && this.jogadas[1][1] === 'X' && this.jogadas[0][2] === 'X') {
                return 2;
            }

            //Verifica se o 'O' ganhou na diagonal começando em 2-0
            if(this.jogadas[2][0] === 'O' && this.jogadas[1][1] === 'O' && this.jogadas[0][2] === 'O') {
                return 3;
            }


            //Verifica se houve um empate
            var contagem = 0;
            for(var i in  this.jogadas) {
                for(var x in this.jogadas[i]){
                    if(this.jogadas[i][x] !== '-') contagem++;
                }
            }
            if (contagem === 9) return 1;

            //Terminou sem encontrar resultados e retorna que o jogo não está finalizado
            return 0;
        }

        //Inicia a partida
        this.iniciarPartida = function () {
            //Itera sobre as jogadas
            for(var i = 0; i < 9; i++){
                //Caso seja uma jogada 'PAR' o Jogador Humano joga se não é a vez do Jogador Computador
                if(i % 2 === 0){
                    console.log("Sua Vez!")
                    //Recebe linha e coluna via prompt
                    var linha = prompt('Digite a linha: ');
                    var coluna = prompt('Digite a coluna: ');
                    this.jogador = 'X';
                    if(this.verificaJogada(linha, coluna)){
                        this.jogadas[linha][coluna] = 'X';
                        //Verifica se o jogador humano ganhou
                        if(this.hasWiner() === 2){
                            console.log('Fim de Jogo => Vencedor foi o Humano');
                            break;
                        }
                        //Verifica se houve empate
                        if(this.hasWiner() === 1){
                            console.log('Fim de Jogo => EMPATE');
                            break;
                        }
                    } else {
                        console.log('Jogada invalida');
                        i--;
                    }
                } else {
                    console.log("Vez do Computador!")
                    this.jogador = 'O';
                    //Inicia o minimax para buscar a jogada ideal
                    minimax(_.cloneDeep(this), 0);
                    console.log("Após "+iteracoesComputador+" interações o computador determinou uma jogada!")
                    //Realiza a jogada escolhida
                    this.jogadas[choice[0]][choice[1]] = 'O';
                    //Modifica controles de numero de iterações
                    totalIteracoes += iteracoesComputador;
                    jogadasComputador++;
                    iteracoesComputador = 0;
                    //Verifica se computador ganhou
                    if(this.hasWiner() === 3){
                        console.log('Fim de Jogo => Vencedor foi o Computador');
                        break;
                    }
                    //Verifica se houve empate
                    if(this.hasWiner() === 1){
                        console.log('Fim de Jogo => EMPATE');
                        break;
                    }
                }
                //Imprime jogo
                imprimeJogo(this);
            }
            //Imprime jogo final
            imprimeJogo(this);
            console.log('O computador teve em média ' + totalIteracoes / jogadasComputador + ' iterações');
        }

    }

    //Determina a 'qualidade' da jogada
    function score(game, depth) {
        var score = game.hasWiner();
        if (score === 1){
            return 0;
        }
        else if (score === 2){
            return depth-10;

        }
        else if (score === 3){
            return 10-depth;

        }
    }

    //Metodo de minimax (é recursivo)
    function minimax(jogoTemporario, depth) {
        //Caso o jogo tenha acabado, verifica o Score do jogo atual
        if (jogoTemporario.hasWiner() !== 0)
            return score(jogoTemporario, depth);

        iteracoesComputador++;
        depth++;

        var scores = [];
        var moves = [];
        //Armazena todas jogadas disponíveis
        var availableMoves = jogadasDisponiveis(jogoTemporario.jogadas);
        var jogadaTemp, possible_game;

        //Itera sobre todas jogadas possíveis e começa a formar uma arvore de jogadas
        for(var i=0; i < availableMoves.length; i++) {
        	jogadaTemp = availableMoves[i];
            //Cria um segundo jogoTemporario para efetuar a jogada e executar o próximo minimax
            possible_game = _.cloneDeep(jogoTemporario);
            possible_game.jogadas[jogadaTemp[0]][jogadaTemp[1]] = possible_game.jogador;
            possible_game.jogador = possible_game.jogador === 'X' ? 'O' : 'X';
            //Coloca no Array de Scores, a jogada feita (só vai para o array se terminar a recursão);
            scores.push(minimax(possible_game, depth));
            //Coloca no Array a jogada
            moves.push(jogadaTemp);
        }

        var max_score, max_score_index, min_score, min_score_index;

        /*
            Aplica a regra do min ou max caso jogador havia sido 'O'
            (devido a linha 201, ele troca o jogador que fez a jogada)
            resultando com que ele chegue trocado nesta etapa, é um pequeno bug
            mas como não ocasiona erros e eu não estava muito afim de procurar
            uma resposta deixei assim
        */
        if (possible_game.jogador === "X") {
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

    //Mapeia as jogadas disponíveis
    function jogadasDisponiveis(jogadas) {
        var possibilidades = [];
        for (var i = 0; i < jogadas.length; i++) {
            for(var j = 0; j < jogadas[i].length ; j++) {
                if (jogadas[i][j] === '-') possibilidades.push([i,j]);
            }
        }
        return possibilidades;
    }

    //Printa o jogo no console
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
    x.iniciarPartida();
