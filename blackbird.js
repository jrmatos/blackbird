var PENDING = 'PENDING';
var FULFILLED = 'FULFILLED';
var REJECTED = 'REJECTED';

class Blackbird {
    state = PENDING;
    value = null;
    handlers = [];

    constructor(fn) {
        this.doResolve(fn);
    }

    doResolve(fn) {
        try {
            fn(
                (value) => this.resolve(value),
                (reason) => this.reject(reason)
            );
        } catch (e) {
            this.reject(e);
        }        
    }

    resolve(result) {
        try {            
            this.fulfill(result);
        } catch (e) {
            this.reject(e);
        }
    }

    fulfill(result) {
        this.state = FULFILLED;
        this.value = result;

        this.handlers.forEach(this.handle.bind(this));
    }

    reject(error) {
        this.state = REJECTED;
        this.value = error;

        this.handlers.forEach(this.handle.bind(this));
    }

    then(onFulfilled, onRejected) {
        setTimeout(() => {
            this.handle({
                onFulfilled,
                onRejected
            });
        }, 0);
    }

    handle(handler) {
        if (this.state === PENDING) {
            this.handlers.push(handler);
        } else {
            if (this.state === FULFILLED && isFunction(handler.onFulfilled)) {
                handler.onFulfilled(this.value);
            }

            if (this.state === REJECTED && isFunction(handler.onRejected)) {
                handler.onRejected(this.value);
            }
        }
    }
}

function isFunction(t) {
    return typeof t === 'function';
}

module.exports = Blackbird;