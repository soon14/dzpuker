var gameabc;
(function (gameabc) {
    var setTimeoutCache = {};
    var setTimeoutIndex = 0;
    var setTimeoutCount = 0;
    //  var lastTime = 0;
    /**
    * @language zh_CN
    * 使用 egret.Ticker管理时间 可以控制速度和暂停
    * 在指定的延迟（以毫秒为单位）后运行指定的函数。
    * @param listener {Function} 侦听函数
    * @param thisObject {any} this对象
    * @param delay {number} 延迟时间，以毫秒为单位
    * @param ...args {any} 参数列表
    * @returns {number} 返回索引，可以用于 clearTimeout
    */
    function setTimeout(listener, thisObject, delay) {
        var args = [];
        for (var _a = 3; _a < arguments.length; _a++) {
            args[_a - 3] = arguments[_a];
        }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var data = { listener: listener, thisObject: thisObject, delay: delay, params: args };
        setTimeoutCount++;
        if (setTimeoutCount == 1 && egret.sys.$ticker) {
            // lastTime = egret.getTimer();
            egret.Ticker.getInstance().register(timeoutUpdate, null);
        }
        setTimeoutIndex++;
        setTimeoutCache[setTimeoutIndex] = data;
        return setTimeoutIndex;
    }
    gameabc.setTimeout = setTimeout;
    /**
     * @language zh_CN
     * 清除指定延迟后运行的函数。
     * @param key {number} egret.setTimeout所返回的索引
     */
    function clearTimeout(key) {
        if (setTimeoutCache[key]) {
            setTimeoutCount--;
            delete setTimeoutCache[key];
            if (setTimeoutCount == 0 && egret.sys.$ticker) {
                egret.Ticker.getInstance().unregister(timeoutUpdate, null);
            }
        }
    }
    gameabc.clearTimeout = clearTimeout;
    function clearAllTimeout() {
        setTimeoutCount = 0;
        setTimeoutCache = {};
        egret.Ticker.getInstance().unregister(timeoutUpdate, null);
    }
    gameabc.clearAllTimeout = clearAllTimeout;
    function timeoutUpdate(timeStamp) {
        // var dt = timeStamp - lastTime;
        // lastTime = timeStamp;
        for (var key in setTimeoutCache) {
            var key2 = Number(key);
            var data = setTimeoutCache[key2];
            data.delay -= timeStamp; // dt;
            if (data.delay <= 0) {
                data.listener.apply(data.thisObject, data.params);
                clearTimeout(key2);
            }
        }
        return false;
    }
    gameabc.timeoutUpdate = timeoutUpdate;
})(gameabc || (gameabc = {}));
//# sourceMappingURL=TimeOut.js.map