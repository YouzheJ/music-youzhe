import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Player from '@/components/Player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/music',
      name: 'Player',
      component: Player
    }
  ]
})
