class DeadlyTile extends Tile {
    render(element: HTMLElement) {
        element.setAttribute("deadly", "");
    }

    hit(player: Player) {
        player.lockPosition();

        player.waitForAnimationEnd().then(() => {
            this.scene.retryLevel();
        });

        return true;
    }
}