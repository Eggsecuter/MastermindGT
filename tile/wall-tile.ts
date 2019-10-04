class WallTile extends Tile {
    render(element: HTMLElement) {
        element.setAttribute("wall", "");
    }

    hit(player: Player) {
        return false;
    }
}