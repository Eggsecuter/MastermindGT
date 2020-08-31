class MenuScene extends Scene {
    load() {
        const container = document.body.querySelector("game");
        container.textContent = "";

        const startMenu = document.createElement("start-menu");
        container.appendChild(startMenu);

        const logo = document.createElement("logo");
        startMenu.appendChild(logo);

        const buttons = document.createElement("menu-buttons");
        startMenu.appendChild(buttons);

        const tutorial = document.createElement("button");
        buttons.appendChild(tutorial);

        tutorial.textContent = "Tutorial"

        tutorial.onclick = () => {
            // game.loadScene("tutorial");
            location.replace(`${location.origin}/tutorial`);
        }

        const multiplayer = document.createElement("button");
        buttons.appendChild(multiplayer);
        
        multiplayer.textContent = "Multiplayer"

        multiplayer.onclick = () => {
            // game.loadScene("multiplayer");
            location.replace(`${location.origin}/multiplayer`);
        }

        const settings = document.createElement("button");
        buttons.appendChild(settings);
        
        settings.textContent = "Settings"

        settings.onclick = () => {
            // game.loadScene("settings");
            location.replace(`${location.origin}/settings`);
        }
    }
}