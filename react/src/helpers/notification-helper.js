import store from '../store/store';

export function notify(variant, message) {
    store.dispatch({
        type: 'NOTIFY',
        message: message,
        variant: variant
    });
};