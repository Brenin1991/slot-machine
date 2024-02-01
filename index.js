var credito = 50000;
let premio = 0;
var aposta = 20;
const creditoText = document.getElementById("credito");
const premioText = document.getElementById("premio");
const apostaText = document.getElementById("aposta");

function diminuirNumero(valorInicial, valorFinal, duracao) {
  const diff = valorInicial - valorFinal;
  const passo = diff / duracao;
  let valor = valorInicial;

  const diminuir = setInterval(() => {
    if (valor > valorFinal) {
      valor -= passo;
      console.log(valor); // Aqui você pode fazer o que quiser com o valor, como exibir na tela, etc.
    } else {
      clearInterval(diminuir);
      console.log("Animação concluída!");
    }
  }, 1); // Intervalo de 1 milissegundo
}

// Exemplo de uso: diminuir de 1000 para 500 em 3 segundos (3000 milissegundos)

const imageUrls = [
  "assets/escudos/01.png",
  "assets/escudos/02.png",
  "assets/escudos/03.png",
  "assets/escudos/04.png",
  "assets/escudos/05.png",
  "assets/escudos/06.png",
  "assets/escudos/07.png",
  "assets/escudos/08.png",
  "assets/escudos/09.png",
  "assets/escudos/010.png",
  "assets/escudos/011.png",
  "assets/escudos/012.png",
  "assets/escudos/013.png",
  "assets/escudos/014.png",
  "assets/escudos/015.png",
  "assets/escudos/016.png",
  "assets/escudos/017.png",
  "assets/escudos/018.png",
];

const slotElements = document.querySelectorAll(".slot img");
const rows = 3;
const cols = 6;

function spin() {
  slotElements.forEach((slot) => {
    animateSlot(slot);
  });

  setTimeout(() => {
    checkWin();
  }, 2000);
}

function animateSlot(slot) {
  let val = Math.random() * imageUrls.length;
  playSpinSound();
  let i = 0;
  const interval = setInterval(() => {
    slot.src = imageUrls[Math.floor(Math.random() * val)];
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
  }, 1500 + Math.floor(Math.random() * 500));
}

function updateUi() {
  creditoText.textContent = "Crédito: " + credito;
  premioText.textContent = "Prêmio: " + premio;
  apostaText.textContent = "Aposta: " + aposta;
}

function setAposta(valor) {
  aposta = valor;
  updateUi();
  playPaySound();
}

function checkWin() {
  let winningSlots = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 2; j++) {
      const slotIndex = i * cols + j;
      if (
        slotElements[slotIndex].src === slotElements[slotIndex + 1].src &&
        slotElements[slotIndex].src === slotElements[slotIndex + 2].src
      ) {
        const symbol = slotElements[slotIndex].src;
        let count = 3;

        while (
          slotIndex + count < (i + 1) * cols &&
          slotElements[slotIndex + count].src === symbol
        ) {
          count++;
        }

        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            winningSlots.push(slotIndex + k);
          }
        }
      }
    }
  }

  if (winningSlots.length > 0 && winningSlots.length <= 3) {
    highlightWinningSlots(winningSlots);
    playSuccessSound();
    premio = 2 * aposta;
    credito = credito + premio;
    playPaySound();
    updateUi();
  }

  if (winningSlots.length > 3) {
    highlightWinningSlots(winningSlots);
    playSuccessSound4x();
    premio = 10 * aposta;
    credito = credito + premio;
    playPaySound();
    updateUi();
  }
  if (winningSlots.length == 0) {
    // alert("Sem combinações vencedoras. Tente novamente!");
    playErrorSound();
    premio = 0;
    credito = credito - aposta;
    updateUi();
  }

  updateUi();
}

function playSuccessSound() {
  document.getElementById("soundSuccess").play();
}

function playSuccessSound4x() {
  document.getElementById("soundSuccess4x").play();
}

function playSpinSound() {
  document.getElementById("soundSpin").play();
}

function playPaySound() {
  document.getElementById("soundPay").play();
}

function playErrorSound() {
  document.getElementById("soundError").play();
}

function highlightWinningSlots(winningSlots) {
  winningSlots.forEach((slotIndex) => {
    slotElements[slotIndex].parentNode.style.backgroundColor = "green";
  });

  setTimeout(() => {
    winningSlots.forEach((slotIndex) => {
      slotElements[slotIndex].parentNode.style.backgroundColor = "white";
    });
  }, 2000);
}

// Adiciona a funcionalidade de pressionar a tecla "Space" para ativar o botão Spin
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
    spin();
  }
});

// Permite que o botão Spin seja pressionado ao clicar no espaço
document
  .getElementById("spinButton")
  .addEventListener("keypress", function (event) {
    if (event.code === "Space") {
      event.preventDefault();
      spin();
    }
  });
