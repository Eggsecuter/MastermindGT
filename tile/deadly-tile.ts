class DeadlyTile extends Tile {
    render(element: HTMLElement) {
        element.setAttribute("deadly", "");
    }

    hit(player: Player) {
        player.lockPosition();

        player.waitForAnimationEnd().then(() => {
            game.retryLevel();
        });

        return true;
    }
}