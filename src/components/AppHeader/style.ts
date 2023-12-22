import styled from 'styled-components'
export const AppHeaderWrapper = styled.div`
  width: 100%;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: var(--primaryColor);
    border-bottom: 1px solid var(--blue);
    color: #fff;
    a {
      color: #fff;
    }
    .header-left {
      width: 200px;
      margin-left: 20px;
      font-size: 38px;
      font-weight: 700;
      color: transparent;
      background: linear-gradient(45deg, #fdd819, #e80505);
      -webkit-background-clip: text;
      animation: hueRotate 5s infinite;
      user-select: none;
      cursor: pointer;
      @keyframes hueRotate {
        100% {
          filter: hue-rotate(360deg);
        }
      }
    }
    .header-center {
      flex: 1;
    }
    .header-right {
      display: flex;
      justify-content: flex-end;
      padding-right: 30px;
      width: 200px;
    }
  }
  .header-down {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`
