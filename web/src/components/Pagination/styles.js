import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: none;
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 36px;
    line-height: 16px;
    border: 1px solid #8e5be8;
    border-radius: 4px;
    :disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  span {
    padding: 5px 10px;
    height: 36px;
    text-align: center;
    line-height: 26px;
    border-radius: 4px;
    margin: 0 10px;
    color: ${darken(0.09, '#b2b2b2')};
  }
`;
