import EventBus from "../bus/event-bus";

function notify(type, message) {
    EventBus.$emit("notification", { message: message, type: type });
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