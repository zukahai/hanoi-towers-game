class rectangle {
    constructor(game, x, y, size, color, index) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = size - this.game.getWidth();
        this.color = color;
        this.index = index;
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

        this.game.context.textAlign = "center";
        this.game.context.fillStyle = "#ffffff";
        this.game.context.font = this.game.getWidth() / 2 + 'px NVNPixelFJVerdana8pt';
        this.game.context.fillText(this.index, this.x, this.y + this.game.getWidth() / 4);

    }
}