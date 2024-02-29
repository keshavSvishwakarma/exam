// import { Alert } from 'bootstrap';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Info: 'Info',
    Warning: 'Warning'
}

// enable subscribing to alerts observable
export function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

// convenience methods
export function success(message, options) {
    alert({ ...options, type: AlertType.Success, message });
}

export function error(message, options) {
    alert({ ...options, type: AlertType.Error, message });
}

export function info(message, options) {
    alert({ ...options, type: AlertType.Info, message });
}

export function warn(message, options) {
    alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
export function alert(alert) {
    alert.id = alert.id || defaultId;
    alertSubject.next(alert);
}
// export default Alert;

// clear alerts
export function clear(id = defaultId) {
    alertSubject.next({ id });
}
