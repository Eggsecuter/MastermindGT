var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Board = /** @class */ (function () {
    function Board() {
        this.element = document.createElement("board");
        document.body.querySelector("game").appendChild(this.element);
    }
    Board.prototype.render = function () {
        this.element.textContent = "";
        document.body.style.setProperty("--tiles-y", game.currentLevel.size + "");
        for (var y = 0; y < game.currentLevel.size; y++) {
            var row = document.createElement("row");
            this.element.appendChild(row);
            for (var x = 0; x < game.currentLevel.size; x++) {
                var element = document.createElement("tile");
                row.appendChild(element);
                for (var _i = 0, _a = game.currentLevel.tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (tile.x == x && tile.y == y) {
                        tile.render(element);
                    }
                }
                for (var _b = 0, _c = game.currentLevel.items; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (item.x == x && item.y == y) {
                        item.render(element);
                    }
                }
            }
        }
    };
    return Board;
}());
var Card = /** @class */ (function () {
    function Card(parent, player) {
        this.player = player;
        this.element = document.createElement("card");
        parent.appendChild(this.element);
        this.title = document.createElement("card-title");
        this.element.appendChild(this.title);
        this.content = document.createElement("card-content");
        this.element.appendChild(this.content);
    }
    Card.prototype.render = function () {
        this.title.textContent = "Player: " + this.player.keyUp;
        this.element.appendChild(this.title);
        this.content.textContent = "Keys: " + this.player.collectedItems.filter(function (i) { return i instanceof KeyItem; }).length;
        this.element.appendChild(this.content);
        if (this.player.reachedEnd) {
            this.element.setAttribute("success", "");
        }
        else {
            this.element.removeAttribute("success");
        }
    };
    return Card;
}());
function load(index) {
    game.loadLevel(game.levels[index - 1]);
    return "Current level: " + (game.levels.indexOf(game.currentLevel) + 1);
}
function skip(amount) {
    if (amount === void 0) { amount = 1; }
    game.loadLevel(game.levels[game.levels.indexOf(game.currentLevel) + amount]);
    return "Current level: " + (game.levels.indexOf(game.currentLevel) + 1);
}
function reload() {
    game.loadLevel(game.currentLevel);
    return "Current level: " + (game.levels.indexOf(game.currentLevel) + 1);
}
function creditsLevi() {
    return "Levi went Sicko Mode on this and many other projects!";
}
var game;
var Game = /** @class */ (function () {
    function Game(multiplayer) {
        this.multiplayer = multiplayer;
        if (multiplayer) {
            this.levels = [
                new Level("Multikulti Sinepius", 3, [
                    new StartTile(0, 2),
                    new StartTile(2, 2),
                    new EndTile(0, 0),
                    new EndTile(2, 0),
                    new WallTile(1, 0),
                    new WallTile(1, 1),
                    new WallTile(1, 2)
                ], []),
                new Level("Multasdfasdfikupius", 4, [
                    new StartTile(3, 3),
                    new StartTile(0, 0),
                    new EndTile(1, 0),
                    new EndTile(2, 2)
                ], []),
                new Level("ES for advanced people", 4, [
                    new StartTile(3, 3),
                    new StartTile(0, 0),
                    new EndTile(1, 0),
                    new EndTile(2, 2)
                ], [])
            ];
        }
        else {
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
                    new DeadlyTile(1, 1),
                    new DeadlyTile(3, 3)
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
        }
        this.currentLevel = this.levels[0];
    }
    Game.prototype.start = function () {
        var _this = this;
        document.body.querySelector("game").textContent = "";
        this.players = [];
        var starts = this.currentLevel.tiles.filter(function (item) { return item instanceof StartTile; });
        if (this.multiplayer) {
            if (starts.length > 1) {
                this.players = [
                    new Player(starts[0].x, starts[0].y, "arrowup", "arrowleft", "arrowdown", "arrowright"),
                    new Player(starts[1].x, starts[1].y, "w", "a", "s", "d")
                ];
            }
            else if (starts.length == 1) {
                this.players = [
                    new Player(starts[0].x, starts[0].y, "arrowup", "arrowleft", "arrowdown", "arrowright"),
                    new Player(starts[0].x, starts[0].y, "w", "a", "s", "d")
                ];
            }
        }
        else {
            if (starts.length == 1) {
                this.players = [
                    new Player(starts[0].x, starts[0].y, "arrowup", "arrowleft", "arrowdown", "arrowright")
                ];
            }
        }
        this.board = new Board();
        this.board.render();
        this.infobar = new InfoBar();
        this.infobar.render();
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.render();
        }
        onkeydown = function (event) {
            var key = event.key.toLowerCase();
            for (var _i = 0, _a = _this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.keyUp == key) {
                    player.move(0, -1);
                    event.preventDefault();
                }
                else if (player.keyDown == key) {
                    player.move(0, 1);
                    event.preventDefault();
                }
                else if (player.keyLeft == key) {
                    player.move(-1, 0);
                    event.preventDefault();
                }
                else if (player.keyRight == key) {
                    player.move(1, 0);
                    event.preventDefault();
                }
            }
            _this.infobar.render();
        };
    };
    Game.prototype.loadLevel = function (level) {
        this.currentLevel = level;
        this.start();
    };
    Game.prototype.nextLevel = function () {
        var index = this.levels.indexOf(game.currentLevel);
        if (index + 1 != this.levels.length) {
            this.loadLevel(this.levels[index + 1]);
        }
    };
    Game.prototype.retryLevel = function () {
        this.loadLevel(this.currentLevel);
    };
    return Game;
}());
onload = function () {
    game = new Game(true);
    game.start();
};
var InfoBar = /** @class */ (function () {
    function InfoBar() {
        this.element = document.createElement("info");
        document.body.querySelector("game").appendChild(this.element);
        this.title = document.createElement("title");
        this.element.appendChild(this.title);
        this.playercards = [];
        for (var _i = 0, _a = game.players; _i < _a.length; _i++) {
            var player = _a[_i];
            this.playercards.push(new Card(this.element, player));
        }
    }
    InfoBar.prototype.render = function () {
        this.title.textContent = "Level " + (game.levels.indexOf(game.currentLevel) + 1) + " | " + game.currentLevel.name;
        for (var _i = 0, _a = this.playercards; _i < _a.length; _i++) {
            var card = _a[_i];
            card.render();
        }
    };
    return InfoBar;
}());
var Item = /** @class */ (function () {
    function Item(x, y) {
        this.x = x;
        this.y = y;
    }
    Item.prototype.render = function (element) { };
    Item.prototype.hit = function (player) { };
    return Item;
}());
var Level = /** @class */ (function () {
    function Level(name, size, tiles, items) {
        this.name = name;
        this.size = size;
        this.tiles = tiles;
        this.items = items;
    }
    return Level;
}());
var Player = /** @class */ (function () {
    function Player(x, y, keyUp, keyLeft, keyDown, keyRight) {
        this.x = x;
        this.y = y;
        this.keyUp = keyUp;
        this.keyLeft = keyLeft;
        this.keyDown = keyDown;
        this.keyRight = keyRight;
        this.collectedItems = [];
        this.reachedEnd = false;
    }
    Player.prototype.render = function () {
        this.element = document.createElement("player");
        this.element.setAttribute("index", game.players.indexOf(this) + "");
        game.board.element.appendChild(this.element);
        this.move(0, 0);
    };
    Player.prototype.move = function (x, y) {
        var _this = this;
        if (this.positionLocked) {
            return;
        }
        for (var _i = 0, _a = game.currentLevel.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
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
        this.reachedEnd = !!game.currentLevel.tiles.find(function (tile) { return tile.x == _this.x && tile.y == _this.y && tile instanceof EndTile; });
        this.element.style.setProperty("--x", this.x.toString());
        this.element.style.setProperty("--y", this.y.toString());
        for (var _b = 0, _c = game.currentLevel.items; _b < _c.length; _b++) {
            var item = _c[_b];
            if (item.x == this.x && item.y == this.y) {
                item.hit(this);
            }
        }
    };
    Player.prototype.waitForAnimationEnd = function () {
        var _this = this;
        return new Promise(function (done) {
            _this.element.addEventListener("transitionend", function () {
                done();
            }, false);
        });
    };
    Player.prototype.lockPosition = function () {
        this.positionLocked = true;
    };
    Player.prototype.unlockPosition = function () {
        this.positionLocked = false;
    };
    return Player;
}());
Array.prototype.remove = function (item) {
    this.splice(this.indexOf(item), 1);
};
// const app = Node.prototype.appendChild;
// (Node.prototype as any).appendChild = function (newNode: Node): void {
//     console.log("append", newNode);
//     newNode.setAttribute("xxxtentacion", "");
//     app.bind(this)(newNode);
// }
var Tile = /** @class */ (function () {
    function Tile(x, y) {
        this.x = x;
        this.y = y;
    }
    Tile.prototype.render = function (element) { };
    Tile.prototype.hit = function (player) {
        return true;
    };
    Tile.prototype.occupied = function () {
        for (var _i = 0, _a = game.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.x == this.x && player.y == this.y) {
                return true;
            }
        }
    };
    return Tile;
}());
var KeyItem = /** @class */ (function (_super) {
    __extends(KeyItem, _super);
    function KeyItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyItem.prototype.render = function (element) {
        this.collected = false;
        this.element = document.createElement("key");
        element.appendChild(this.element);
    };
    KeyItem.prototype.hit = function (player) {
        if (!this.collected) {
            player.collectedItems.push(this);
            this.element.remove();
            this.collected = true;
        }
    };
    return KeyItem;
}(Item));
var DeadlyTile = /** @class */ (function (_super) {
    __extends(DeadlyTile, _super);
    function DeadlyTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadlyTile.prototype.render = function (element) {
        element.setAttribute("deadly", "");
    };
    DeadlyTile.prototype.hit = function (player) {
        player.lockPosition();
        player.waitForAnimationEnd().then(function () {
            game.retryLevel();
        });
        return true;
    };
    return DeadlyTile;
}(Tile));
var DoorTile = /** @class */ (function (_super) {
    __extends(DoorTile, _super);
    function DoorTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoorTile.prototype.render = function (element) {
        element.setAttribute("door", "");
        element.setAttribute("locked", "");
        this.element = element;
        this.unlocked = false;
    };
    DoorTile.prototype.hit = function (player) {
        if (this.unlocked) {
            return true;
        }
        if (player.collectedItems.filter(function (item) { return item instanceof KeyItem; }).length) {
            player.collectedItems.remove(player.collectedItems.find(function (k) { return k instanceof KeyItem; }));
            this.element.removeAttribute("locked");
            this.unlocked = true;
            return false;
        }
        return false;
    };
    return DoorTile;
}(Tile));
var EndTile = /** @class */ (function (_super) {
    __extends(EndTile, _super);
    function EndTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndTile.prototype.render = function (element) {
        element.setAttribute("end", "");
    };
    EndTile.prototype.hit = function (player) {
        if (this.occupied()) {
            return false;
        }
        player.reachedEnd = true;
        player.waitForAnimationEnd().then(function () {
            if (game.players.filter(function (p) { return p.reachedEnd; }).length == game.players.length) {
                game.nextLevel();
            }
        });
        return true;
    };
    return EndTile;
}(Tile));
var StartTile = /** @class */ (function (_super) {
    __extends(StartTile, _super);
    function StartTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartTile.prototype.render = function (element) {
        element.setAttribute("start", "");
    };
    StartTile.prototype.hit = function (player) {
        return true;
    };
    return StartTile;
}(Tile));
var WallTile = /** @class */ (function (_super) {
    __extends(WallTile, _super);
    function WallTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WallTile.prototype.render = function (element) {
        element.setAttribute("wall", "");
    };
    WallTile.prototype.hit = function (player) {
        return false;
    };
    return WallTile;
}(Tile));
//# sourceMappingURL=tsout.js.map