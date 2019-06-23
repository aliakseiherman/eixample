import EventBus from "../bus/event-bus";

export function notify(type, message) {
    EventBus.$emit("notification", { message: message, type: type });
};