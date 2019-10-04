let game: Game;

class Game {
    name: string;

    infobar: InfoBar;
    board: Board;
    players: Array<Player>;

    levels: Array<Level>;
    currentLevel: Level;

    constructor(
        public multiplayer: boolean
    ) {
        this.levels = [
            new Level("PBC Startup", 3, [
                new StartTile(0, 0),
                new EndTile(2, 0)
            ], []),
            new Level("bands bands bands", 5, [
                new StartTile(0, 1),
                new EndTile(2, 0),
                new DeadlyTile(0, 0),
                new DeadlyTile(1, 0),
                new DeadlyTile(1, 1)
            ], []),
            new Level("Racks in da fridge", 5, [
                new StartTile(1, 0),
                new EndTile(4, 4),
                new DoorTile(2, 1),
                new DoorTile(3, 2),
                new WallTile(2, 0),
                new WallTile(2, 2),
                new WallTile(4, 2),
                new WallTile(2, 3),
                new WallTile(1, 3),
                new WallTile(1, 4)
            ], [
                new KeyItem(4, 0),
                new KeyItem(0, 4)
            ]),
            new Level("Adran Habler", 16, [
                new StartTile(0, 0),
                new EndTile(1, 1),
                new DeadlyTile(1, 0)
            ], [])
        ];

        this.currentLevel = this.levels[0];
    }

    start() {
        this.infobar = new InfoBar();
        this.board = new Board();

        const start = this.currentLevel.tiles.find(item => item instanceof StartTile);
        if(this.multiplayer){
            this.players = [
                new Player(start.x, start.y, "arrowup", "arrowleft", "arrowdown", "arrowright"),
                new Player(start.x, start.y, "w", "a", "s", "d")
            ];
        }
        else{
            this.players = [
                new Player(start.x, start.y, "arrowup", "arrowleft", "arrowdown", "arrowright")
            ];
        }

        this.board.render();
        this.infobar.render();

        for (let player of this.players) {
            player.render();
        }

        onkeydown = event => {
            this.infobar.render();

            const key = event.key.toLowerCase();

            for (let player of this.players) {
                if (player.keyUp == key) {
                    player.move(0, -1);

                    event.preventDefault();
                } else if (player.keyDown == key) {
                    player.move(0, 1);

                    event.preventDefault();
                } else if (player.keyLeft == key) {
                    player.move(-1, 0);

                    event.preventDefault();
                } else if (player.keyRight == key) {
                    player.move(1, 0);

                    event.preventDefault();
                }
            }
        }
    }

    loadLevel(level: Level) {
        this.currentLevel = level;
        
        document.body.querySelector("game").textContent = "";

        this.start();
    }

    nextLevel() {
        const index = this.levels.indexOf(game.currentLevel);

        if (index + 1 != this.levels.length) {
            this.loadLevel(this.levels[index + 1]);
        }
    }

    retryLevel() {
        this.loadLevel(this.currentLevel);
    }
}

onload = () => {
    if(confirm("Multiplayer?")){
        game = new Game(true);
    }
    else{
        game = new Game(false);
    }
    game.start();
};