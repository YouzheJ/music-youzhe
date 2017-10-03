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
      }
      drawCurve()
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