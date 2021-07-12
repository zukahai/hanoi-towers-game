game_W = 0, game_H = 0;
N = 5;
A = [];
B = [];
x = [, 0, 0, 0];
die = false;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        A[1] = [];
        A[2] = [];
        A[3] = [];
        for (let i = 0; i < N; i++)
            A[1][i] = N - i;
        this.solve(1, 3, N);

        // console.log(B);
        this.rec = [];
        this.render();
        this.loop();

        this.listenMouse();
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {

        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 7);
    }

    update() {
        this.render();
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.height = document.documentElement.clientHeight;
            
            this.canvas.width = this.canvas.height;
            if (document.documentElement.clientWidth <= 1.5 * this.canvas.height)
                this.canvas.width = document.documentElement.clientWidth;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            x[2] = game_W / 2;
            x[1] = game_W / 2 - game_W / 3;
            x[3] = game_W / 2 + game_W / 3;
            this.rec = [];
            for (let i = 0; i < N; i++)
                this.rec[i] = new rectangle(this, x[1], game_H - this.getWidth() / 2 - this.getWidth() * (i + 1), game_W / 3 - i * ((game_W / 3 - 3 * this.getWidth()) / (N - 1)));
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 0; i < N; i++)
            this.rec[i].draw();
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#339999';
        this.context.fillRect(0 , 0, game_W, game_H);
        this.context.fillStyle = '#660000';
        for (let i = 1; i <= 3; i++)
            this.context.fillRect(x[i] - this.getWidth() / 4 , 2 * this.getWidth(), this.getWidth() / 2, game_H);
        this.context.fillRect(0 , game_H - this.getWidth(), game_W, this.getWidth() * 1.1);
    }
    getWidth() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }

    solve(start, end, N) {
        if (N == 1) {
            B.push({s : start, e: end});
            A[end][A[end].length] = A[start][A[start].length - 1];
            A[start] = A[start].slice(0, A[start].length - 1);
        } else {
            let t = this.otherNumber(start, end);
            this.solve(start, t, N - 1);
            this.solve(start, end, 1);
            this.solve(t, end, N - 1);
        }
    }

    otherNumber(a, b) {
        for (let i = 1; i <= 3; i++)
            if (a != i && b != i)
            return i;
        return -1;
    }
}

var g = new game();