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

        const singleplayer = document.createElement("button");
        buttons.appendChild(singleplayer);

        singleplayer.textContent = "Singleplayer"

        singleplayer.onclick = () => {
            game.startSingleplayer();
        }

        const multiplayer = document.createElement("button");
        buttons.appendChild(multiplayer);
        
        multiplayer.textContent = "Multiplayer"

        multiplayer.onclick = () => {
            game.startMultiplayer();
        }

        const settings = document.createElement("button");
        buttons.appendChild(settings);
        
        settings.textContent = "Settings"

        settings.onclick = () => {
            game.startSettings();
        }
    }
}