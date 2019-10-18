let game: Game;

class Game {
    scenes: Array<Scene>;
    currentScene: Scene;

    playerSettings: Array<PlayerSetting>;

    constructor () {
        this.playerSettings = [
            new PlayerSetting("Steve", "arrowup", "arrowleft", "arrowdown", "arrowright"),
            new PlayerSetting("Alex", "w", "a", "s", "d")
        ]

        this.scenes  = [
            new MenuScene("Menu"),
            new SettingsScene("Settings"),
            new PlayScene("Singleplayer", false),
            new PlayScene("Multiplayer", true)
        ];
        
        this.currentScene = this.scenes[0];

        this.loadScene(this.currentScene);
    }

    loadScene(scene: Scene) {
        scene.load();
    }

    startMenu() {
        for(let scene of this.scenes) {
            if(scene instanceof PlayScene) {
                scene.unload();
            }
        }
        
        this.loadScene(this.scenes.find(scene => scene.name == "Menu"));
    }

    startSettings() {
        this.loadScene(this.scenes.find(scene => scene.name == "Settings"));
    }

    startSingleplayer() {
        this.loadScene(this.scenes.find(scene => scene.name == "Singleplayer"));
    }

    startMultiplayer() {
        this.loadScene(this.scenes.find(scene => scene.name == "Multiplayer"));
    }
}

onload = () => {
    game = new Game();
};