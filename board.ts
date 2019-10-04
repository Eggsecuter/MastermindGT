class Board {
    element: HTMLElement;

    constructor() {
        this.element = document.createElement("board");
        document.body.querySelector("game").appendChild(this.element);
    }

    render() {
        this.element.textContent = "";

        document.body.style.setProperty("--tiles-y", game.currentLevel.size + "");

        for (let y = 0; y < game.currentLevel.size; y++) {
            const row = document.createElement("row");
            this.element.appendChild(row);

            for (let x = 0; x < game.currentLevel.size; x++) {
                const element = document.createElement("tile");
                row.appendChild(element);

                for (let tile of game.currentLevel.tiles) {
                    if (tile.x == x && tile.y == y) {
                        tile.render(element);
                    }
                }

                for (let item of game.currentLevel.items) {
                    if (item.x == x && item.y == y) {
                        item.render(element);
                    }
                }
            }
        }
    }
}

