// event-bus.js
import { reactive, readonly } from 'vue';
// 创建一个响应式的事件存储
const state = reactive(new Map());
// 添加一个方法来触发事件
function emitEvent(event, payload) {
  const listeners = state.get(event) || [];
  listeners.forEach((listener) => listener(payload));
}
export default readonly({
  on(event, callback) {
    const listeners = state.get(event) || [];
    listeners.push(callback);
    state.set(event, listeners);
  },
  off(event, callback) {
    const listeners = state.get(event) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
      state.set(event, listeners);
    }
  },
  emit: emitEvent,
});