class Item {
    constructor(
        public x: number,
        public y: number
    ) {}

    render(element: HTMLElement) {}
    hit(player: Player) {}
}