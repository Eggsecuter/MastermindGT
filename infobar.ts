class InfoBar{
    element: HTMLElement;
    title: HTMLElement;
    playercards: Array<Card>;

    constructor() {
        this.element = document.createElement("info");
        document.body.querySelector("game").appendChild(this.element);

        this.title = document.createElement("title");
        this.element.appendChild(this.title);

        this.playercards = [];
        for (let player of game.players) {
            this.playercards.push(new Card(this.element, player));
        }
    }

    render() {
        this.title.textContent = `Level ${game.levels.indexOf(game.currentLevel) + 1} | ${game.currentLevel.name}`;

        for (let card of this.playercards) {
            card.render();
        }
    }
}