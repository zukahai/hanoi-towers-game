class rectangle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.game.context.fillStyle = '#339999';
        this.game.context.fillRect(0 , 0, 100, 100);
    }
}