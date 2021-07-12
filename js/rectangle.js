class rectangle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.game.context.fillStyle = 'red';
        this.game.context.fillRect(0 , 0, this.game.getWidth(), this.game.getWidth());
    }
}