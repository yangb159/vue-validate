/**
 * Created by yangbing on 2017/10/30.
 */
import {forEachValue, isEmptyObj, isNumber} from './utils'
import applyMixin from './mixin'
import {
    Required,
    RangeLength,
    MaxLength,
    MinLength,
    MaxNumber,
    MinNumber,
    RangeNumber,
    Cellphone
} from './validateHandler'

let Vue;

export class Validator {
    constructor(opts = {}) {
        //Auto install Vue
        if (!Vue && typeof window !== 'undefined' && window.Vue) {
            install(window.Vue)
        }

        this._rule = Object.create(null);
        this._message = Object.create(null);
        this._subscribers = [];


        const {rule, message} = opts;
        const validator = this;
        if (!isEmptyObj(rule)) {
            this._rule = rule;
            // get default message and mixin user's message
            const defaultMessage = getDefaultMessage(opts);
            const _message = {};
            forEachValue(rule, function (value, key) {
                _message[key] = !isEmptyObj(message) && message[key]
                    ? Object.assign({}, defaultMessage, message[key])
                    : Object.assign({}, defaultMessage);
            });
            this._message = _message;

            // add result for rules
            forEachValue(rule, function (value, key) {
                validator[key] = {error: false, success: false, message: ''};
            });

            //bind instance of vue to be reactive
            this._watcherVM = new Vue({data: {$$validator: validator}});
        }
        const {validate, validateAll} = this;

        this.validate = function boundValidate(key, val) {
            return validate.call(validator, key, val)
        };
        this.validateAll = function boundValidateAll(key, val) {
            return validateAll.call(validator, key, val)
        };
    }


    validate(key, val) {
        const rule = this._rule ? this._rule[key] : {};
        if (isEmptyObj(rule)) return;
        let re = true;
        if (re && rule.required) {
            re = Required(val, key, this);
        }

        if (re && rule.maxLength > 0 && rule.minLength > 0) {
            let {maxLength = 1, minLength = 1} = rule;
            re = RangeLength(val, key, minLength, maxLength, this);
        } else if (re && rule.maxLength > 0) {
            let {maxLength} = rule;
            re = MaxLength(val, key, maxLength, this);
        } else if (re && rule.minLength > 0) {
            let {minLength} = rule;
            re = MinLength(val, key, minLength, this);
        }


        if (re && isNumber(rule.min) && isNumber(rule.max)) {
            let {min, max} = rule;
            re = RangeNumber(val, key, min, max, this);
        } else if (re && isNumber(rule.min)) {
            let {min} = rule;
            re = MinNumber(val, key, min, this);
        } else if (re && isNumber(rule.max)) {
            let {max} = rule;
            re = MaxNumber(val, key, max, this);
        }

        if (re && rule.cellphone) {
            re = Cellphone(val, key, this);
        }


        if (re && rule.custom && typeof rule.custom === 'function') {
            rule.custom.call(this, val, key)
        }

        return re

    }

    validateAll() {

    }

    config(key, value) {

    }


}

function getDefaultMessage(opts) {
    let {defaultMessage} = opts;
    const _defaultMessage = {
        required: '该项为必填项',
        maxLength: '最多输入{maxLength}个字符',
        minLength: '最少输入{minLength}个字符',
        rangeLength: '请输入{minLength}-{maxLength}个字符',
        max: '请输入小于{max}的数值',
        min: '请输入大于{min}的数值',
        rangeNumber: '请输入{min}-{max}之间的数值',
        cellphone: '请输入正确的手机号',
        email: '请输入正确格式的电子邮件',
        regexp: '您输入的格式不正确',
        number: '请输入合法的数字',
        url: '请输入正确的网址',
        custom: '请输入正确的值'
    };
    return Object.assign({}, _defaultMessage, defaultMessage)
}


export function install(_Vue) {
    if (Vue && _Vue === Vue) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[vuex] already installed. Vue.use(Validate) should be called only once.'
            )
        }
        return
    }
    Vue = _Vue;
    applyMixin(Vue);
}