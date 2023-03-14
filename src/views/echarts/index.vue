<template>
  <div id="char" style="width: 600px; height: 600px"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  // Echarts 为init（dom元素后的类型）
  // EChartsOption 为 option 的类型
  import { ECharts, EChartsOption, init } from 'echarts'

  onMounted(() => {
    const charEle = document.getElementById('char') as HTMLElement
    console.log()
    const charEch: ECharts = init(charEle)
    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }
    charEch.setOption(option)
  })
</script>
