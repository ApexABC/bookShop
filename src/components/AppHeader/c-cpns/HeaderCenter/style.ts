import styled from 'styled-components'

export const HeaderCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  .header-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    height: 40px;
    background-color: #eee;
    border-radius: 25px;
    border: 1px solid var(--blue);
    input {
      width: 400px;
      height: 30px;
      margin-left: 30px;
      font-size: 18px;
      color: var(--blue);
      border: none;
      outline: none;
      background-color: #eee;
      &::placeholder {
        color: var(--blue);
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 80px;
      height: 30px;
      padding-left: 5px;
      margin-right: 15px;
      background-color: var(--blue);
      color: #fff;
      border-radius: 20px;
      cursor: pointer;
      button {
        width: 45px;
        font-size: 16px;
        background-color: var(--blue);
        color: #fff;
      }
      &:hover,
      &:hover button {
        background-color: #00ddff;
      }
    }
  }

  :where(.css-dev-only-do-not-override-qgg3xn).ant-btn-primary {
    background-color: var(--blue);
  }
`
