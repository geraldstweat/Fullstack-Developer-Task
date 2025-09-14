import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ExchangeRatesTable } from './components/ExchangeRatesTable';
import { GET_EXCHANGE_RATES } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { RefreshCw } from 'react-feather'; 

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #6dd5ed, #2193b0);
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  opacity: 0.85;
  font-size: 1.1rem;
`;

const RefreshButton = styled.button`
  background: #ffffff20;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;

  &:hover {
    background: #ffffff40;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  text-align: center;
  color: ${({ error }) => (error ? '#ff6b6b' : '#fff')};
  font-size: 1.2rem;
  margin-top: 20px;
`;

const ExchangeRatesApp: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_EXCHANGE_RATES, {
    pollInterval: 30000, 
  });

  return (
    <AppContainer>
      <Card>
        <Header>
          <Title>💱 Exchange Rates</Title>
          <Subtitle>Latest Czech National Bank Rates</Subtitle>
        </Header>

        {loading && <Message>⏳ Loading exchange rates...</Message>}

        {error && (
          <Message error>
            ❌ Error fetching data: {error.message}
          </Message>
        )}

        {data?.exchangeRates && data.exchangeRates.length > 0 ? (
          <ExchangeRatesTable
            exchangeRates={data.exchangeRates}
            lastFetchTime={data.lastFetchTime}
            loading={loading}
            error={error ? String(error) : null}
            onRefresh={() => refetch()}
          />
        ) : (
          !loading &&
          !error && <Message>No exchange rate data available.</Message>
        )}
      </Card>
    </AppContainer>
  );
};

export default ExchangeRatesApp;
