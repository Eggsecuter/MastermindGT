class StartTile extends Tile {
    render(element: HTMLElement) {
        element.setAttribute("start", "");
    }

    hit(player: Player) {
        return true;
    }
}