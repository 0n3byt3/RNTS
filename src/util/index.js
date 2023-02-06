/*DebugMode global*/
export const _DebugMode = __DEV__? true : false;

/* Log */
export function $log(...logText) {
    if (_DebugMode) {
        let txt = logText;
        console.warn(...txt);
    }
}

//eventify an obj
export function eventify(obj = {}) {
    obj._listeners = {};

    function addListner(type, fn, once = false) {
        (obj._listeners[type] = obj._listeners[type] || []).push({fn, once});
        return obj;
    }

    obj.on = function (type, fn) {
		return type.split(' ').forEach(v => {
			addListner(v, fn, false);
		});
    };

    obj.once = function (type, fn) {
		return type.split(' ').forEach(v => {
			addListner(v, fn, true);
		});
    };

    obj.off = function (type, fn) {
		if(!type) {
			this._listeners = {};
			return;
		}

        if (fn) {
			type.split(' ').forEach(v => {
				if (this._listeners[v])
					this._listeners[v] = this._listeners[v].filter(e => e.fn !== fn);
			});
        }
        else {
			type.split(' ').forEach(v => {
				if (this._listeners[v])
					this._listeners[v] = [];
			});
		}

        return this;
    };

    obj.fire = function (type, data = {}) {
        const listeners = this._listeners[type];
        if(listeners !== undefined) {
            const evt = {...data, type};
            listeners.map(v => {
                v.fn(evt);
            });
            this.listeners = listeners.filter(v => !v.once);
        }
        return this;
    };

    return obj;
}
