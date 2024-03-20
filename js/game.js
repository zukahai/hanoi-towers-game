gameWidth = 0, gameHeight = 0;
N = 3;
A = [];
B = [];
x = [, 0, 0, 0];
index = 0;
count = 1;
auto = false;
Round = 0;
win = messageWin = false;
cl = ["#FFD700", "#00FF00", "#FF1493", "#87CEEB", "#FFA500", "#FF69B4", "#7CFC00", "#00FFFF", "#FFE4B5", "#20B2AA", "#F08080"];

Xstart = Xend = 0;
touchCheck = false;
speedAuto = 1;

var auto_im = new Image();
auto_im.src = "assets/images/auto.png";

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        // document.body.appendChild(this.canvas);

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
            if (auto) {
                speedAuto++;
                return;
            }
            touchCheck = true;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            if (x <  1.5 * this.getWidth() && y < this.getWidth())
                this.autoSolve();
            if (x > gameWidth - 2 * this.getWidth()  && y < this.getWidth())
                this.newN(++N);
            
            Xstart = this.getCol(x);
        })

        document.addEventListener("mousemove", evt => {
            if (auto)
                return;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            if (touchCheck && A[Xstart].length > 0) {
                this.rec[A[Xstart][A[Xstart].length - 1]].y = y;
                this.rec[A[Xstart][A[Xstart].length - 1]].x = x;
            }
        })

        document.addEventListener("mouseup", evt => {
            touchCheck = false;
            if (auto)
                return;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            Xend = this.getCol(x);
            this.move(Xstart, Xend);
        })
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            if (auto)
                return;
            var x = evt.touches[0].pageX - (document.documentElement.clientWidth - gameWidth) / 2;
            var y = evt.touches[0].pageY;
            Xend = this.getCol(x);
            if (touchCheck && A[Xstart].length > 0) {
                this.rec[A[Xstart][A[Xstart].length - 1]].y = y;
                this.rec[A[Xstart][A[Xstart].length - 1]].x = x;
            }
        })

        document.addEventListener("touchstart", evt => {
            if (auto) {
                speedAuto ++;
                return;
            }
            touchCheck = true;
            var x = evt.touches[0].pageX - (document.documentElement.clientWidth - gameWidth) / 2;
            var y = evt.touches[0].pageY;
            if (x <  1.5 * this.getWidth() && y < this.getWidth())
                this.autoSolve();
            Xstart = Xend = this.getCol(x);
        })

        document.addEventListener("touchend", evt => {   
            if (auto)
                return;
            this.move(Xstart, Xend);
            touchCheck = false;
        })

        this.context.restore();
    }

    move(start, end) {
        if (A[start].length <= 0)
            return;
        if (A[start][A[start].length - 1] > A[end][A[end].length - 1] || start == end) {
            this.rec[A[start][A[start].length - 1]].y = gameHeight - this.getWidth() / 2 - (A[start].length) * this.getWidth();
            this.rec[A[start][A[start].length - 1]].x = x[start];
            return;
        }
            
        this.rec[A[start][A[start].length - 1]].y = gameHeight - this.getWidth() / 2 - (A[end].length + 1) * this.getWidth();
        this.rec[A[start][A[start].length - 1]].x = x[end];
        A[end][A[end].length] = A[start][A[start].length - 1];
            A[start] = A[start].slice(0, A[start].length - 1);
        Round++;
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30 / speedAuto);
    }

    update() {
        if (auto && count % 30 == 0) {
            if (index < B.length)
                this.move(B[index].s, B[index].e);
            index++;
        }
        count++;
        if (messageWin && win && count++ > 0) {
            let evalute = (Round == B.length) ? "Hoàn hảo" : (Round / B.length < 1.6) ? "Tốt" : "Cần cố gắng thêm";
            if (!auto)
                window.alert("Bạn đã thắng!\n" + "N = " + N + "\nSố bước: " + Round + "\nĐánh giá: " + evalute + "\nSố bước ít nhất: "+B.length);
            else
                window.alert("Quá trình auto đã hoàn tất");
            win = auto = false;
            speedAuto = 1;
            this.newN(N);
        }
            
        if (A[1].length + A[2].length == 0 && !messageWin) {
            win = messageWin = true;
            count = -10 * speedAuto;
        }
        this.render();
    }

    render() {
        if (gameWidth != document.documentElement.clientWidth || gameHeight != document.documentElement.clientHeight) {
            this.canvas.height = document.documentElement.clientHeight;
            this.canvas.width = document.documentElement.clientWidth;
            gameWidth = this.canvas.width;
            gameHeight = this.canvas.height;
            this.newN(N);
            gameWidth++;
            x[2] = gameWidth / 2;
            x[1] = gameWidth / 2 - gameWidth / 3;
            x[3] = gameWidth / 2 + gameWidth / 3;
            this.rec = [];
            for (let i = 0; i < N; i++)
                this.rec[N - i] = new rectangle(this, x[1], gameHeight - this.getWidth() / 2 - this.getWidth() * (i + 1), gameWidth / 3 - i * ((gameWidth / 3 - 1.5 * this.getWidth()) / (N - 1)), cl[i], N - i);
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 1; i <= N; i++)
            this.rec[i].draw(); 
        this.drawIcon();
    }

    drawIcon() {
        this.context.textAlign = "center";
        this.context.font = this.getWidth() / 3 + 'px NVNPixelFJVerdana8pt';
        this.context.fillStyle = "green";
        this.context.fillRect(gameWidth  - 1.7 * this.getWidth(), 0, 1.7 * this.getWidth(), this.getWidth());
        this.context.fillStyle = "#ffffff";
        this.context.fillText("Round: " + Round, gameWidth / 2, this.getWidth() / 1.5);
        this.context.fillText("N = " + N, gameWidth  - 1.5 * this.getWidth() / 2, this.getWidth() / 1.5);
        this.context.drawImage(auto_im, 0, 0, this.getWidth() * 1.5, this.getWidth());
    }

    clearScreen() {
        this.context.clearRect(0, 0, gameWidth, gameHeight);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0 , 0, gameWidth, gameHeight);
        this.context.fillStyle = '#454545';
        for (let i = 1; i <= 3; i++) {
            this.context.beginPath();
            this.context.arc(x[i], 2 * this.getWidth(), this.getWidth() / 4, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath()

            this.context.fillRect(x[i] - this.getWidth() / 4 , 2 * this.getWidth(), this.getWidth() / 2, gameHeight);
        }
        this.context.fillRect(0 , gameHeight - this.getWidth(), gameWidth, this.getWidth() * 1.1);
    }
    getWidth() {
        var area = gameWidth * gameHeight;
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
        if (x < gameWidth / 3)
            return 1;
        if (x < 2 * gameWidth / 3)
            return 2;
        return 3;
    }

    autoSolve() {
        messageWin = false;
        A[1] = [];
        A[2] = [];
        A[3] = [];
        for (let i = 0; i < N; i++)
            A[1][i] = N - i;
        count = 1;
        auto = true;
        Round = 0;
        gameWidth--;
        index = 0;
    }

    newN(n) {
        messageWin = false;
        N = n;
        if (N >= 10)
            N = 3;
        A[1] = [];
        A[2] = [];
        A[3] = [];
        for (let i = 0; i < N; i++)
            A[1][i] = N - i;
        B = [];
        index = Round = count = 0;
        this.solve(1, 3, N);
        A[1] = [];
        A[2] = [];
        A[3] = [];
        for (let i = 0; i < N; i++)
            A[1][i] = N - i;
        win = false;
        gameWidth--;
    }
}

var g = new game();