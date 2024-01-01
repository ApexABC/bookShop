import { styled } from 'styled-components'
export const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 98vw;
  height: 100vh;
  border: 1px solid #000;
  border-top: 0;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: var(--sceondColor);
    /* background: linear-gradient(45deg, #43cbff, #9708cc);
    animation: hueRotate 10s infinite; */
    font-size: 28px;
    border: 1px solid #000;
    p {
      font-weight: bold;
      color: #000;
      /* color: transparent;
      background: linear-gradient(45deg, #fdd819, #e80505); */
      /* -webkit-background-clip: text; */
      /* animation: hueRotate 5s infinite; */
    }
  }
  .page-content {
    display: flex;
    height: 100%;
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
        height: 100%;
        /* height: calc(100vh - 100px); */
        background-color: #f6f6f6;
      }
    }
  }
  /* @keyframes hueRotate {
    100% {
      filter: hue-rotate(360deg);
    }
  } */
`
