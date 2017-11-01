/**
 * Created by yangbing on 2017/11/1.
 */
import Vue from 'vue'
import vueValidate from 'vue-validate'
window.Vue = Vue;
Vue.use(vueValidate);

export default new vueValidate.Validator({
    rule:{
        name:{
            required:true,
            maxLength:10,
            minLength:2
        }
    },
    message:{
        name:{
            required:'bi'
        }
    }
})