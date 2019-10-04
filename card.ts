class Card {
    element: HTMLElement;
    title: HTMLElement;
    content: HTMLElement;
    player: Player;

    constructor(parent: HTMLElement, player: Player) {
        this.player = player;

        this.element = document.createElement("card");
        parent.appendChild(this.element);
        
        this.title = document.createElement("card-title");
        this.element.appendChild(this.title);

        this.content = document.createElement("card-content");
        this.element.appendChild(this.content);
    }
    
    render() {
        this.title.textContent = "Player: " + this.player.keyUp;
        this.element.appendChild(this.title);

        this.content.textContent = "Keys: " + this.player.collectedItems.filter(i => i instanceof KeyItem).length;
        this.element.appendChild(this.content);

        if (this.player.reachedEnd) {
            this.element.setAttribute("success", "");
        }
        else {
            this.element.removeAttribute("success");
        }
    }
}