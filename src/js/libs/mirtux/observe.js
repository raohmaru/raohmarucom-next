/**
 * Converts object to string for a better comparison
 * @param value
 * @return {string|*}
 */
function comparable(value) {
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value;
}

/**
 * Observable for changes in the given store.
 * @param store {object}
 * @param select {function}
 * @param onChange {function}
 * @return {unsubscribe|Promise<PushSubscription>}
 */
export default function observe(store, select, onChange) {
    let currentState = select(store.getState());

    function handleChange() {
        const nextState = select(store.getState());
        if (comparable(nextState) !== comparable(currentState)) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    const unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}
