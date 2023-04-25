<template>
  <div id="ox" style="margin-left: 350px">血氧值={{ oxygenLevel }}</div>
  <div id="chart" style="margin-left: -450px; width: 1000px; height: 600px"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, toRaw } from 'vue'
  // Echarts 为init（dom元素后的类型）
  // EChartsOption 为 option 的类型
  import { ECharts, EChartsOption, init } from 'echarts'
  import axios from 'axios'
  const maxLength = 60 // 限制数据长度为60秒
  const now = new Date() // 初始时间
  const data = ref<{ time: Date; value: number }[]>([]) // 数据数组
  const oxygenLevel = ref(0)
  const chartRef = ref<ECharts | null>(null) // 初始化 ECharts 实例
  onMounted(() => {
    const chart = init(document.getElementById('chart') as HTMLElement)
    chartRef.value = chart
    const option: EChartsOption = {
      xAxis: {
        type: 'time', // 将轴类型设置为时间类型
        min: new Date(now.getTime() - 5000),
        max: new Date(now.getTime() + maxLength * 1000),
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 200,
      },
      series: [
        {
          type: 'line',
          markPoint: {
            label: {
              color: '#fff',
            },
            data: [
              {
                type: 'max',
                name: '最大值',
              },
              {
                type: 'min',
                name: '最小值',
              },
            ],
          },
          data: toRaw(data.value.map((item) => [item.time, item.value])),
        },
      ],
    }
    chart.setOption(option)
    // 设置定时器，每秒更新一次数据
    setInterval(() => {
      axios({
        url: 'http://localhost:8080/TestInfo/getbyid?id=1',
        method: 'GET',
      }).then((res) => {
        const value = res.data.now_heart_rate
        oxygenLevel.value = res.data.blood_oxygen
        const secData = toRaw(data.value)
        secData.push({ time, value }) // 将新数据添加到数组末尾
        if (secData.length > maxLength) {
          secData.shift() // 移除最早的数据
        }
      })
      const time = new Date() // 获取当前时间
      // 更新 option
      option.xAxis.min = new Date(time.getTime() - maxLength * 1000)
      option.xAxis.max = time
      option.series[0].data = toRaw(data.value.map((item) => [item.time, item.value]))
      // 更新图表
      chart.setOption(option)
    }, 2000) // 设置定时器的时间间隔，单位为毫秒，这里设置为1秒更新一次数据
  })
</script>
