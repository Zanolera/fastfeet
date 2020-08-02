import styled, { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body: {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  header {
    font-weight: bold;
    font-size: 22px;
    color: #444444;
  }
`;

export const Content = styled.div`
  margin: 50px 100px auto;
  display: flex;
  flex-direction: column;

  header {
    margin-bottom: 20px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;

  button{
    display: flex;
    align-items: center;
    width: 130px;
    margin: 10px 0;
    background: #7d40e7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: background 0.2s;
    height: 100%;

    svg {
      margin: 0 5px;
    }

    &:hover {
      background: ${darken(0.08, '#7d40e7')};
    }
  }
`;
