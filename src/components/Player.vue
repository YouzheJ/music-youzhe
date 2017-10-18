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
        const SPEED = 0.025 // 移动速度
        let xOffset = 0
        // const T = width * 4 / 3 // 周期
        const w = 1 / (width * 4 / 3) * 2 * Math.PI
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#000' // 背景的颜色
        ctx.fillRect(0, 0, width, height) // 初始化背景
        const curve1 = new Curve(ctx, width - 50, height, getColor(), 120, w / 2, 300)
        const curve2 = new Curve(ctx, width - 200, height, getColor(), 30, w, 300)
        const curve3 = new Curve(ctx, width - 120, height, getColor(), 50, w / 3, 300)
        const curve4 = new Curve(ctx, width - 140, height, getColor(), 50, w * 0.8, 320)
        const curve5 = new Curve(ctx, width - 130, height, getColor(), 50, w * 1.2, 290)
        setInterval(() => { // 开始绘制
          drawCanvas(ctx, [curve1, curve2, curve3, curve4, curve5], width, height, step, LENGTH, xOffset)
          xOffset += SPEED
        }, 16)
      }
      const drawCanvas = (ctx, curves, width, height, step, LENGTH, xOffset) => { // 绘制内容
        ctx.clearRect(0, 0, width, height)
        ctx.fillRect(0, 0, width, height) // 绘制背景
        curves.map((curve, i) => {
          curve.drawCurve(step, LENGTH, xOffset)
        })
      }
      function getNum (max, min) { // 生成包含min 和 max的数
        return Math.round(Math.random() * (max - min) + min)
      }
      function getColor () { // 生成颜色
        let c0 = getNum(10, 45)
        let c1 = getNum(180, 240)
        let p = Math.random()
        return `rgb(${p < 0.5 ? c1 : c0}, ${p < 0.5 ? c1 : c0}, ${p < 0.5 ? c0 : c1})`
      }
      class Curve {
        constructor (ctx, width, height, color, h, w, b) {
          this.ctx = ctx // 背景canvas
          this.width = width // 横标的总长
          this.height = height // 纵坐标的总长
          this.color = color // 线条的颜色
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
          let y = this.sin(x, xOffset)
          this.ctxVir.moveTo(x, y)
          for (let i = 0; i < len; i++) {
            x += step
            y = this.sin(x, xOffset)
            this.ctxVir.lineTo(x, y)
          }
          // this.ctxVir.strokeStyle = '#06e9a3'
          this.ctxVir.strokeStyle = this.color
          this.ctxVir.lineWidth = 3
          this.ctxVir.stroke()
          this.ctx.drawImage(this.canVirtual, 0, 0)
        }
        sin (x, f) {
          return this.h * Math.sin(x * this.w + f) + this.b
        }
      }
      initCanvas()
      window.onresize = () => {
        // initCanvas()
      }
    }
  }
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