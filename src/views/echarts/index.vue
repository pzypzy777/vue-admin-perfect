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
      xAxis: [
        {
          type: 'time', // 将轴类型设置为时间类型
          data: [], // 初始数据为空数组
          // ... 其他的配置项
        },
      ],
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
    const xAxisData = option.xAxis[0].data
    const seriesData = option.series[0].data

    // 设置定时器，每秒更新一次数据
    setInterval(() => {
      const now = new Date() // 获取当前时间
      const time = now.toLocaleTimeString() // 格式化时间，可以根据需要进行格式化
      const value = Math.random() * 100 // 模拟实时数据

      // 更新 xAxis 和 series 数据
      xAxisData.push(time)
      seriesData.push(value)

      // 限制数据长度为一定数量，例如只保留最近的100个数据点
      const maxLength = 100
      if (xAxisData.length > maxLength) {
        xAxisData.shift() // 移除最早的数据
        seriesData.shift()
      }

      // 更新图表
      charEch.setOption(option)
    }, 1000) // 设置定时器的时间间隔，单位为毫秒，这里设置为1秒更新一次数据
  })
</script>
