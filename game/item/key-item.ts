class KeyItem extends Item {
    element: HTMLElement;
    collected: boolean;

    render(element: HTMLElement) {
        this.collected = false;

        this.element = document.createElement("key");
        element.appendChild(this.element);
    }

    hit(player: Player) {
        if (!this.collected){
            player.collectedItems.push(this);

            this.element.remove();
            this.collected = true;
        }
    }
}