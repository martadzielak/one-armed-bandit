// WALLET

class Wallet {
    constructor(money) {
        let _money = money;
        this.getWalletValue = () => _money;
        this.checkCanPlay = value => {
            if (_money >= value) {
                return true
            } else {
                return false
            };
        }
        this.changeWallet = (value, type = "+") => {
            if (typeof value === "number" && !isNaN(value)) {
                if (type === "+") {
                    return _money += value;
                } else if (type === "-") {
                    return _money -= value;
                } else {
                    throw new Error("invalid equation")
                }
            } else {
                console.log(typeof value);
                throw new Error("invalid number")
            }
        }

    }
}

// STATISTICS

class Statistics {
    constructor() {
        this.gameResults = [];
    }
    addGameToStats(win, bid) {
        let gameResult = {
            win: win,
            bid: bid
        }
        this.gameResults.push(gameResult)
    }
    showGameStats() {
        let games = this.gameResults.length;
        let wins = this.gameResults.filter(result => result.win).length;
        let losses = this.gameResults.filter(result => !result.win).length;
        return [games, wins, losses]
    }
}

// DRAW

class Draw {
    constructor() {
        this.options = ['cherry.jpg', 'plum.jpg', 'bell.jpg'];
        let _result = this.drawResult();
        this.getDrawResult = () => _result
    }

    drawResult() {
        let colors = [];
        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length)
            const color = this.options[index]
            colors.push(color)
        }
        return colors;
    }

}

// RESULT

class Result {
    static moneyWonInGame(result, bid) {
        if (result)
            return 3 * bid
        else
            return 0
    }
    static checkWin(draw) {
        if (draw[0] === draw[1] && draw[1] === draw[2] || draw[0] !== draw[1] && draw[1] !== draw[2] && draw[0] !== draw[2]) return true;
        else return false;
    }
}

// GAME

class Game {
    constructor(start) {

        this.stats = new Statistics()
        this.wallet = new Wallet(start)
        document.getElementById('start').addEventListener('click', this.startGame.bind(this))
        this.spanWallet = document.querySelector('.panel span.wallet')
        this.boards = document.querySelectorAll('div.color')
        this.inputBid = document.getElementById('bid')
        this.spanResult = document.querySelector(".score span.result")
        this.spanGames = document.querySelector(".score span.number")
        this.spanWins = document.querySelector(".score span.win")
        this.spanLosses = document.querySelector(".score span.loss")
        this.render()

    }
    render(colors = ['bell.jpg', 'bell.jpg', 'bell.jpg'], money = this.wallet.getWalletValue(), result, stats = [0, 0, 0], bid = 0, wonMoney = 0) {
        this.spanResult.textContent = "";
        this.spanWallet.textContent = money;
        if (result) {
            result = `You won ${wonMoney}`;
        } else if (!result && result !=
            "") {
            result = `You lost ${bid}`
        }
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
        this.boards.forEach((board, index) => {
            board.style.backgroundImage = `url(${colors[index]})`
        });
        this.inputBid.value = "";

    }
    startGame() {
        if (this.inputBid.value < 1) return alert("Type in a larger sum of money...");
        const bid = Math.floor(this.inputBid.value);
        if (!this.wallet.checkCanPlay(bid)) {
            return alert("Double check the amount! You lame duck")
        }
        this.wallet.changeWallet(bid, '-');
        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWin(colors);
        const wonMoney = Result.moneyWonInGame(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStats(win, bid);
        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStats(), bid, wonMoney)
    }
}

const game = new Game(100)

// TEST

Result.checkWin('cherry.jpg', 'plum.jpg', 'bell.jpg') = true;