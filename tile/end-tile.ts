class EndTile extends Tile {
    render(element: HTMLElement) {
        element.setAttribute("end", "");
    }

    hit(player: Player) {
        player.waitForAnimationEnd().then(() => {
            game.nextLevel();
        });

        return true;
    }
}