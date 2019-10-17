class Player {
    scene: PlayScene;
    element: HTMLElement;
    collectedItems: Array<Item>;
    positionLocked: boolean;
    reachedEnd: boolean;

    constructor(
        scene: PlayScene,
        public x: number,
        public y: number,
        public keyUp: string,
        public keyLeft: string,
        public keyDown: string,
        public keyRight: string
    ) {
        this.scene = scene;
        this.collectedItems = [];
        this.reachedEnd = false;
    }

    render() {
        this.element = document.createElement("player");
        this.element.setAttribute("index", this.scene.players.indexOf(this) + "");

        this.scene.board.element.appendChild(this.element);

        this.move(0, 0);
    }

    move(x: number, y: number) {
        if (this.positionLocked) {
            return;
        }

        for (let tile of this.scene.currentLevel.tiles) {
            if (tile.x == this.x + x && tile.y == this.y + y) {
                if (!tile.hit(this)) {
                    return;
                }
            }
        }
        
        if (this.x + x > -1 && this.x + x < this.scene.currentLevel.size) {
            this.x += x;
        }
        
        if (this.y + y > -1 && this.y + y < this.scene.currentLevel.size) {
            this.y += y;
        }

        this.reachedEnd = !!this.scene.currentLevel.tiles.find(tile => tile.x == this.x && tile.y == this.y && tile instanceof EndTile);

        this.element.style.setProperty("--x", this.x.toString());
        this.element.style.setProperty("--y", this.y.toString());

        for (let item of this.scene.currentLevel.items) {
            if (item.x == this.x && item.y == this.y) {
                item.hit(this);
            }
        }
    }

    waitForAnimationEnd() {
        return new Promise(done => {
            this.element.addEventListener("transitionend", () => {
                done();
            }, false);
        });
    }

    lockPosition() {
        this.positionLocked = true;
    }

    unlockPosition() {
        this.positionLocked = false;
    }
}