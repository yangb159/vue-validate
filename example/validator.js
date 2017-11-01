/**
 * Created by yangbing on 2017/11/1.
 */
import Vue from 'vue'
import vueValidate from 'vue-validate'

Vue.use(vueValidate);

export default new vueValidate.Validator({
    rule:{
        title:{
            required:true,
            maxLength:10,
            minLength:2
        }
    },
    message:{
        title:{
            required:'必填项'
        }
    }
})