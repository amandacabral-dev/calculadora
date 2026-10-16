
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

    if (
    botao.dataset.numero === "." &&
    visor.textContent.includes(".")
) {
    return;
}

    if (resultadoMostrado) {
        visor.textContent = botao.dataset.numero;
        resultadoMostrado = false;

    } else if (aguardandoSegundoNumero) {
        visor.textContent = botao.dataset.numero;
        aguardandoSegundoNumero = false;

    } else if (visor.textContent === "0") {
        visor.textContent = botao.dataset.numero;

    } else {
        visor.textContent += botao.dataset.numero;
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
        visor.textContent = visor.textContent.slice(0, -1);

        if (visor.textContent === "") {
            visor.textContent = "0";
        }
    }

    // Escolher a operacao
    if (botao.dataset.operacao === "somar") {
        primeiroNumero = Number(visor.textContent);
        operacao = "somar";
        aguardandoSegundoNumero = true;
    }

    if (botao.dataset.operacao === "subtrair") {
        primeiroNumero = Number(visor.textContent);
        operacao = "subtrair";
        aguardandoSegundoNumero = true;
    }

    if (botao.dataset.operacao === "multiplicar") {
        primeiroNumero = Number(visor.textContent);
        operacao = "multiplicar";
        aguardandoSegundoNumero = true;
    }

    if (botao.dataset.operacao === "dividir") {
        primeiroNumero = Number(visor.textContent);
        operacao = "dividir";
        aguardandoSegundoNumero = true;
    }

    // Calcular resultado
    if (botao.dataset.acao === "calcular") {
        segundoNumero = Number(visor.textContent);

        if (operacao === "somar") {
            visor.textContent = primeiroNumero + segundoNumero;
        }

        if (operacao === "subtrair") {
            visor.textContent = primeiroNumero - segundoNumero;
        }

        if (operacao === "multiplicar") {
            visor.textContent = primeiroNumero * segundoNumero;
        }

        if (operacao === "dividir") {
        if (segundoNumero === 0) {
        visor.textContent = "Erro";
    } else {
        visor.textContent = primeiroNumero / segundoNumero;
    }
}

        resultadoMostrado = true;
    }
});


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
