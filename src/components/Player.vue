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
      const canvas = document.getElementById('canvas')
      const content = canvas.parentNode
      const width = content.offsetWidth
      const height = content.offsetHeight
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#f3f3f3'
      ctx.fillRect(0, 0, width, height)
      const drawCurve = () => {
        console.log('draw')
        ctx.beginPath()
        ctx.moveTo(0, 300)
        ctx.bezierCurveTo(300, 300, width - 300, height - 100, width, height - 200)
        ctx.strokeStyle = '#06e9a3'
        ctx.stroke()
      }
      setInterval(() => {
        ctx.clearRect(0, 0, width, height)
        drawCurve()
      }, 40)
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