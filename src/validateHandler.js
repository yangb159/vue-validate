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
        let _message = len >= min
            ? Validator._message[key].maxLength
            : Validator._message[key].minLength;
        let msg = replaceAll(_message, {minLength: min, maxLength: max});
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