class Scene {
    name: string

    constructor (name: string) {
        this.name = name;
    }

    load() {
        document.body.querySelector("game").textContent = "";
    }
}