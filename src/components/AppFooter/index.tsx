import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import caption from '@/assets/img/caption.png'
const colorTextStyles = {
  backgroundImage: `url(${caption})`,
  backgroundSize: 'cover',
  textShadow: 'none',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  textStroke: '2px transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: '2px transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  MozTextStroke: '2px transparent',
  MsBackgroundClip: 'text',
  MsTextFillColor: 'transparent',
  MsTextStroke: '2px transparent'
}
const textClass = 'w-full text-2xl opacity-50'
interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = (props) => {
  return (
    <div className=" bg-white h-52 flex items-center justify-center">
      <div className="w-full h-full ml-10 flex flex-col justify-evenly">
        <div>
          <span style={colorTextStyles} className={textClass}>
            李智钦的毕业设计
          </span>
        </div>
        <div>
          <span style={colorTextStyles} className={textClass}>
            前端：React、TS、Vite、Tailwindcss
          </span>
          {/* <span style={colorTextStyles} className={textClass}>
            前端：
          </span>
          <span style={colorTextStyles} className={textClass}>
            React、
          </span>
          <span style={colorTextStyles} className={textClass}>
            TS、
          </span>
          <span style={colorTextStyles} className={textClass}>
            Vite、
          </span>
          <span style={colorTextStyles} className={textClass}>
            Tailwindcss
          </span> */}
        </div>
        <div>
          <span style={colorTextStyles} className={textClass}>
            后端：Node、Koa、MySql
          </span>
          {/* <span style={colorTextStyles} className={textClass}>
            后端：
          </span>
          <span style={colorTextStyles} className={textClass}>
            Node、
          </span>
          <span style={colorTextStyles} className={textClass}>
            Koa、
          </span>
          <span style={colorTextStyles} className={textClass}>
            MySql
          </span> */}
        </div>
        <div>
          <span style={colorTextStyles} className={textClass}>
            部署：Docker、Nginx
          </span>
          {/* <span style={colorTextStyles} className={textClass}>
            部署：
          </span>
          <span style={colorTextStyles} className={textClass}>
            Docker、
          </span>
          <span style={colorTextStyles} className={textClass}>
            Nginx
          </span> */}
        </div>
      </div>
    </div>
  )
}

AppFooter.displayName = 'AppFooter'
export default memo(AppFooter)
