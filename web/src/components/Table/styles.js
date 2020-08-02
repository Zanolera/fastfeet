import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 15px;
  tbody {
    background: white;
    color: #8e8e8e;
    td {
      border: 1px solid #eee;
      border-style: solid none;
      padding: 8px 0px;
      height: 53px;
    }
    td:first-child {
      border-left-style: solid;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding-left: 15px;
    }
    td:last-child {
      border-right-style: solid;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      padding: 0px 10px;
    }
  }
  thead {
    th {
      color: #333;
      text-align: left;
    }
    th:first-child {
      padding-left: 15px;
    }
    th:last-child {
      width: 5%;
    }
    th.customWidth {
      width: 15%;
    }
  }
`;
