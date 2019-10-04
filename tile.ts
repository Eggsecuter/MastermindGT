class Tile {
    constructor(
        public x: number,
        public y: number
    ) {}

    render(element: HTMLElement) {}
    hit(player: Player): boolean {
        return true;
    }

    occupied() {
        for (let player of game.players) {
            if (player.x == this.x && player.y == this.y) {
                return true;
            }
        }
    }
}