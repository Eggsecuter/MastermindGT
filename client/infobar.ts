class InfoBar{
    scene: PlayScene;
    element: HTMLElement;
    title: HTMLElement;
    playercards: Array<Card>;

    constructor(
        scene: PlayScene
    ) {
        this.scene = scene;
        this.element = document.createElement("info");
        document.body.querySelector("game").appendChild(this.element);

        this.title = document.createElement("title");
        this.element.appendChild(this.title);

        this.playercards = [];
        for (let player of scene.players) {
            this.playercards.push(new Card(this.element, player));
        }
    }

    render() {
        this.title.textContent = `Level ${this.scene.levels.indexOf(this.scene.currentLevel) + 1} | ${this.scene.currentLevel.name}`;

        for (let card of this.playercards) {
            card.render();
        }
    }
}