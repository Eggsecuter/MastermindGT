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
    function Board(scene) {
        this.scene = scene;
        this.element = document.createElement("board");
        document.body.querySelector("game").appendChild(this.element);
    }
    Board.prototype.render = function () {
        this.element.textContent = "";
        document.body.style.setProperty("--tiles-y", this.scene.currentLevel.size + "");
        for (var y = 0; y < this.scene.currentLevel.size; y++) {
            var row = document.createElement("row");
            this.element.appendChild(row);
            for (var x = 0; x < this.scene.currentLevel.size; x++) {
                var element = document.createElement("tile");
                row.appendChild(element);
                for (var _i = 0, _a = this.scene.currentLevel.tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (tile.x == x && tile.y == y) {
                        tile.render(element);
                    }
                }
                for (var _b = 0, _c = this.scene.currentLevel.items; _b < _c.length; _b++) {
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
        this.title.textContent = this.player.settings.name;
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
var game;
var Game = /** @class */ (function () {
    function Game() {
        this.playerSettings = [
            new PlayerSetting("Steve", "arrowup", "arrowleft", "arrowdown", "arrowright"),
            new PlayerSetting("Alex", "w", "a", "s", "d")
        ];
        this.scenes = [
            new MenuScene("menu"),
            new SettingsScene("settings"),
            new PlayScene("tutorial", false),
            new PlayScene("multiplayer", true)
        ];
    }
    Game.prototype.init = function () {
        var route = location.pathname.split("/")[1] || "menu";
        (this.scenes.find(function (s) { return s.route == route; }) || new Scene("")).load();
    };
    return Game;
}());
onload = function () {
    game = new Game();
    game.init();
};
var InfoBar = /** @class */ (function () {
    function InfoBar(scene) {
        this.scene = scene;
        this.element = document.createElement("info");
        document.body.querySelector("game").appendChild(this.element);
        this.title = document.createElement("title");
        this.element.appendChild(this.title);
        this.playercards = [];
        for (var _i = 0, _a = scene.players; _i < _a.length; _i++) {
            var player = _a[_i];
            this.playercards.push(new Card(this.element, player));
        }
    }
    InfoBar.prototype.render = function () {
        this.title.textContent = "Level " + (this.scene.levels.indexOf(this.scene.currentLevel) + 1) + " | " + this.scene.currentLevel.name;
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
var PlayerSetting = /** @class */ (function () {
    function PlayerSetting(name, keyUp, keyLeft, keyDown, keyRight) {
        this.name = name;
        this.keyUp = keyUp;
        this.keyLeft = keyLeft;
        this.keyDown = keyDown;
        this.keyRight = keyRight;
    }
    return PlayerSetting;
}());
var Player = /** @class */ (function () {
    function Player(scene, settings, x, y) {
        this.scene = scene;
        this.settings = settings;
        this.x = x;
        this.y = y;
        this.collectedItems = [];
        this.reachedEnd = false;
    }
    Player.prototype.render = function () {
        this.element = document.createElement("player");
        this.element.setAttribute("index", this.scene.players.indexOf(this) + "");
        this.scene.board.element.appendChild(this.element);
        this.move(0, 0);
    };
    Player.prototype.move = function (x, y) {
        var _this = this;
        if (this.positionLocked) {
            return;
        }
        for (var _i = 0, _a = this.scene.currentLevel.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
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
        this.reachedEnd = !!this.scene.currentLevel.tiles.find(function (tile) { return tile.x == _this.x && tile.y == _this.y && tile instanceof EndTile; });
        this.element.style.setProperty("--x", this.x.toString());
        this.element.style.setProperty("--y", this.y.toString());
        for (var _b = 0, _c = this.scene.currentLevel.items; _b < _c.length; _b++) {
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
var Scene = /** @class */ (function () {
    function Scene(route) {
        this.route = route;
    }
    Scene.prototype.load = function () {
        document.querySelector("game").textContent = "";
    };
    return Scene;
}());
var Tile = /** @class */ (function () {
    function Tile(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
    }
    Tile.prototype.render = function (element) { };
    Tile.prototype.hit = function (player) {
        return true;
    };
    Tile.prototype.occupied = function () {
        for (var _i = 0, _a = this.scene.players; _i < _a.length; _i++) {
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
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuScene.prototype.load = function () {
        var container = document.body.querySelector("game");
        container.textContent = "";
        var startMenu = document.createElement("start-menu");
        container.appendChild(startMenu);
        var logo = document.createElement("logo");
        startMenu.appendChild(logo);
        var buttons = document.createElement("menu-buttons");
        startMenu.appendChild(buttons);
        var tutorial = document.createElement("button");
        buttons.appendChild(tutorial);
        tutorial.textContent = "Tutorial";
        tutorial.onclick = function () {
            // game.loadScene("tutorial");
            location.replace(location.origin + "/tutorial");
        };
        var multiplayer = document.createElement("button");
        buttons.appendChild(multiplayer);
        multiplayer.textContent = "Multiplayer";
        multiplayer.onclick = function () {
            // game.loadScene("multiplayer");
            location.replace(location.origin + "/multiplayer");
        };
        var settings = document.createElement("button");
        buttons.appendChild(settings);
        settings.textContent = "Settings";
        settings.onclick = function () {
            // game.loadScene("settings");
            location.replace(location.origin + "/settings");
        };
    };
    return MenuScene;
}(Scene));
var PlayScene = /** @class */ (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene(route, multiplayer) {
        var _this = _super.call(this, route) || this;
        _this.menuKey = "escape";
        _this.multiplayer = multiplayer;
        if (multiplayer) {
            _this.levels = [
                new Level("Multikulti Sinepius", 3, [
                    new StartTile(_this, 0, 2),
                    new StartTile(_this, 2, 2),
                    new EndTile(_this, 0, 0),
                    new EndTile(_this, 2, 0),
                    new WallTile(_this, 1, 0),
                    new WallTile(_this, 1, 1),
                    new WallTile(_this, 1, 2)
                ], []),
                new Level("Multasdfasdfikupius", 4, [
                    new StartTile(_this, 3, 3),
                    new StartTile(_this, 0, 0),
                    new EndTile(_this, 1, 0),
                    new EndTile(_this, 2, 2)
                ], []),
                new Level("ES for advanced people", 4, [
                    new StartTile(_this, 3, 3),
                    new StartTile(_this, 0, 0),
                    new EndTile(_this, 1, 0),
                    new EndTile(_this, 2, 2)
                ], [])
            ];
        }
        else {
            _this.levels = [
                new Level("PBC Startup", 3, [
                    new StartTile(_this, 0, 0),
                    new EndTile(_this, 2, 0)
                ], []),
                new Level("bands bands bands", 5, [
                    new StartTile(_this, 0, 1),
                    new EndTile(_this, 2, 0),
                    new DeadlyTile(_this, 0, 0),
                    new DeadlyTile(_this, 1, 0),
                    new DeadlyTile(_this, 1, 1),
                    new DeadlyTile(_this, 3, 3)
                ], []),
                new Level("Racks in da fridge", 5, [
                    new StartTile(_this, 1, 0),
                    new EndTile(_this, 4, 4),
                    new DoorTile(_this, 2, 1),
                    new DoorTile(_this, 3, 2),
                    new WallTile(_this, 2, 0),
                    new WallTile(_this, 2, 2),
                    new WallTile(_this, 4, 2),
                    new WallTile(_this, 2, 3),
                    new WallTile(_this, 1, 3),
                    new WallTile(_this, 1, 4)
                ], [
                    new KeyItem(4, 0),
                    new KeyItem(0, 4)
                ]),
                new Level("Adran Habler", 16, [
                    new StartTile(_this, 0, 0),
                    new EndTile(_this, 1, 1),
                    new DeadlyTile(_this, 1, 0)
                ], [])
            ];
        }
        _this.currentLevel = _this.levels[0];
        return _this;
    }
    PlayScene.prototype.load = function () {
        var _this = this;
        document.body.querySelector("game").textContent = "";
        this.players = [];
        var starts = this.currentLevel.tiles.filter(function (item) { return item instanceof StartTile; });
        if (starts.length && game.playerSettings.length) {
            this.players.push(new Player(this, game.playerSettings[0], starts[0].x, starts[0].y));
            if (this.multiplayer && game.playerSettings[1]) {
                if (starts[1]) {
                    this.players.push(new Player(this, game.playerSettings[1], starts[1].x, starts[1].y));
                }
                else {
                    this.players.push(new Player(this, game.playerSettings[1], starts[0].x, starts[0].y));
                }
            }
        }
        this.board = new Board(this);
        this.board.render();
        this.infobar = new InfoBar(this);
        this.infobar.render();
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.render();
        }
        onkeydown = function (event) {
            var key = event.key.toLowerCase();
            if (_this.menuKey == key) {
                location.replace(location.origin);
                event.preventDefault();
            }
            for (var _i = 0, _a = _this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.settings.keyUp == key) {
                    player.move(0, -1);
                    event.preventDefault();
                }
                else if (player.settings.keyDown == key) {
                    player.move(0, 1);
                    event.preventDefault();
                }
                else if (player.settings.keyLeft == key) {
                    player.move(-1, 0);
                    event.preventDefault();
                }
                else if (player.settings.keyRight == key) {
                    player.move(1, 0);
                    event.preventDefault();
                }
            }
            _this.infobar.render();
        };
    };
    PlayScene.prototype.loadLevel = function (level) {
        this.currentLevel = level;
        this.load();
    };
    PlayScene.prototype.nextLevel = function () {
        var index = this.levels.indexOf(this.currentLevel);
        if (index + 1 != this.levels.length) {
            this.loadLevel(this.levels[index + 1]);
        }
    };
    PlayScene.prototype.retryLevel = function () {
        this.loadLevel(this.currentLevel);
    };
    PlayScene.prototype.unload = function () {
        onkeydown = function () { };
    };
    return PlayScene;
}(Scene));
var SettingsScene = /** @class */ (function (_super) {
    __extends(SettingsScene, _super);
    function SettingsScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsScene.prototype.load = function () {
        var container = document.body.querySelector("game");
        container.textContent = "";
        var startMenu = document.createElement("start-menu");
        container.appendChild(startMenu);
        var _loop_1 = function (setting) {
            var input = document.createElement("input");
            startMenu.appendChild(input);
            input.type = "text";
            input.value = setting.name;
            input.onchange = function () {
                setting.name = input.value;
            };
        };
        for (var _i = 0, _a = game.playerSettings; _i < _a.length; _i++) {
            var setting = _a[_i];
            _loop_1(setting);
        }
        var buttons = document.createElement("menu-buttons");
        startMenu.appendChild(buttons);
        var back = document.createElement("button");
        buttons.appendChild(back);
        back.textContent = "Back";
        back.onclick = function () {
            // game.startMenu();
            location.replace(location.origin);
        };
    };
    return SettingsScene;
}(Scene));
var DeadlyTile = /** @class */ (function (_super) {
    __extends(DeadlyTile, _super);
    function DeadlyTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeadlyTile.prototype.render = function (element) {
        element.setAttribute("deadly", "");
    };
    DeadlyTile.prototype.hit = function (player) {
        var _this = this;
        player.lockPosition();
        player.waitForAnimationEnd().then(function () {
            _this.scene.retryLevel();
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
        var _this = this;
        if (this.occupied()) {
            return false;
        }
        player.reachedEnd = true;
        player.waitForAnimationEnd().then(function () {
            if (_this.scene.players.filter(function (p) { return p.reachedEnd; }).length == _this.scene.players.length) {
                _this.scene.nextLevel();
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
//# sourceMappingURL=main.js.map