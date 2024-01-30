import styled from 'styled-components'
interface IProps {
  $isScrollAtTop: boolean
}
export const AppHeaderWrapper = styled.div<IProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  transition: all 0.8s;
  background-color: ${(props) => (props.$isScrollAtTop ? 'transparent' : '#fff')};
  box-shadow: ${(props) =>
    props.$isScrollAtTop
      ? ''
      : `0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1)`};
  /* border: 1px solid #fff;
  box-sizing: border-box; */
  width: 100%;
  .hambur-enter,
  .hanmbur-appear {
    height: 0;
    opacity: 0;
  }
  .hambur-enter-active,
  .hambur-appear-active {
    height: 208px;
    opacity: 1;
    transition: all 300ms;
  }
  .hambur-exit {
    height: 208px;
    opacity: 1;
  }
  .hambur-exit-active {
    height: 0;
    opacity: 0;
    transition: all 300ms;
  }
  .hambur-exit-done {
    display: none;
  }
  .ham-ul {
    width: 95%;
    margin: 0 10px;
    & > li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #fff;
      padding-left: 10px;
      /* margin: 0 10px; */
      /* margin-right: 20px; */
    }
  }
`
