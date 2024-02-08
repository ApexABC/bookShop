import request from '../index'

export const reqBarData = () => request.get({ url: '/dash/barData' })

export const reqPieData = () => request.get({ url: '/dash/pieData' })

export const reqBaseData = () => request.get({ url: '/dash/baseData' })

export const reqTipsData = () => request.get({ url: '/dash/tipsData' })
