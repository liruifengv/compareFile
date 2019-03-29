// 对数字进行四舍五入
function fixedNumber(val,formatter) {
    if(typeof val == 'string') {
        return val;
    }
    var _formatter = Math.pow(10,Number(formatter))
    if(formatter === '0') {
        _formatter = 1
    }
    if(val > 0) {
        var _val = Math.round(_numberMul(val,_formatter)) / _formatter
    } else {
        var _val = _numberSub(0, val);
        _val = _numberSub(0, Math.round(_numberMul(_val,_formatter)) / _formatter)
    }
    return _val;
}
// 浮点数相乘
function _numberMul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 浮点数相加
function _numberAdd(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (_numberMul(a, e) + _numberMul(b, e)) / e;
}
// 浮点数相减
function _numberSub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (_numberMul(a, e) - _numberMul(b, e)) / e;
}

// 浮点数相除
function _numberDiv(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), _numberMul(c / d, Math.pow(10, f - e));
}