class Board {
    scene: PlayScene;
    element: HTMLElement;

    constructor(
        scene: PlayScene
    ) {
        this.scene = scene;
        this.element = document.createElement("board");
        document.body.querySelector("game").appendChild(this.element);
    }

    render() {
        this.element.textContent = "";

        document.body.style.setProperty("--tiles-y", this.scene.currentLevel.size + "");

        for (let y = 0; y < this.scene.currentLevel.size; y++) {
            const row = document.createElement("row");
            this.element.appendChild(row);

            for (let x = 0; x < this.scene.currentLevel.size; x++) {
                const element = document.createElement("tile");
                row.appendChild(element);

                for (let tile of this.scene.currentLevel.tiles) {
                    if (tile.x == x && tile.y == y) {
                        tile.render(element);
                    }
                }

                for (let item of this.scene.currentLevel.items) {
                    if (item.x == x && item.y == y) {
                        item.render(element);
                    }
                }
            }
        }
    }
}

