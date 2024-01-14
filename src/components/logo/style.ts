import styled from 'styled-components'

export const LogoWrapper = styled.div`
  .logo {
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
`
