class SettingsScene extends Scene {
    load() {
        const container = document.body.querySelector("game");
        container.textContent = "";

        const startMenu = document.createElement("start-menu");
        container.appendChild(startMenu);

        for (let setting of game.playerSettings) {
            const input = document.createElement("input");
            startMenu.appendChild(input);
    
            input.type = "text";
            input.value = setting.name;
    
            input.onchange = () => {
                setting.name = input.value;
            }
        }

        const buttons = document.createElement("menu-buttons");
        startMenu.appendChild(buttons);

        const back = document.createElement("button");
        buttons.appendChild(back);

        back.textContent = "Back"

        back.onclick = () => {
            // game.startMenu();
            location.replace(location.origin);
        }
    }
}