import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  max-width: 1020px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 500;
`;

const StyledRow = styled(CommonRow)`
  padding: 14px 0;
  color: #333;
  border-bottom: 1px solid #ccc;
`;

const StyledBody = styled.section`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns} role="row" as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow columns={columns} role="row">
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (data.length === 0) {
    return <Empty>No data available.</Empty>;
  }
  data.map((d) => {
    if (d.caseNumber) d.caseNumber = d.caseNumber.split("-")[0];
  });
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
