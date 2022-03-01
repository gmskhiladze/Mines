import { Render, Mine } from './main.js';

export default class Inputs {

    set userBalance(balance) {
        document.getElementById("balance").textContent = balance;
    }

    increaseBetAmount() {
        const amount = document.getElementById("user-bet-amount");
        const betBtns = document.querySelectorAll(".bet-btn");

        const increase = (e) => {
            document.getElementById("user-bet-amount").value = parseInt(amount.value) + parseInt(e.target.value);
        };

        betBtns.forEach(e => {
            e.addEventListener('click', increase);
        });
    }

    renderFiled() {

        const buttons = document.querySelectorAll(".f-size");

        const render = (e) => {
            return new Render(e.target.value);
        };

        buttons.forEach(e => {
            e.addEventListener('click', render);
        });
    }

    numOfMines() {

        const buttons = document.querySelectorAll(".mine-amount");

        const minesAmount = (e) => {
            return new Mine(e.target.value);
        };

        buttons.forEach(e => {
            e.addEventListener('click', minesAmount);
        });
    }

    clickHandler() {
        const buttons = document.querySelectorAll(".single-mine");

        const show = (e) => {
            e.target.className == "mine1 single-mine" ? e.target.innerHTML = `<i class="fas fa-coins"></i>` : e.target.innerHTML = `<i class="fas fa-bomb"></i>`;
        };

        buttons.forEach(e => {
            e.addEventListener('click', show);
        });
    }
}