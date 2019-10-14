class Player {
    element: HTMLElement;
    collectedItems: Array<Item>;
    positionLocked: boolean;
    reachedEnd: boolean;

    constructor(
        public x: number,
        public y: number,
        public keyUp: string,
        public keyLeft: string,
        public keyDown: string,
        public keyRight: string
    ) {
        this.collectedItems = [];
        this.reachedEnd = false;
    }

    render() {
        this.element = document.createElement("player");
        this.element.setAttribute("index", game.players.indexOf(this) + "");

        game.board.element.appendChild(this.element);

        this.move(0, 0);
    }

    move(x: number, y: number) {
        this.reachedEnd = false;
        
        if (this.positionLocked) {
            return;
        }
        
        for (let tile of game.currentLevel.tiles) {
            if (tile.x == this.x + x && tile.y == this.y + y) {
                if (!tile.hit(this)) {
                    return;
                }
            }
        }

        if (this.x + x > -1 && this.x + x < game.currentLevel.size) {
            this.x += x;
        }

        if (this.y + y > -1 && this.y + y < game.currentLevel.size) {
            this.y += y;
        }

        this.element.style.setProperty("--x", this.x.toString());
        this.element.style.setProperty("--y", this.y.toString());

        for (let item of game.currentLevel.items) {
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