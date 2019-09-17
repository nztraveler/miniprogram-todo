const events = Symbol('events');
class Observer {
    constructor() {
        this[events] = {};
    }
    on(eventName, callback) {
        this[events][eventName] = this[events][eventName] || [];
        this[events][eventName].push(callback);
    }
    emit(eventName, param) {
        if (this[events][eventName]) {
            this[events][eventName].forEach((value, index) => {
                value(param);
            })
        }
    }

    clear(eventName) {
        this[events][eventName] = [];
    }

    off(eventName, callback) {
        this[events][eventName] = this[events][eventName] || [];
        this[events][eventName].forEach((item, index) => {
            if (item === callback) {
                this[events][eventName].splice(index, 1);
            }
        })
    }

    one(eventName, callback) {
        this[events][eventName] = [callback];
    }
}

const observer = new Observer();

export {
    Observer,
    observer
}

作者：24号
链接：https://juejin.im/post/5b7643bf6fb9a009a9294af7
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。