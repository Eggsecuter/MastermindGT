class PlayScene extends Scene {
    infobar: InfoBar;
    board: Board;
    players: Array<Player>;

    levels: Array<Level>;
    currentLevel: Level;
    multiplayer: boolean;

    menuKey: string = "escape";

    constructor(
        route: string,
        multiplayer: boolean
    ) {
        super(route);

        this.multiplayer = multiplayer

        if(multiplayer){
            this.levels = [
                new Level("Multikulti Sinepius", 3, [
                    new StartTile(this, 0, 2),
                    new StartTile(this, 2, 2),
                    new EndTile(this, 0, 0),
                    new EndTile(this, 2, 0),
                    new WallTile(this, 1, 0),
                    new WallTile(this, 1, 1),
                    new WallTile(this, 1, 2)
                ], []),
                new Level("Multasdfasdfikupius", 4, [
                    new StartTile(this, 3, 3),
                    new StartTile(this, 0, 0),
                    new EndTile(this, 1, 0),
                    new EndTile(this, 2, 2)
                ], []),
                new Level("ES for advanced people", 4, [
                    new StartTile(this, 3, 3),
                    new StartTile(this, 0, 0),
                    new EndTile(this, 1, 0),
                    new EndTile(this, 2, 2)
                ], [])
            ];
        }
        else{
            this.levels = [
                new Level("PBC Startup", 3, [
                    new StartTile(this, 0, 0),
                    new EndTile(this, 2, 0)
                ], []),
                new Level("bands bands bands", 5, [
                    new StartTile(this, 0, 1),
                    new EndTile(this, 2, 0),
                    new DeadlyTile(this, 0, 0),
                    new DeadlyTile(this, 1, 0),
                    new DeadlyTile(this, 1, 1),
                    new DeadlyTile(this, 3, 3)
                ], []),
                new Level("Racks in da fridge", 5, [
                    new StartTile(this, 1, 0),
                    new EndTile(this, 4, 4),
                    new DoorTile(this, 2, 1),
                    new DoorTile(this, 3, 2),
                    new WallTile(this, 2, 0),
                    new WallTile(this, 2, 2),
                    new WallTile(this, 4, 2),
                    new WallTile(this, 2, 3),
                    new WallTile(this, 1, 3),
                    new WallTile(this, 1, 4)
                ], [
                    new KeyItem(4, 0),
                    new KeyItem(0, 4)
                ]),
                new Level("Adran Habler", 16, [
                    new StartTile(this, 0, 0),
                    new EndTile(this, 1, 1),
                    new DeadlyTile(this, 1, 0)
                ], [])
            ];
        }

        this.currentLevel = this.levels[0];
    }

    load() {
        document.body.querySelector("game").textContent = "";

        this.players = [];
        const starts = this.currentLevel.tiles.filter(item => item instanceof StartTile);
        
        if(starts.length && game.playerSettings.length) {
            this.players.push(new Player(this, game.playerSettings[0], starts[0].x, starts[0].y));

            if(this.multiplayer && game.playerSettings[1]) {
                if(starts[1]) {
                    this.players.push(new Player(this, game.playerSettings[1], starts[1].x, starts[1].y));
                } else {
                    this.players.push(new Player(this, game.playerSettings[1], starts[0].x, starts[0].y));
                }
            }
        }

        this.board = new Board(this);
        this.board.render();
        this.infobar = new InfoBar(this);
        this.infobar.render();

        for (let player of this.players) {
            player.render();
        }

        onkeydown = event => {
            const key = event.key.toLowerCase();

            if (this.menuKey == key) {
                location.replace(location.origin);

                event.preventDefault();
            }

            for (let player of this.players) {
                if (player.settings.keyUp == key) {
                    player.move(0, -1);

                    event.preventDefault();
                } else if (player.settings.keyDown == key) {
                    player.move(0, 1);

                    event.preventDefault();
                } else if (player.settings.keyLeft == key) {
                    player.move(-1, 0);

                    event.preventDefault();
                } else if (player.settings.keyRight == key) {
                    player.move(1, 0);

                    event.preventDefault();
                }
            }
            
            this.infobar.render();
        }
    }

    loadLevel(level: Level) {
        this.currentLevel = level;
        
        this.load();
    }

    nextLevel() {
        const index = this.levels.indexOf(this.currentLevel);

        if (index + 1 != this.levels.length) {
            this.loadLevel(this.levels[index + 1]);
        }
    }

    retryLevel() {
        this.loadLevel(this.currentLevel);
    }

    unload() {
        onkeydown = () => {};
    }
}