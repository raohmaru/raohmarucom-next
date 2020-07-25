export default function Signal() {
    let listeners = [];

    function signal(arg) {
        if (typeof arg === 'function') {
            listeners.push(arg);
        } else {
            let i = listeners.length;
            while (i-- > 0) {
                listeners[i](arg);
            }
        }
        return signal;
    }

    signal.clear = function () {
        listeners.length = 0;
    };

    signal.remove = function (callback) {
        listeners = listeners.filter(func => func !== callback);
    };

    return signal;
}
