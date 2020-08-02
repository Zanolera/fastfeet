import styled from 'styled-components';

export const Dot = styled.span`
  height: 9px;
  width: 9px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: inline-block;
`;

export const Container = styled.div`
  background: ${({ color }) => `${color}33`};
  border-radius: 20px;
  width: min-content;
  min-width: 90px;
  padding: 4px 5px;
  display: flex;
  align-items: center;

  span {
    padding-left: 5px;
    font-weight: bold;
    font-size: 12px;
    color: ${({ color }) => `${color}`};
  }
`;
