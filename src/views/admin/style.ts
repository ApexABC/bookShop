import { styled } from 'styled-components'
export const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: var(--primaryColor);
    /* background: linear-gradient(45deg, #43cbff, #9708cc);
    animation: hueRotate 10s infinite; */
    font-size: 28px;
    p {
      font-weight: bold;
      color: transparent;
      background: linear-gradient(45deg, #43cbff, #9708cc);
      -webkit-background-clip: text;
      animation: hueRotate 5s infinite;
    }
  }
  .page-content {
    display: flex;
    .aside {
      height: 100%;
    }
    .right {
      display: flex;
      flex-direction: column;
      height: 100%;

      .header {
        height: 50px;
      }
      .content {
        flex: 1;
        padding: 10px;
        /* height: calc(100vh - 100px); */
        background-color: #f6f6f6;
      }
    }
  }
  @keyframes hueRotate {
    100% {
      filter: hue-rotate(360deg);
    }
  }
`
