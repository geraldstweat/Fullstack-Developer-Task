import React from 'react';
import styled from 'styled-components';

type Rate = {
  id?: string;
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
  fetchedAt: string | Date;
};

interface Props {
  exchangeRates: Rate[];
  lastFetchTime: string | Date | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const Card = styled.div`
  max-width: 960px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #eee;
`;

const Small = styled.small`
  color: #6b7280;
`;

const Button = styled.button`
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  background: #4f46e5;
  color: #fff;
  cursor: pointer;
`;

const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TH = styled.th`
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #374151;
`;

const TD = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #f2f2f2;
  color: #111827;
`;

export const ExchangeRatesTable: React.FC<Props> = ({ exchangeRates, lastFetchTime, loading, error, onRefresh }) => {
  return (
    <Card>
      <Toolbar>
        <Small>
          {loading ? 'Loading…' : error ? error : lastFetchTime ? `Last updated: ${new Date(lastFetchTime).toLocaleString()}` : 'No data'}
        </Small>
        <Button onClick={onRefresh}>Refresh</Button>
      </Toolbar>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <TH>Country</TH>
              <TH>Currency</TH>
              <TH>Amount</TH>
              <TH>Code</TH>
              <TH>Rate</TH>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((r, idx) => (
              <tr key={r.id || `${r.code}-${idx}`}>
                <TD>{r.country}</TD>
                <TD>{r.currency}</TD>
                <TD>{r.amount}</TD>
                <TD>{r.code}</TD>
                <TD>{r.rate.toFixed(4)}</TD>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </Card>
  );
};
