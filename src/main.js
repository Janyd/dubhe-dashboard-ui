import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import VueHighlightJS from 'vue-highlightjs'

import '@/icons' // icon
import '@/permission' // permission control
import formCreate from "@form-create/element-ui"
import '@/utils/filter'
import '@/components/index'
import 'highlight.js/styles/atom-one-dark.css'
import VueSocketIO from 'vue-socket.io'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(formCreate)
Vue.use(VueHighlightJS)
Vue.use(new VueSocketIO({
    debug     : true,
    connection: 'http://localhost:8000',
    vuex      : {
        store,
        actionPrefix  : 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options   : { path: '/api/socket.io/', transports: ['websocket'] }
}))

Vue.config.productionTip = false

new Vue({
    el    : '#app',
    router,
    store,
    render: h => h(App)
})
