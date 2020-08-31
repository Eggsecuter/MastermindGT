let game: Game;

class Game {
    scenes: Array<Scene>;

    playerSettings: Array<PlayerSetting>;

    constructor () {
        this.playerSettings = [
            new PlayerSetting("Steve", "arrowup", "arrowleft", "arrowdown", "arrowright"),
            new PlayerSetting("Alex", "w", "a", "s", "d")
        ]

        this.scenes  = [
            new MenuScene("menu"),
            new SettingsScene("settings"),
            new PlayScene("tutorial", false),
            new PlayScene("multiplayer", true)
        ];
        
    }
    
    init() {
        const route = location.pathname.split("/")[1] || "menu";
        
        (this.scenes.find(s => s.route == route) || new Scene("")).load();
    }

    // startMenu() {
    //     for(let scene of this.scenes) {
    //         if(scene instanceof PlayScene) {
    //             scene.unload();
    //         }
    //     }
        
    //     this.loadScene("menu");
    // }
}

onload = () => {
    game = new Game();
    game.init();
};