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
/*
 * @Author: liuzy
 * @Date:   2017-11-10 14:35:23
 * @Last Modified by:   lenovo
 * @Last Modified time: 2017-12-11 18:20:50
 */
/* eslint-disable */
/* 通用功能js框架 */
define(['jquery'], function ($) {
    var common = {
      // 获取url参数
      getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
      },
      // 成功提示
      successTips: function (msg, callback, title) {
        var _this = this;
        var titles = title == undefined ? '提示' : title;
        _this.alert(titles, msg || '操作成功', function () {
          typeof callback === 'function' && callback();
        }, { type: 'success', confirmButtonText: '确定' }, 1);
      },
      // 错误提示
      errorTips: function (msg) {
        var _this = this;
        _this.alert('错误', msg || '操作失败', function () {
          // after click the confirm button, will run this callback function
        }, { type: 'error', confirmButtonText: '确定' }, 2);
      },
      // 字段的验证，支持非空、手机、邮箱的判断
      validate: function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if (type === 'require') {
          return !!value;
        }
        // 数字验证
        if (type === 'number') {
            return /^[0-9]*$/.test(value);
        }
        // 两位小数
        if (type === 'float') {
            return /^\d+(\.\d{0,2})?$/.test(value);
        }
        // 个性账号验证
        if (type === 'account') {
          return /^[0-9a-zA-Z_]{1,}$/.test(value);
        }
        // 手机号验证
        if (type === 'phone') {
          return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value);
        }
        // 手机号验证
        if (type === 'wechat') {
          return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value);
        }
        // 电话号码验证
        if (type === 'mobile') {
            if (value.length === 0) {
                return true;
            } else {
                return /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9})|(\d{8})|(0\d{2,3}\d{7,8}))$/.test(value);
            }
        }
        // 邮箱格式验证
        if (type === 'email') {
          return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
        // 邮箱格式验证
        //      if ('email' === type) {
        //        return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z_-]+)+$/.test(value);
        //      }
        // 身份证号码验证
        if (type === 'idCard') {
          return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        }
        // 证件号码验证（只能英文和数字）
        if (type === 'cardNum') {
          return /^[A-Za-z0-9]+$/.test(value);
        }
        // 密码验证（至少为6位，字母和数字组合）
        if (type === 'password') {
          return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value);
        }
        // 社会信用代码验证 不小于18位的字母数字组合
        if (type === 'xydm') {
          return /(^[0-9A-Z]{15}$)|(^[0-9A-Z]{18}$)/.test(value);
        }
        // 国税 地税税号 不小于15位的字母数字组合
        if (type === 'gsds') {
          return /(^[0-9A-Z]{15,25}$)/.test(value);
        }
        // 两位小数金额验证
        if (type === 'money') {
          return /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/.test(value);
        }
        // 银行卡验证
        if (type === 'bank') {
            if (value.length === 0) {
                return true;
            } else {
                return /^([1-9]{1})(\d{14}|\d{18})$/.test(value);
            }
        }
      },
      // 调用alert插件
      alert: function (title, message, callback, opts, flag) {
        BeAlert.open(title, message, callback, opts, flag);
      },
      // 调用confirm插件
      confirm: function (title, message, callback, opts, flag) {
        opts = $.extend({ type: 'question', showCancelButton: true }, opts);
        if (typeof callback === 'function') {
          BeAlert.open(title, message, callback, opts, flag);
        } else {
          return _confirm(title);
        };
      },
      // 调用Message插件
      message: function (title, message, callback, opts, flag) {
        BeMessage.open(title, message, callback, opts, flag);
      },
      /**
       * 时间戳转化为正常时间
       * @param {any} shijianchuo  时间戳 精确到毫秒
       * @returns 正常时间
       */
      toNormalTime: function (shijianchuo) {
        var _this = this;
        var time = new Date(parseInt(shijianchuo));
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + _this.add0(m) + '-' + _this.add0(d) + ' ' + _this.add0(h) + ':' + _this.add0(mm) + ':' + _this.add0(s);
      },
      add0: function (m) {
        return m < 10 ? '0' + m : m;
      },
      // 将正常时间转换成时间戳
      toTimestamp: function (timestr) {
        //   return new Date(timestr).setHours(0); //设置时间为一天开始
        return Date.parse(new Date(timestr)).toString() == 'NaN' ? 0 : Date.parse(new Date(timestr));
      },
      // 字符串转换成分割时间
      toReallyTime: function (stringtime) {
        var num;
        if (stringtime === '' || stringtime === null) {
          num = '';
        } else if (stringtime.length === 8) {
          var y = stringtime.substr(0, 4);
          var m = stringtime.substr(4, 2);
          var d = stringtime.substr(6, 2);
          return y + '-' + m + '-' + d;
        } else {
          var y = stringtime.substr(0, 4);
          var m = stringtime.substr(4, 2);
          return y + '-' + m;
        }
        return num;
      },
      // 截取时间
      toSubstringTime: function (stringtime) {
          var num;
          if (stringtime === '' || stringtime === null) {
              num = '';
          } else {
              num = stringtime.substr(0, 10);
          }
          return num;
      },
      // 分割时间转换成字符串，方便作比较
      toStringTime: function (stringtime) {
        var num;
        if (stringtime === '' || stringtime === null) {
          num = '';
        } else {
          var timestr = stringtime.split('-');
          if (timestr[1].length == 1) {
            timestr[1] = '0' + timestr[1];
          } else {
            timestr[1] = timestr[1];
          }
          if (timestr[2].length == 1) {
            timestr[2] = '0' + timestr[2];
          } else {
            timestr[2] = timestr[2];
          }
          num = timestr[0] + timestr[1] + timestr[2];
        }
        return num;
      },
      // 获取当前调用协议
      getProtocol: function () {
        var p = window.location.protocol + '//';
        return p;
      },
      // 获取域名
      getUrlArea: function () {
        var r = window.location.host;
        return r;
      },
      // 刷新当前页面
      replacelocalhost: function (url) {
        var base = document.getElementsByTagName('base')[0];
        if (base) {
          window.location.replace(base.getAttribute('href') + url);
        } else {
          window.location.replace(url);
        }
      },
      // 浮点数相减
      add: function (a, b) {
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
          return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
      },
      // 浮点数相减
      sub: function (a, b) {
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
          return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
      },
      // 浮点数相乘
      mul: function (a, b) {
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
      },
      // 浮点数相除
      div: function div(a, b) {
          var c, d, e = 0,
              f = 0;
          try {
              e = a.toString().split(".")[1].length;
          } catch (g) {}
          try {
              f = b.toString().split(".")[1].length;
          } catch (g) {}
          return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
      },
      /**
       * <p>
       * 将字符串转换为数字
       * </p>
       * @param val 要转换的值
       * @return
       * @author liruifeng 2018-10-17
      */
      toNumber: function (val) {
          var n = parseFloat(val)
          return isNaN(n) ? val : n
    },
    // 获取图片原始宽高
    getImgNaturalDimensions: function (img) {
      var nWidth, nHeight;
      if (img.naturalWidth) { // 现代浏览器
        nWidth = img.naturalWidth
        nHeight = img.naturalHeight
      } else { // IE6/7/8
        var image = new Image();
        image.src = img.src;
        image.onload = function () {
          nWidth = image.width
          nHeight = image.height
        }
      }
      return [nWidth, nHeight]
    },
    // 验证是否是javascript脚本
    isjavaScript:function(str) {
      var reg=/<script[^>]*?>.*?<\/script>/;   /*定义验证表达式*/
      return reg.test(str);     /*进行验证*/
      }
    };
  
    // alert&confirm插件
    var BeAlert = {
      defaultConfig: {
        width: 320,
        height: 170,
        timer: 0,
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      },
      html: '<div class="BeAlert_box">' +
        '<div class="BeAlert_header">提示</div>' +
        '<div class="BeAlert_image"></div>' +
        '<div class="BeAlert_text">' +
        '<div class="BeAlert_title"></div>' +
        '<div class="BeAlert_message"></div>' +
        '</div>' +
        '<div class="BeAlert_button">' +
        '<button class="BeAlert_confirm"></button>' +
        '<button class="BeAlert_cancel"></button>' +
        '</div>' +
        '</div>',
      overlay: '<div class="BeAlert_overlay"></div>',
      open: function (title, message, callback, o, flag) {
        var opts = {};
  
        var that = this;
        $.extend(opts, that.defaultConfig, o);
        $('body').append(that.html).append(that.overlay);
        var box = $('.BeAlert_box');
        box.css({
          'width': opts.width + 'px',
          'max-height': '90%',
          'margin-left': -(opts.width / 2) + 'px'
        });
        $('.BeAlert_image').addClass(opts.type);
        title && $('.BeAlert_title:last').html(title).show(), // 给最新弹出的弹框赋值
        message && $('.BeAlert_message:last').html(message).show();
        var confirmBtn = $('.BeAlert_confirm');
  
        var cancelBtn = $('.BeAlert_cancel');
        opts.showConfirmButton && confirmBtn.text(opts.confirmButtonText).show(),
        opts.showCancelButton && cancelBtn.text(opts.cancelButtonText).show();
        if (flag === 2) {
          var header = $('.BeAlert_header');
          header.css('background-color', '#ff7e0c');
          var confirm = $('.BeAlert_button button');
          confirm.css('background-color', '#ff7e0c');
        } else {
          var header = $('.BeAlert_header');
          header.css('background-color', '#0066cc');
          var confirm = $('.BeAlert_button button');
          confirm.css('background-color', '#0066cc');
          $('.BeAlert_box .BeAlert_button button.BeAlert_cancel').css('background-color', '#fff');
        }
        confirmBtn.unbind('click').bind('click', function (e) {
          that.close(e);
          typeof callback === 'function' && callback(true);
        });
        cancelBtn.unbind('click').bind('click', function (e) {
          that.close(e);
          typeof callback === 'function' && callback(false);
        });
        var h = box.height();
        box.css({
          'margin-top': -(Math.max(h, opts.height) / 2 + 50) + 'px'
        });
      },
      close: function (e) {
        var target = $(e.target) || $(e.srcElement); // 点击事件
        $(target).parents('.BeAlert_box').next('.BeAlert_overlay').remove(); // 关闭当前点击弹框的遮罩
        $(target).parents('.BeAlert_box').remove(); // 关闭当前点击的弹框
      }
    };
  
    // 消息弹出框插件
    var BeMessage = {
      defaultConfig: {
        width: 320,
        height: 170,
        timer: 0,
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      },
      html: '<div class="BeAlert_box">' +
        '<div class="BeAlert_header">系统提示</div>' +
        '<div class="BeAlert_text2">' +
        '<div class="BeAlert_title"></div>' +
        '<div class="BeAlert_message"></div>' +
        '</div>' +
        '<div class="BeAlert_button">' +
        '<button class="BeAlert_confirm"></button>' +
        '<button class="BeAlert_cancel"></button>' +
        '</div>' +
        '</div>',
      overlay: '<div class="BeAlert_overlay"></div>',
      open: function (title, message, callback, o, flag) {
        var opts = {};
  
        var that = this;
        $.extend(opts, that.defaultConfig, o);
        var $that = $(that.html);
        $('body').append($that).append(that.overlay);
        var box = $('.BeAlert_box');
        box.css({
          'width': opts.width + 'px',
          'max-height': '90%',
          'margin-left': -(opts.width / 2) + 'px'
        });
        $('.BeAlert_image').addClass(opts.type);
        title && $('.BeAlert_title:last').html(title).show(), // 给最新弹出的弹框赋值
        message && $('.BeAlert_message:last').html(message).show();
        var confirmBtn = $that.find('.BeAlert_confirm');
  
        var cancelBtn = $that.find('.BeAlert_cancel');
        opts.showConfirmButton && confirmBtn.text(opts.confirmButtonText).show(),
        opts.showCancelButton && cancelBtn.text(opts.cancelButtonText).show();
        if (flag === 2) {
          var header = $('.BeAlert_header');
          header.css('background-color', '#ff7e0c');
          var confirm = $('.BeAlert_button button');
          confirm.css('background-color', '#ff7e0c');
        } else {
          var header = $('.BeAlert_header');
          header.css('background-color', '#0066cc');
          var confirm = $('.BeAlert_button button');
          confirm.css('background-color', '#0066cc');
          $('.BeAlert_box .BeAlert_button button.BeAlert_cancel').css('background-color', '#fff');
        }
        confirmBtn.unbind('click').bind('click', function (e) {
          that.close(e);
          typeof callback === 'function' && callback(true);
        });
        cancelBtn.unbind('click').bind('click', function (e) {
          that.close(e);
          typeof callback === 'function' && callback(false);
        });
        var h = box.height();
        box.css({
          'margin-top': -(Math.max(h, opts.height) / 2 + 50) + 'px'
        });
      },
      close: function (e) {
        var target = $(e.target) || $(e.srcElement); // 点击事件
        $(target).parents('.BeAlert_box').next('.BeAlert_overlay').remove(); // 关闭当前点击弹框的遮罩
        $(target).parents('.BeAlert_box').remove(); // 关闭当前点击的弹框
      }
    };
  
    return {
      common: common
    }
  })
  