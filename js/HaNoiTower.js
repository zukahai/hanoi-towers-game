game_W = 0, game_H = 0;
N = 4;
A = [];
B = [];
x = [, 0, 0, 0];
index = 0;
count = 1;
auto = false;
win = false;
cl = ["#666633", "#220000", "#006600", "#FF00FF", "#FF9900", "#FF99CC", "#99FF33", "#00FFFF"];
Xstart = Xend = 0;
touchCheck = false;

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

        A[1] = [];
        A[2] = [];
        A[3] = [];
        for (let i = 0; i < N; i++)
            A[1][i] = N - i;

        this.rec = [];
        this.render();
        this.loop();

        this.listenMouse();
        this.listenTouch();
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            touchCheck = true;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            if (x < this.getWidth() && y < 2* this.getWidth())
                this.Auto();
            Xstart = this.getCol(x);
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            if (touchCheck && A[Xstart].length > 0) {
                this.rec[A[Xstart][A[Xstart].length - 1]].y = y;
                this.rec[A[Xstart][A[Xstart].length - 1]].x = x;
            }
        })

        document.addEventListener("mouseup", evt => {
            touchCheck = false;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            Xend = this.getCol(x);
            this.move(Xstart, Xend);
        })
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            var x = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
            var y = evt.touches[0].pageY;
            Xend = this.getCol(x);
            if (touchCheck && A[Xstart].length > 0) {
                this.rec[A[Xstart][A[Xstart].length - 1]].y = y;
                this.rec[A[Xstart][A[Xstart].length - 1]].x = x;
            }
        })

        document.addEventListener("touchstart", evt => {
            touchCheck = true;
            var x = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
            var y = evt.touches[0].pageY;
            if (x < this.getWidth() && y < 2 * this.getWidth())
                this.Auto();
            Xstart = this.getCol(x);
        })

        document.addEventListener("touchend", evt => {   
            this.move(Xstart, Xend);
            touchCheck = false;
        })

        this.context.restore();
    }

    move(start, end) {
        if (A[start].length <= 0)
            return;
        if (A[start][A[start].length - 1] > A[end][A[end].length - 1] || start == end) {
            this.rec[A[start][A[start].length - 1]].y = game_H - this.getWidth() / 2 - (A[start].length) * this.getWidth();
            this.rec[A[start][A[start].length - 1]].x = x[start];
            return;
        }
            
        this.rec[A[start][A[start].length - 1]].y = game_H - this.getWidth() / 2 - (A[end].length + 1) * this.getWidth();
        this.rec[A[start][A[start].length - 1]].x = x[end];
        A[end][A[end].length] = A[start][A[start].length - 1];
            A[start] = A[start].slice(0, A[start].length - 1);
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        if (auto && count % 30 == 0) {
            if (index < B.length)
                this.move(B[index].s, B[index].e);
            index++;
        }
        count++;
        if (win && count > 0) {
            window.alert("You Win!");
            count = -1000000000;
        }
            
        if (A[1].length + A[2].length == 0 && !win) {
            win = true;
            count = -10;
        }
        this.render();
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.height = document.documentElement.clientHeight;
            this.canvas.width = document.documentElement.clientWidth;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            x[2] = game_W / 2;
            x[1] = game_W / 2 - game_W / 3;
            x[3] = game_W / 2 + game_W / 3;
            this.rec = [];
            for (let i = 0; i < N; i++)
                this.rec[N - i] = new rectangle(this, x[1], game_H - this.getWidth() / 2 - this.getWidth() * (i + 1), game_W / 3 - i * ((game_W / 3 - 3 * this.getWidth()) / (N - 1)), cl[i]);
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 1; i <= N; i++)
            this.rec[i].draw();
        this.drawIcon();
    }

    drawIcon() {
        this.context.font = this.getWidth() + 'px Calibri';
        this.context.fillStyle = "#000000";
        this.context.fillText("Auto", 0 , this.getWidth());
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

    getCol(x) {
        if (x < game_W / 3)
            return 1;
        if (x < 2 * game_W / 3)
            return 2;
        return 3;
    }

    Auto() {
        A[1] = [];
        A[2] = [];
        A[3] = [];
        for (let i = 0; i < N; i++)
            A[1][i] = N - i;
        auto = true;
    }
}

var g = new game();