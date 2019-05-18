import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/test'
  }, {
    path: '/test',
    name: 'Test',
    component: resolve => require(['@/views/Test.vue'], resolve)
  }, {
    path: '/home',
    name: 'Home',
    component: resolve => require(['@/views/Home.vue'], resolve)
  }, {
    path: '/basic',
    name: 'Basic',
    component: resolve => require(['@/views/Basic.vue'], resolve)
  }, {
    path: '/comform',
    name: 'Comform',
    component: resolve => require(['@/views/Comform.vue'], resolve)
  }, {
    path: '/alter',
    name: 'Alter',
    component: resolve => require(['@/views/Alter.vue'], resolve)
  }]
})
