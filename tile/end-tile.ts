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
            if (this.scene.players.filter(p => p.reachedEnd).length == this.scene.players.length) {
                this.scene.nextLevel();
            }
        });

        return true;
    }
}