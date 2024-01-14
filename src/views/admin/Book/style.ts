import styled from 'styled-components'

export const BookWrapper = styled.div`
  .header {
    display: flex;
  }
  .table {
    width: 100%;
    .describe {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  /* :where(.css-dev-only-do-not-override-2rgkd4).ant-modal .ant-modal-body {
    display: flex !important;
    justify-content: center !important;
  } */
`
