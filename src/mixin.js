/**
 * Created by yangbing on 2017/10/30.
 */
export default function (Vue) {
    const version = Number(Vue.version.split('.')[0]);
    if (version >= 2) {
        // for 2.x
        Vue.mixin({beforeCreate: validatorInit})
    } else {
        // for 1.x
    }

    function validatorInit() {
        const options = this.$options;
        if (options.validator) {
            this.$validator = typeof options.validator === 'function'
                ? options.validator()
                : options.validator
        }else if(options.parent&&options.parent.$validator){
            this.$validator = options.parent.$validator
        }
    }
}