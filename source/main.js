import Inputs from './input_handler.js';

class SingleMine {
    constructor(size) {
        this.size = size;
        const place = document.getElementById("renderPlace");
        place.innerHTML = "";

        for (let i = 0; i < this.size ** 2; i++) {
            this.render(i);
        }

    }

    render(x) {
        const place = document.getElementById("renderPlace");
        const div = document.createElement("div");
        this.size == 4 ? div.className = `mine1 single-mine` : div.className = `mine2 single-mine`;
        div.id = x;
        place.append(div);
    }

}

class Render {
    constructor(size) {
        this.size = size;
        parseInt(this.size) == 4 ? this.renderMines(16) : this.renderMines(25);
    }

    renderMines() {
        return new SingleMine(this.size);
    }

}

class Mine {
    constructor(num) {
        this.num = num;
        this.insertMines();
    }

    generateRandom(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    insertMines() {
        const mineplace = document.querySelectorAll(".single-mine");

        mineplace.forEach(e => {
            mineplace.length == 16 ? e.className = "mine1 single-mine" : e.className = "mine2 single-mine";
        });

        for (let i = 0; i < parseInt(this.num); i++) {
            mineplace.length == 16 ? mineplace.item(this.generateRandom(15)).className = "mine1 single-mine mines" : mineplace.item(this.generateRandom(15)).className = "mine2 single-mine mines";
        }
    }

}

class App {
    static init() {

        let balance, tempBalance, winamount;
        winamount = 5;

        balance = 4000;

        // Increase amount of bets
        const input = new Inputs();

        // set user balance
        input.userBalance = balance;

        // increase bet amount
        input.increaseBetAmount();

        input.renderFiled();

        input.numOfMines();

        // bet button
        const cashin = document.querySelector("#cashIn");

        cashin.addEventListener('click', () => {

            tempBalance = document.querySelector("#user-bet-amount").value;
            document.querySelector("#user-bet-amount").value = 1;
            const buttons = document.querySelectorAll(".btn");

            buttons.forEach(e => {
                e.disabled = true;
            });

            document.querySelector("#cashOut").disabled = false;

            input.clickHandler();
            input.userBalance = parseInt(balance) - parseInt(tempBalance);

            const loose = document.querySelectorAll(".mines");

            const losseGame = (e) => {
                document.querySelector("#user-bet-amount").value = 1;
                setTimeout(() => {
                    return new Render(4);
                }, 500);

                const buttons = document.querySelectorAll(".btn");

                buttons.forEach(e => {
                    e.disabled = false;
                });
            };

            loose.forEach(e => {
                e.addEventListener('click', losseGame);
            });

        });



        const win = document.querySelectorAll(".single-mine");

        const winGame = (e) => {
            parseInt(tempBalance) += parseInt(winamount);
        };

        win.forEach(e => {
            e.addEventListener('click', winGame);
        });

        const cashout = document.querySelector("#cashOut");

        cashout.addEventListener('click', () => {

            const buttons = document.querySelectorAll(".btn");

            buttons.forEach(e => {
                e.disabled = false;
            });

            document.querySelector("#cashIn").disabled = false;
            document.querySelector("#user-bet-amount").value = 1;


            let num = parseInt(balance) + parseInt(tempBalance);
            input.userBalance = parseInt(num);

            return new Render(4)
        });

    }
}

window.addEventListener('load', () => {
    return new Render(4);
});

App.init();

export { Render, Mine };