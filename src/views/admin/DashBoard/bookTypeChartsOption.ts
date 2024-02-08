import type { ECOption } from '@/components/ECharts'
import { reqPieData } from '@/service/modules/dashBoard'

const { pieData } = await reqPieData()
export default function () {
  const option: ECOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '7%',
      left: 'center'
    },
    grid: {
      // left: '3%',
      // right: '4%',
      bottom: '1%'
    },
    title: {
      text: '书籍类型',
      top: 10,
      left: 15,
      textStyle: {
        fontSize: 16
      }
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        bottom: '-10%',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        data: pieData
      }
    ]
  }
  return option
}
