/**
 * 常用函数类
 */
export default class Util {
    /**
     * 格式化日期
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * @param  {int} zone 时间戳
     * @param  {string} fmt 时间格式
     */
    static formatDateFromZone(zone, fmt) {
        let date = new Date(zone);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                    ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    /**
     * 格式化时间
     */
    static formatTime(time, fmt) {
        if (time == 0 || time == null || time == '') {
            time = '--';
        } else {
            time = fmt === void 0
                ? this.formatDateFromZone(time, 'yyyy/MM/dd hh:mm:ss')
                : this.formatDateFromZone(time, fmt);
        }
        return time;
    }
    /**
     * 格式化时间大小
     */
    static formatTimeSize(size) {
        let str = '';
        if (size < 1000) {
            str = '1s';
        } else {
            const hour = size / 3600000;
            if (hour >= 1) {
                str += parseInt(hour) + 'h ';
                size = size % 3600000;
            }
            const minute = size / 60000;
            if (minute >= 1) {
                str += parseInt(minute) + 'm ';
                size = size % 60000;
            }
            const second = size / 1000;
            if (second >= 1) {
                str += parseInt(second) + 's ';
                size = size % 1000;
            }
        }
        return str;
    }
    /**
     * 格式文件大小
     */
    static formatFileSize(size) {
        const levels = [
            'B',
            'KB',
            'MB',
            'GB',
            'TB',
            'PB'
        ];
        var level = 0;
        while (size > 1024) {
            size = size / 1024;
            level++;
        }
        return parseFloat(size.toFixed(2), 10) + ' ' + levels[level];
    }
    /**
     *
     * 判断当前节点以及父节点是否含有指定样式
     */
    static hasClassWithInParent(element, cls) {
        const classList = element.className.split(' ');
        let res = classList.indexOf(cls) !== -1;
        if (!res && element.parentElement) {
            res = this.hasClassWithInParent(element.parentElement, cls);
        }
        return res;
    }

    //全角转半角
    static ToCDB(str) { 
        var tmp = ""; 
        for(var i=0;i<str.length;i++){ 
            if (str.charCodeAt(i) == 12288){
                tmp += String.fromCharCode(str.charCodeAt(i)-12256);
                continue;
            }
            if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){ 
                tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
            } 
            else{ 
                tmp += String.fromCharCode(str.charCodeAt(i)); 
            } 
        } 
        return tmp 
    } 
}
