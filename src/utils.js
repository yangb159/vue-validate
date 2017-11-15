/**
 * Created by yangbing on 2017/10/30.
 */

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function isNumber(num) {
    return num !== null && !isNaN(num)
}

export function isEmptyObj(obj) {
    for (let i in obj) {
        return false
    }
    return true
}

export function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function trim(str) {
    return (str + '').replace(/(^\s*)|(\s*$)/g, '')
}

export function replaceAll(str, target) {
    return (str + '').replace(/{(\w+)}/g, function (word, key) {
        return target && target.hasOwnProperty(key) ? target[key] : word
    })
}
export function toString(value) {
    return value !== null && typeof value !== 'undefined' ? value + '' : ''
}

export function toNumber(value) {
    return value !== null && typeof value !== 'undefined' && !isNaN(value) ? Number(value) : 0
}
export function setStatus(Validator, key, Boolean = true, msg = null) {
    if (Validator.hasOwnProperty(key)) {
        Validator[key].error = !Boolean;
        Validator[key].success = Boolean;
        Validator[key].message = Boolean ? '' : msg;
    }
}