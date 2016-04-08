//main.js库
//构成一个starObj星星对象
function starObj (){
    this.x;
    this.y;
    this.picNo;
    this.timer;
    this.xSpd;
    this.ySpd;
}
//创建starObj的初始化方法 init
starObj.prototype.init = function(){
    this.x = Math.random()*600 + 100;
    this.y = Math.random()*300 + 150;
    this.picNo =Math.floor(Math.random()*7 +0.3);
    this.timer = 0;
    this.ySpd = Math.random() * 3 - 1.5; //x轴方向的速度
    this.xSpd = Math.random() * 3 - 1.5; //y轴方向的速度

    //鼠标监听事件

    document.addEventListener("mousemove",mousemove,false);
}

//星星闪动：让星星那张图片循环播放
starObj.prototype.updata = function () {


    this.x += this.xSpd * deltaTime * 0.004; //x轴运动
    this.y += this.ySpd * deltaTime * 0.004; //y轴运动

    //this.x 边界判断

    if (this.x < 93 || this.x > 693) {
        this.init();
    };

    //this.y边界判断
    if (this.y < 147 ||  this.y > 443) {
        this.init();
    };

    this.timer += deltaTime;
    if (this.timer > 50) {
        this.picNo += 1;
        if (this.picNo >= 7) {
            this.picNo = 0;
        };
        this.timer = 0;
    };
}
//创建starObj的初始化方法 draw
starObj.prototype.draw =function(){

    context.save();
    context.globalAlpha = life;  //实现星星的显示和隐藏
    context.drawImage(starPic, this.picNo*7, 0, 7, 7, this.x, this.y, 7, 7);
    context.restore();
}

function drawStars(){
    for (var i = 0; i < num; i++) {
        stars[i].updata();
        stars[i].draw();
    };
}

function mousemove (e) {
    if (e.offsetX || e.layerX) {
        var px = e.offsetX == undefined ? e.layerX : e.offsetX;
        var py = e.offsetY == undefined ? e.layerY :e.offsetY;

        //如果鼠标在范围内switchy = true，否则switchy = false
        if (px > 100 && px < 700 && py > 150 && py < 450 ) {
            switchy = true;
        }
        else{
            switchy = false;
        };



    };
}

//控制当鼠标在区域内星星显示，离开时消失：

//星星的显示和隐藏用canvas里的gobalAlpha API 透明度实现的，
//将gobalAlpha的值变成变量（life），而变量life的值时根据鼠标何时再范围内来确定（当switchy = true 时，即在范围内时星星显示（透明度！=0），否侧星星不显示（透明=0））
function aliveStar () {
    if (switchy) {
        life +=  0.03 * deltaTime * 0.01;
        if (life > 1) {
            life = 1;
        };

    }else{
        life -=  0.03 * deltaTime * 0.01;
        if (life < 0) {
            life = 0;
        };
    };
}