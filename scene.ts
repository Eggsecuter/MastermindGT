class Scene {
    name: string

    constructor (name: string) {
        this.name = name;
    }

    load() {
        document.querySelector("game").textContent = "";
    }
}