class Tile {
    constructor(
        public x: number,
        public y: number
    ) {}

    render(element: HTMLElement) {}
    hit(player: Player): boolean {
        return true;
    }
}