const visor = document.querySelector(".visor");
const botoes = document.querySelector(".botoes");

let primeiroNumero = null;
let segundoNumero = null;
let operacao = null;
let aguardandoSegundoNumero = false;
let resultadoMostrado = false;

/* Botoes */

botoes.addEventListener("click", function(evento) {
    const botao = evento.target;

    // Entrada dos numeros
    if (botao.dataset.numero !== undefined) {
        const digito = botao.dataset.numero;

        if (aguardandoSegundoNumero || resultadoMostrado) {
            visor.textContent = (digito === ".") ? "0." : digito;
            aguardandoSegundoNumero = false;
            resultadoMostrado = false;

        } else if (digito === ".") {
            if (!visor.textContent.includes(".")) {
                visor.textContent += ".";
            }

        } else if (visor.textContent === "0") {
            visor.textContent = digito;

        } else {
            visor.textContent += digito;
        }
    }

    // Limpar tudo (AC)
    if (botao.dataset.acao === "limpar") {
        visor.textContent = "0";
        primeiroNumero = null;
        segundoNumero = null;
        operacao = null;
        aguardandoSegundoNumero = false;
        resultadoMostrado = false;
    }

    // Apagar o ultimo caractere
    if (botao.dataset.acao === "apagar") {
        if (resultadoMostrado || visor.textContent === "Erro") {
            visor.textContent = "0";
            resultadoMostrado = false;
        } else if (!aguardandoSegundoNumero) {
            visor.textContent = visor.textContent.slice(0, -1);

            if (visor.textContent === "" || visor.textContent === "-") {
                visor.textContent = "0";
            }
        }
    }

    // Escolher a operacao
    if (botao.dataset.operacao !== undefined) {
        primeiroNumero = Number(visor.textContent);
        operacao = botao.dataset.operacao;
        aguardandoSegundoNumero = true;
        resultadoMostrado = false;
    }

    // Calcular resultado (quem calcula e o Spring Boot)
    if (botao.dataset.acao === "calcular") {
        if (operacao === null) {
            return;
        }

        segundoNumero = Number(visor.textContent);
        calcularNoServidor(operacao, primeiroNumero, segundoNumero);
        operacao = null
        resultadoMostrado = true;
    }
});


/* Teclado */

document.addEventListener("keydown", function(evento) {
    const tecla = evento.key;
    let botaoCorrespondente = null;

    if (tecla >= "0" && tecla <= "9") {
        botaoCorrespondente = document.querySelector(
            `[data-numero="${tecla}"]`
        );
    }

    if (tecla === "+" || tecla === "-" || tecla === "*" || tecla === "/") {
        const operacoes = {
            "+": "somar",
            "-": "subtrair",
            "*": "multiplicar",
            "/": "dividir"
        };

        botaoCorrespondente = document.querySelector(
            `[data-operacao="${operacoes[tecla]}"]`
        );
    }

    if (tecla === "Enter" || tecla === "=") {
        evento.preventDefault();
        botaoCorrespondente = document.querySelector(
            '[data-acao="calcular"]'
        );
    }

    if (tecla === "Backspace") {
        botaoCorrespondente = document.querySelector(
            '[data-acao="apagar"]'
        );
    }

    if (tecla === "Escape") {
        botaoCorrespondente = document.querySelector(
            '[data-acao="limpar"]'
        );
    }

    if (tecla === "," || tecla === ".") {
        botaoCorrespondente = document.querySelector(
            '[data-numero="."]'
        );
    }

    if (botaoCorrespondente) {
        botaoCorrespondente.click();
    }
});


/* Chamada ao back end (Spring Boot) */

async function calcularNoServidor(op, a, b) {
    try {
        const resp = await fetch(`/${op}?a=${a}&b=${b}`);
        const texto = await resp.text();

        if (texto.startsWith("Erro")) {
            visor.textContent = "Erro";
        } else {
            visor.textContent = String(Number(texto));
        }
    } catch (erro) {
        visor.textContent = "Erro";
    }
}