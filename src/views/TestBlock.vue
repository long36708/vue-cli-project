<!--
 * @Author: longmo
 * @Date: 2025-04-30 14:59:34
 * @LastEditTime: 2025-04-30 15:11:25
 * @FilePath: src/views/TestBlock.vue
 * @Description: 结论：控制台无论打开与否，均存在console.log日志，导致浏览器无法自动进行垃圾回收
 -->
<script setup>
import { useNowMemory } from "@/composables/useNowMemory";

const { nowPerformance } = useNowMemory();
// 测试 1：控制台未打开时输出大对象
function handleClick() {
  const obj = { data: new Array(1e6).fill(0) };
  console.log(obj); // 输出后，obj 被全局变量引用，内存不会释放
}

function handleClick2() {
  // 测试 2：无引用时的内存释放
  {
    const temp = { data: new Array(1e6).fill(0) };
    console.log(temp); // temp 在作用域结束时失去引用，会被 GC 回收
  }
}
</script>

<template>
  <div>
    <button @click="handleClick">测试 1：控制台未打开时输出大对象</button>
    <button @click="handleClick2">测试 2：无引用时的内存释放</button>
    <div>
      <span class="now">
        实时: totalJSHeapSize={{ nowPerformance?.memory?.totalJSHeapSize }},
        usedJSHeapSize={{ nowPerformance?.memory?.usedJSHeapSize }}
      </span>
    </div>
    <br />
  </div>
</template>

<style scoped></style>
