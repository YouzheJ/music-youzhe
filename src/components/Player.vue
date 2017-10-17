<template>
  <div class="player">
    <header class="header">
      <h3>MUSIC YOUZHE</h3>
    </header>
    <section>
      <div class="content">
        <canvas id="canvas"/>
      </div>
    </section>
    <footer class='footer'>
      footer
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'player',
    data () {
      return {
        msg: ''
      }
    },
    mounted () {
      const initCanvas = () => {
        const canvas = document.getElementById('canvas')
        const content = canvas.parentNode
        const width = content.offsetWidth // 背景画布的宽度
        const height = content.offsetHeight // 背景画布的高度
        const LENGTH = 100 // 横坐标的取点数
        const step = width / LENGTH // 两点之间的间隔
        const SPEED = 0.05 // 移动速度
        let xOffset = 0
        // const T = width * 4 / 3 // 周期
        const w = 1 / (width * 4 / 3) * 2 * Math.PI
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#f3f3f3' // 背景的颜色
        ctx.fillRect(0, 0, width, height) // 初始化背景
        const curve1 = new Curve(ctx, width - 50, height, 120, w / 2, 300)
        const curve2 = new Curve(ctx, width - 200, height, 30, w, 300)
        const curve3 = new Curve(ctx, width - 120, height, 50, w / 3, 300)
        const curve4 = new Curve(ctx, width - 140, height, 50, w * 0.8, 320)
        const curve5 = new Curve(ctx, width - 130, height, 50, w * 1.2, 290)
        setInterval(() => { // 开始绘制
          drawCanvas(ctx, [curve1, curve2, curve3, curve4, curve5], width, height, step, LENGTH, xOffset)
          xOffset += SPEED
        }, 16)
      }
      const drawCanvas = (ctx, curves, width, height, step, LENGTH, xOffset) => { // 绘制内容
        ctx.clearRect(0, 0, width, height)
        curves.map((curve, i) => {
          curve.drawCurve(step, LENGTH, xOffset)
        })
      }
      class Curve {
        constructor (ctx, width, height, h, w, b) {
          this.ctx = ctx // 背景canvas
          this.width = width // 横标的总长
          this.height = height // 纵坐标的总长
          this.h = h // 决定曲线高度
          this.w = w // 决定波长
          this.b = b // 上下偏移量
          this.canVirtual = document.createElement('canvas')
          this.canVirtual.width = width
          this.canVirtual.height = height
          this.ctxVir = this.canVirtual.getContext('2d')
        }
        drawCurve = (step, len, xOffset) => {
          // console.log('draw')
          this.ctxVir.clearRect(0, 0, this.width, this.height)
          this.ctxVir.beginPath()
          let x = 0
          // let y = 50 * Math.sin(x / T * 2 * Math.PI + xOffset) + 200
          let y = this.sin(x, xOffset)
          this.ctxVir.moveTo(x, y)
          for (let i = 0; i < len; i++) {
            x += step
            // y = 50 * Math.sin(x / T * 2 * Math.PI + xOffset) + 200
            y = this.sin(x, xOffset)
            this.ctxVir.lineTo(x, y)
          }
          this.ctxVir.strokeStyle = '#06e9a3'
          this.ctxVir.stroke()
          this.ctx.drawImage(this.canVirtual, 0, 0)
        }
        sin (x, f) {
          return this.h * Math.sin(x * this.w + f) + this.b
        }
      }
      initCanvas()
      // const LENGTH = 100
      // const step = width / LENGTH
      // const SPEED = 0.05
      // let xOffset = 0
      // const T = width * 4 / 3
      // const canVirtual = document.createElement('canvas')
      // canVirtual.width = width
      // canVirtual.height = height
      // const ctxVir = canVirtual.getContext('2d')
      // const drawCurve = (step, len, xOffset) => {
      //   // console.log('draw')
      //   ctxVir.beginPath()
      //   let x = 0
      //   let y = 50 * Math.sin(x / T * 2 * Math.PI + xOffset) + 200
      //   ctxVir.moveTo(x, y)
      //   for (let i = 0; i < len; i++) {
      //     x += step
      //     y = 50 * Math.sin(x / T * 2 * Math.PI + xOffset) + 200
      //     ctxVir.lineTo(x, y)
      //   }
      //   // ctxVir.moveTo(0, 300)
      //   // ctxVir.bezierCurveTo(300, 300, width - 300, height - 100, width, height - 200)
      //   ctxVir.strokeStyle = '#06e9a3'
      //   ctxVir.stroke()
      //   ctx.drawImage(canVirtual, 0, 0)
      // }
    }
  }
  /*
  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');
  var range = document.getElementById('r');
  //range控件信息
  var rangeValue = range.value;
  var nowRange = 0; //用于做一个临时的range
  //画布属性
  var mW = canvas.width = 250;
  var mH = canvas.height = 250;
  var lineWidth = 2;
  //圆属性
  var r = mH / 2; //圆心
  var cR = r - 16 * lineWidth; //圆半径
  //Sin 曲线属性
  var sX = 0;
  var sY = mH / 2;
  var axisLength = mW; //轴长
  var waveWidth = 0.015; //波浪宽度,数越小越宽
  var waveHeight = 6; //波浪高度,数越大越高
  var speed = 0.09; //波浪速度，数越大速度越快
  var xOffset = 0; //波浪x偏移量
  ctx.lineWidth = lineWidth;
  //画圈函数
  var IsdrawCircled = false;
  var drawCircle = function(){
   ctx.beginPath();
   ctx.strokeStyle = '#1080d0';
   ctx.arc(r, r, cR+5, 0, 2 * Math.PI);
   ctx.stroke();
   ctx.beginPath();
   ctx.arc(r, r, cR, 0, 2 * Math.PI);
   ctx.clip();
  }
  //画sin 曲线函数
  var drawSin = function(xOffset){
   ctx.save();
   var points=[]; //用于存放绘制Sin曲线的点
   ctx.beginPath();
   //在整个轴长上取点
   for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
    //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
    var y = -Math.sin((sX + x) * waveWidth + xOffset);
    var dY = mH * (1 - nowRange / 100 );
    points.push([x, dY + y * waveHeight]);
    ctx.lineTo(x, dY + y * waveHeight);
   }
   //封闭路径
   ctx.lineTo(axisLength, mH);
   ctx.lineTo(sX, mH);
   ctx.lineTo(points[0][0],points[0][1]);
   ctx.fillStyle = '#1c86d1';
   ctx.fill();
   ctx.restore();
  };
  //写百分比文本函数
  var drawText = function(){
   ctx.save();
   var size = 0.4*cR;
   ctx.font = size + 'px Microsoft Yahei';
   ctx.textAlign = 'center';
   ctx.fillStyle = "rgba(06, 85, 128, 0.8)";
   ctx.fillText(~~nowRange + '%', r, r + size / 2);
   ctx.restore();
  };
  var render = function(){
   ctx.clearRect(0, 0, mW, mH);
   rangeValue = range.value;
   if(IsdrawCircled == false){
    drawCircle();
   }
   if(nowRange <= rangeValue){
    var tmp = 1;
    nowRange += tmp;
   }
   if(nowRange > rangeValue){
    var tmp = 1;
    nowRange -= tmp;
   }
   drawSin(xOffset);
   drawText();
   xOffset += speed;
   requestAnimationFrame(render);
  }
  render();
  */
</script>

<style scoped lang="scss">
@import '../../static/scss/variable';
  h3 {
    margin: 0;
  }
  .player {
    width: 100%;
    height: 100%;
    background: $bg;
  }
  .header {
    background: $bg_g;
    color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    height: 48px;
    h3 {
      text-align: left;
      padding: 10px 20px;
      font-size: 24px;
    }
  }

  section {
    height: 100%;
    box-sizing: border-box;
    padding: 48px 0;
    .content {
      height: 100%;
    }
  }
  .footer {
    background: $bg_b_30;
    width: 100%;
    height: 48px;
    line-height: 48px;
    position: fixed;
    bottom: 0;
  }
</style>