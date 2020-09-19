class Scene {
    route: string

    constructor (route: string) {
        this.route = route;
    }

    load() {
        document.querySelector("game").textContent = "";
    }
}