/**
 * @Author: longmo
 * @Date: 2025-04-30 15:03:22
 * @LastEditTime: 2025-04-30 15:04:51
 * @FilePath: src/composables/useNowMemory.js
 * @Description: 获取当前js堆内存的占用情况
 */
import { onMounted, ref } from "vue";
export function useNowMemory() {
  const MB = 1024 * 1024;

  function toMB(memory) {
    return Math.floor(memory / MB);
  }
  const nowPerformance = ref({
    ...window.performance,
  });

  onMounted(() => {
    setInterval(() => {
      nowPerformance.value = {
        memory: {
          totalJSHeapSize: toMB(window.performance.memory.totalJSHeapSize),
          usedJSHeapSize: toMB(window.performance.memory.usedJSHeapSize),
        },
      };
    }, 100);
  });
  return {
    nowPerformance,
  };
}
