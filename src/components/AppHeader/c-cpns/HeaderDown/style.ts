import styled from 'styled-components'
interface IProps {
  $isShowExtra: boolean
}
export const HeaderDownWrapper = styled.div<IProps>`
  position: relative;
  width: 100%;
  .header-select {
    display: flex;
    justify-content: center;
    background-color: #333;
    width: 100%;
    color: #fff;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 40px;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
          background-color: var(--blue);
        }
      }
    }
  }
  .header-extra {
    position: absolute;
    top: 40px;
    width: 100%;
    height: ${(props) => (props.$isShowExtra ? '70' : '0')}px;
    transition: all 0.5s;
    background-color: #000;
  }
`
