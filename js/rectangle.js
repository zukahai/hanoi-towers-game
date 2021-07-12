class rectangle {
    constructor(game, x, y, size, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        // console.log(this.color);
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x - this.size / 2 , this.y - this.game.getWidth() / 2, this.size, this.game.getWidth() + 1);
    }
}