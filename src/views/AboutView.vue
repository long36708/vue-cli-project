<!--
 * @Author: longmo
 * @Date: 2024-11-20 00:03:03
 * @LastEditTime: 2025-04-26 13:53:40
 * @FilePath: src/views/AboutView.vue
 * @Description: 不打开浏览器控制台，直接运行，多次点击，也会不断增加内存消耗
 -->
<template>
  <div class="about">
    <button @click="handleClick">生成并 console</button>
    <div>
      <span class="now">
        实时: totalJSHeapSize={{ nowPerformance?.memory?.totalJSHeapSize }},
        usedJSHeapSize={{ nowPerformance?.memory?.usedJSHeapSize }}
      </span>
    </div>
    <br />
    <div v-for="item in counterListReverse" :key="item.num">
      <span>
        执行{{ item.num }}: totalJSHeapSize={{ item.totalJSHeapSize }},
        usedJSHeapSize={{ item.usedJSHeapSize }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
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

const counter = ref({
  num: 1,
  totalJSHeapSize: 0,
  usedJSHeapSize: 0,
});

const counterList = ref([counter.value]);

const counterListReverse = computed(() => {
  return [...counterList.value].reverse();
});

function updateCounter() {
  counter.value = {
    num: counter.value.num,
    totalJSHeapSize: toMB(window.performance.memory.totalJSHeapSize),
    usedJSHeapSize: toMB(window.performance.memory.usedJSHeapSize),
  };
  counterList.value.push(counter.value);
}

function handleClick() {
  const records = [];
  for (let i = 0; i < 10_000_000; i++) {
    records.push({});
  }
  console.log(records);

  updateCounter();
  counter.value.num = counter.value.num + 1;
  console.log("counter", counter.value);
}
</script>

<style scoped>
.now {
  color: red;
}
</style>
