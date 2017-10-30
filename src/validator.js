/**
 * Created by yangbing on 2017/10/30.
 */


let Vue ;
export class Validator{
    constructor(opts ={}){
        //Auto install Vue
        if(!Vue&&typeof window!=='undefined'&&window.Vue){
            install(window.Vue)
        }
        const {rule,message,defaultMessage} = opts;
        const _defaultMessage = {
            required:'该项为必填项',
            maxLength:'请输入{minLength}-{maxLength}个字符',
            minLength:'请输入{minLength}-{maxLength}个字符',
            max:'请输入{min}-{max}之间的数值',
            min:'请输入{min}-{max}之间的数值',
        };
        this._rule = rule;
        this._message = message

    }
    validate(key,val){

    }
    validateAll(){

    }

}