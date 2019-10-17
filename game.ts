let game: Game;

class Game {
    scenes: Array<Scene>;
    currentScene: Scene;

    constructor () {
        this.scenes  = [
            new MenuScene("Menu"),
            new PlayScene("Play", true)
        ];
        this.currentScene = this.scenes[1];

        this.loadScene(this.currentScene);
    }

    loadScene(scene: Scene) {
        scene.load();
    }
}

onload = () => {
    game = new Game();
};