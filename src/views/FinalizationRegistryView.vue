<!--
 * @Author: longmo
 * @Date: 2025-04-26 14:11:22
 * @LastEditTime: 2025-04-26 14:23:49
 * @FilePath: src/views/FinalizationRegistryView.vue
 * @Description: FinalizationRegistry 监听对象被销毁
 -->
<script setup>
const MAX_LENGTH = 1024 * 1024;
/**
 * @description: 用于在gc 回收时，打印出被回收的对象
 * @type {FinalizationRegistry<unknown>}
 */
const finalRegistry = new FinalizationRegistry((value) => {
  const div = document.createElement("div");
  div.innerText = value;
  // console.log('注册在finalRegistry的对象被销毁了');
  document.getElementById("myId").appendChild(div);
});

function testA() {
  const arr = new Array(MAX_LENGTH);
  finalRegistry.register(arr, "a 被销毁啦");
}

function testB() {
  const arr = new Array(MAX_LENGTH);
  console.log("test b console.log", arr);
  finalRegistry.register(arr, "b 被销毁啦");
}

/**
 * 只会在第一次点击的时候，堆内存消耗会变大
 * 因为 console.log 打印出的是快照，会占用一定的内存，但是后续打印的是指向，不会占用太多的内存
 * 堆内存中字符串如果是固定的，那么会指向同一块内存地址，所以不会占用太多的内存
 */
function testC() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(
      i +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    );
    console.log(arr);
  }
}

function testD() {
  for (let i = 0; i < MAX_LENGTH; i++) {
    console.log("x".repeat(50));
  }
}

// 定时间隔打印堆内存使用情况（测试打开控制台时候的内存消耗）
setInterval(() => {
  const mEl = document.getElementById("m");
  if (mEl) {
    mEl.innerText = performance.memory.totalJSHeapSize / MAX_LENGTH;
  }
}, 100);
</script>

<template>
  <div id="myId"></div>
  <button @click="testA">testA 不打印console.log</button>
  <button @click="testB">testB 打印console.log</button>
  <button @click="testC">testC 打印console.log</button>
  <button @click="testD">testC 打印console.log字符串</button>
  <br />
  内存使用情况：
  <div id="m"></div>
</template>

<style scoped></style>
