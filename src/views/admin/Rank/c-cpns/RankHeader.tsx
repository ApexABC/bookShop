import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Select, Divider, Space, Button, Input, Modal, message } from 'antd'
import { reqRankList, reqdeleteRank, reqAddRank } from '@/service/modules/rank'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { getRankedBookList, setRankInfo, setTableSpinningState } from '@/store/modules/rank'
interface IProps {
  children?: ReactNode
}

const { confirm } = Modal
const RankHeader: FC<IProps> = (props) => {
  const { curRankInfo } = useAppSelector(
    (state) => ({
      curRankInfo: state.rank.curRankInfo
    }),
    shallowEqualApp
  )
  useEffect(() => {
    getRankList()
  }, [])
  useEffect(() => {
    setDefaultVal(curRankInfo.name)
  }, [curRankInfo])
  const [rankList, setRankList] = useState<any[]>()
  const [inputVal, setInputVal] = useState<string>()
  const [defaultVal, setDefaultVal] = useState<string>()
  const dispatch = useAppDispatch()

  function handleDeleteSelectItem(e: any) {
    confirm({
      title: '确认删除榜单',
      async onOk() {
        try {
          const { code } = await reqdeleteRank(e.data.id)
          if (code !== 201) return message.warning('删除榜单失败，请重试')
          message.success('删除榜单成功')
          getRankList()
        } catch (error) {
          message.warning('删除榜单失败，请重试')
        }
      }
    })
  }
  async function handleAddRank(e: any) {
    const { code } = await reqAddRank(inputVal!)
    getRankList()
    if (code === 201) return message.success('添加榜单成功')
  }
  async function handleSelectChange(val: string, opt: any) {
    dispatch(setTableSpinningState(true))
    const { data } = await reqRankList()
    const info = data.find((item: any) => item.id === opt.id)
    dispatch(setRankInfo(info))
    dispatch(getRankedBookList(0))
  }
  async function getRankList() {
    dispatch(setTableSpinningState(true))
    const { data } = await reqRankList()
    dispatch(setRankInfo(data[0]))
    dispatch(getRankedBookList(0))
    setRankList(data)
  }
  return (
    <div>
      <Select
        style={{ width: 300 }}
        placeholder="请选择榜单名称"
        options={rankList}
        value={defaultVal}
        fieldNames={{ label: 'name', value: 'name' }}
        onChange={handleSelectChange}
        allowClear
        optionRender={(option) => {
          return (
            <div className="flex justify-between">
              {option.label}
              <button onClick={(e) => handleDeleteSelectItem(option)}>删除</button>
            </div>
          )
        }}
        dropdownRender={(menu) => {
          return (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="输入榜单名称"
                  onInput={(e: any) => setInputVal(e.target.value)}
                />
                <Button type="text" onClick={(e) => handleAddRank(menu)}>
                  添加榜单
                </Button>
              </Space>
            </>
          )
        }}
      />
    </div>
  )
}

RankHeader.displayName = 'RankHeader'
export default memo(RankHeader)
