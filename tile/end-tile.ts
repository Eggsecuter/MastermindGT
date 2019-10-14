class EndTile extends Tile {
    render(element: HTMLElement) {
        element.setAttribute("end", "");
    }

    hit(player: Player) {
        if(this.occupied()){
            return false;
        }

        player.reachedEnd = true;
        
        player.waitForAnimationEnd().then(() => {
            if (game.players.filter(p => p.reachedEnd).length == game.players.length) {
                game.nextLevel();
            }
        });

        return true;
    }
}