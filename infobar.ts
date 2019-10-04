class InfoBar{
    element: HTMLElement;

    constructor() {
        this.element = document.createElement("info");
        document.body.querySelector("game").appendChild(this.element);
    }

    render() {
        this.element.textContent = `Level ${game.levels.indexOf(game.currentLevel) + 1}: ${game.currentLevel.name}`;
    }
}