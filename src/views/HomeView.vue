<!--
 * @Author: longmo
 * @Date: 2024-11-20 00:03:03
 * @LastEditTime: 2025-04-26 14:05:33
 * @FilePath: src/views/HomeView.vue
 * @Description: 打开 devtools 时，console 会自动解开打印的对象（1 层）
   不打开时，console 不会自动解开打印的对象
   打开 devtools 之后，由于"自动解开对象"的机制，控制台需要读取并输出大字符串，内存占用自然就会增大
   若第一层的对象过大，则可能会导致内存溢出（Out of Memory，OOM）
   但若第一层的对象较小，即使第二层对象很大，也不容易出现内存溢出，但仍会消耗内存(在devtool打开时，自动接口打印的第一层，消耗很小)
 -->
<template>
  <div class="home">
    <button id="btn" @click="handleClick">点我</button>
    <div ref="boxRef"></div>
  </div>
</template>

<script>
// @ is an alias to /src
const MB = 1024 * 1024;
export default {
  name: "HomeView",
  components: {},
  mounted() {
    console.log("mounted home view");
    console.debug("排查错误日志 home");
  },
  methods: {
    handleClick() {
      const self = this;
      log();
      function log() {
        const memory = performance.memory.totalJSHeapSize;
        const usagedMemory = Math.floor(memory / MB);
        const boxRef = self.$refs.boxRef;
        boxRef.insertAdjacentHTML("beforeend", `<span>${usagedMemory} </span>`);

        const obj = { usagedMemory, str: "g".repeat(50 * MB) };
        // const obj = { usagedMemory, wrapper: { str: "g".repeat(50 * MB) } };
        console.log(obj);

        setTimeout(() => log(), 150);
      }
    },
  },
};
</script>
