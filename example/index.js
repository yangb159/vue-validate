/**
 * Created by yangbing on 2017/11/1.
 */
import 'babel-polyfill'
import App from './app.vue'
import Vue from 'vue'
import validator from './validator'

new Vue({
    el:'#app',
    validator,
    render:h=>h(App)
});
