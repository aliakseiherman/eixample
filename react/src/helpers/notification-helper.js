import store from '../store/store';

function notify(variant, message) {
    store.dispatch({
        type: 'NOTIFY',
        message: message,
        variant: variant
    });
};

function success(message) {
    notify('success', message);
};

function warning(message) {
    notify('warning', message);
};

function error(message) {
    notify('error', message);
};

export default {
    success: success,
    warning: warning,
    error: error
}