import * as echarts from 'echarts'
import type { ECOption } from '@/components/ECharts'
import { reqBarData } from '@/service/modules/dashBoard'
const { barData } = await reqBarData()
export default function () {
  const option: ECOption = {
    title: {
      text: '月度销售额',
      top: 10,
      left: 15,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: barData.xData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        data: barData.yData
      }
    ]
  }
  return option
}
