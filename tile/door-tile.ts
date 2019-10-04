class DoorTile extends Tile {
    element: HTMLElement;
    unlocked: boolean;

    render(element: HTMLElement) {
        element.setAttribute("door", "");
        element.setAttribute("locked", "");

        this.element = element; 
        this.unlocked = false;
    }

    hit(player: Player) {
        if(this.unlocked){
            return true;
        }

        if (player.collectedItems.filter(item => item instanceof KeyItem).length) {
            player.collectedItems.remove(player.collectedItems.find(k => k instanceof KeyItem));
            this.element.removeAttribute("locked");
            this.unlocked = true;
            
            return false;
        }
        
        return false;
    }
}