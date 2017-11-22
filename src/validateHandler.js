/**
 * Created by yangbing on 2017/10/31.
 */
import {trim, replaceAll,toString,toNumber,setStatus} from './utils'

export function Required(value, key, Validator) {
    if (trim(toString(value)).length == 0) {
        let msg = Validator._message[key].required || '';
        setStatus(Validator,key,false,msg);
        return false
    } else {
        setStatus(Validator,key);
        return true
    }
}

export function MaxLength(value,key,max,Validator) {
    let len = toString(value).length;
    if (len <= max) {
        setStatus(Validator,key);
        return true
    } else {
        let _message = Validator._message[key].maxLength;
        let msg = replaceAll(_message, {maxLength: max});
        setStatus(Validator,key,false,msg);
        return false
    }
}

export function MinLength(value,key,min,Validator) {
    let len = toString(value).length;
    if (len >= min) {
        setStatus(Validator,key);
        return true
    } else {
        let _message = Validator._message[key].minLength;
        let msg = replaceAll(_message, {minLength: min});
        setStatus(Validator,key,false,msg);
        return false
    }
}

export function RangeLength(value, key, min, max, Validator) {
    let len = toString(value).length;
    if (len >= min && len <= max) {
        setStatus(Validator,key);
        return true
    } else {
        let _message = Validator._message[key].rangeLength;
        let msg = replaceAll(_message, {minLength: min, maxLength: max});
        setStatus(Validator,key,false,msg);
        return false
    }
}

export function MaxNumber(value,key,max,Validator) {
    let val = toNumber(value);
    if (val <= max) {
        setStatus(Validator,key);
        return true
    } else {
        let _message = Validator._message[key].max;
        let msg = replaceAll(_message, {max: max});
        setStatus(Validator,key,false,msg);
        return false
    }
}

export function MinNumber(value,key,min,Validator) {
    let val = toNumber(value);
    if (val >= min) {
        setStatus(Validator,key);
        return true
    } else {
        let _message = Validator._message[key].max;
        let msg = replaceAll(_message, {max: min});
        setStatus(Validator,key,false,msg);
        return false
    }
}

export function RangeNumber(value, key, min, max, Validator) {
    let val = toNumber(value);
    if(val>=min&&val<=max){
        setStatus(Validator,key);
        return true
    }else{
        let _message = val >= min
            ? Validator._message[key].max
            : Validator._message[key].min;
        let msg = replaceAll(_message, {min: min, max: max});
        setStatus(Validator,key,false,msg);
        return false
    }
}

export function Cellphone(value, key, Validator) {
    if (/^1[0-9]{10}$/.test(trim(value))) {
        setStatus(Validator,key);
        return true
    } else {
        let msg = Validator._message[key].cellphone || '';
        setStatus(Validator,key,false,msg);
        return false
    }
}