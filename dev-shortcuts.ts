function load(index: number) {
    game.loadLevel(game.levels[index-1]);

    return "Current level: " + (game.levels.indexOf(game.currentLevel) + 1);
}

function skip(amount: number = 1) {
    game.loadLevel(game.levels[game.levels.indexOf(game.currentLevel) + amount]);

    return "Current level: " + (game.levels.indexOf(game.currentLevel) + 1);
}

function reload() {
    game.loadLevel(game.currentLevel);

    return "Current level: " + (game.levels.indexOf(game.currentLevel) + 1);
}

function creditsLevi() {
    return "Levi went Sicko Mode on this and many other projects!"
}