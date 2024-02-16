import { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import * as echarts from 'echarts'
import type { BarSeriesOption, PieSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>
interface IProps {
  children?: ReactNode
  name: string
  option: Record<string, any>
  width?: number
  height: number
}

const ECharts: FC<IProps> = ({ name, option, height }) => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(name))
    myChart.setOption(option)
    window.addEventListener('resize', function () {
      myChart.resize()
    })
    return () => {
      window.removeEventListener('resize', function () {
        myChart.resize()
      })
    }
  }, [])
  return <div id={name} style={{ height }}></div>
}

ECharts.displayName = 'ECharts'
export default memo(ECharts)
