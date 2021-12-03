var canvas = document.querySelector('canvas');
// var context = document.getElementById('context').getContext("2d");
var ctx = canvas.getContext('2d'); // tạo ra 1 vùng vẽ

var width = canvas.width = window.innerWidth; // các biến chiều rộng chiều cao ngẫu nhiên
var height = canvas.height = window.innerHeight;

// var width = 125;
// var width = 105;
// var padding = 20;

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min; // nhận 2 số và trả về 2 số ngẫu nhiên
    return num;
}
random(1, 10);

function Ball(x, y, velX, velY, color, size) {
    this.x = x; // tạo tọa độ của quả bóng
    this.y = y;
    this.velX = velX; //vận tốc di chuyển của quả bóng theo phương ngang và thẳng
    this.velY = velY;
    this.color = color; //tạo màu
    this.size = size; //tạo kích thước của quả bóng
}
Ball.prototype.draw = function() { //hàm này dùng để vẽ ra quả bóng
    // context.beginPath();
    ctx.beginPath();
    ctx.fillStyle = this.color; //tạo màu của quả bóng
    // context.lineTo(padding + width, height + padding);
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //tạo kích thước của quả bóng
    ctx.fill();
    // context.closePath();
}
var testBall = new Ball(50, 100, 4, 4, '#bada55', 10);
testBall.x //gọi các thuộc tính của nó
testBall.size
testBall.color
testBall.draw() //để vẽ quả bóng trên canvan
Ball.prototype.update = function() { //kiểm tra hướng đi và tọa độ của quả bóng
    if ((this.x + this.size) >= width) { //kiểm tra x > VelX đi lệch trái
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) { //kiểm tra x < 0
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) { // kiểm tra y > velY bóng đi ra khỏi mép dưới
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) { //kiểm tra y < 0 
        this.velY = -(this.velY);
    }

    this.x += this.velX; //thêm giá trị velX vào tọa độ x và giá trị velY vào tọa độ y
    this.y += this.velY;
}
Ball.prototype.collisionDetect = function() { // dùng vòng lặp for để lặp lại tất cả các mảng của quả bóng,
    // và dùng câu lệnh if để kiểm tra xem quả bóng hiện tại dang được lặp có giống với quả bóng mà chúng ta đang kiểm tra hay không
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}
var balls = [];

function loop() {
    //ham loop()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //tạo màu
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) { //và sử dụng 1 thuật toán để kiểm tra sự va chạm giữa hai vòng tròn và kiểm tra bất kỳ khu vực nào của 2 vòng tròn trùng nhau hay không, 
        //và 2 vòng tròn sẽ sinh ra 1 màu ngẫu nhiên mới
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(5, 10)
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) { //lặp lại tất cả quả bóng trong mảng 
        balls[i].draw(); //--->
        balls[i].update(); //--->
        balls[i].collisionDetect(); //--->
    }

    requestAnimationFrame(loop); //---> mượt
}
loop();