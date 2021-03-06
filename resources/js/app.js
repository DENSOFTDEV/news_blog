

require('./bootstrap');

window.Vue = require('vue');

//editor
import 'v-markdown-editor/dist/index.css';
import Editor from 'v-markdown-editor'

Vue.use(Editor)

//Support vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from './store/index'

const  store = new Vuex.Store(
    storeData
)

//support moment js
import {filter} from './filter'


//vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//v-form
import {routes} from './routes';

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('admin-main', require('./components/admin/AdminMaster.vue').default);
Vue.component('home-main', require('./components/public/PublicMaster.vue').default);

import { Form, HasError, AlertError } from 'vform'

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

//sweet alert 2
import swal from 'sweetalert2'


window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.toast = toast;


const router = new VueRouter({
    routes,
    mode: 'hash'
})




const app = new Vue({
    el: '#app',
    router,
    store
});
