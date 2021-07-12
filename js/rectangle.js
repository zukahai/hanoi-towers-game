class rectangle {
    constructor(game, x, y, size) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw() {
        this.game.context.fillStyle = 'red';
        this.game.context.fillRect(this.x - this.size / 2 , this.y - this.game.getWidth() / 2, this.size, this.game.getWidth() + 1);
    }
}