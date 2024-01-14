import styled from 'styled-components'
export const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  border: 1px solid #000;
  border-top: 0;
  overflow: hidden;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--sceondColor);
    /* background: linear-gradient(45deg, #43cbff, #9708cc);
    animation: hueRotate 10s infinite; */
    font-size: 28px;
    border: 1px solid #000;
    p {
      font-weight: bold;
      color: #000;
      height: 40px;
      line-height: 40px;
      /* color: transparent;
      background: linear-gradient(45deg, #fdd819, #e80505); */
      /* -webkit-background-clip: text; */
      /* animation: hueRotate 5s infinite; */
    }
  }
  .page-content {
    display: flex;
    width: 100%;
    height: 100%;
    .aside {
      height: 100%;
      background-color: #fff;
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
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 25px;
        /* height: calc(100vh - 100px); */
        background-color: #f6f6f6;
      }
    }
  }
  .ant-pro-table-search {
    display: none;
  }
  .ant-pro-table-list-toolbar {
    display: none;
  }
  /* @keyframes hueRotate {
    100% {
      filter: hue-rotate(360deg);
    }
  } */
`
