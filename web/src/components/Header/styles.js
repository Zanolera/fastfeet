import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1920px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      max-height: 32px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const StyledLink = styled(Link)`
  color: ${(props) => (props.to.selected ? darken(0.4, '#999999') : '#999999')};
  font-size: 16px;
  padding-right: 10px;
  font-weight: bold;
  transition: color 0.2s;
  &:hover {
    color: ${darken(0.1, '#999999')};
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #333;
    }
    button {
      width: 100%;
      margin: 10px 0 0;
      background: #fff;
      font-weight: bold;
      color: #f64c75;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        color: ${darken(0.08, '#f64c75')};
      }
    }
  }
`;
