class rectangle {
    constructor(game, x, y, size, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = size - this.game.getWidth();
        this.color = color;
    }

    draw() {
        this.game.context.beginPath();
        this.game.context.fillStyle = this.color;
        this.game.context.arc(this.x - this.size / 2, this.y, this.game.getWidth() / 2, 0, 2 * Math.PI, false);
        this.game.context.fill();
        this.game.context.closePath()

        this.game.context.beginPath();
        this.game.context.fillStyle = this.color;
        this.game.context.arc(this.x + this.size / 2, this.y, this.game.getWidth() / 2, 0, 2 * Math.PI, false);
        this.game.context.fill();
        this.game.context.closePath()
        
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x - this.size / 2 , this.y - this.game.getWidth() / 2, this.size, this.game.getWidth() + 1);
    }
}