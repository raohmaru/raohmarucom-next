export default function Signal() {
    let listeners = [];

    function signal(...args) {
        if (args.length === 1 && typeof args[0] === 'function') {
            listeners.push(args[0]);
        } else {
            let i = listeners.length;
            while (i-- > 0) {
                listeners[i](...args);
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
