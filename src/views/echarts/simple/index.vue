<template>
  <div ref="chart" style="width: 100%; height: 400px"></div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'

  const chartRef = ref(null)
  export default {
    setup() {
      const chartRef = ref(null)

      onMounted(() => {
        const chart = echarts.init(chartRef.value)
        // ... 其他代码
      })

      return {
        chartRef,
      }
    },
  }
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(Math.round(Math.random() * 100));
  }

</script>

<style></style>
