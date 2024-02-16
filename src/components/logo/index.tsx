import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const Logo: FC<IProps> = (props) => {
  const navigate = useNavigate()
  function handleClickLogo() {
    navigate('/shop')
  }
  return (
    <LogoWrapper>
      <h1 className="logo" onClick={handleClickLogo}>
        BookStore
      </h1>
    </LogoWrapper>
  )
}

Logo.displayName = 'Logo'
export default memo(Logo)
