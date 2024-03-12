import styled from 'styled-components';
import './App.css';
import CRUDContainer from './components/CRUDContainer/CRUDContainer';
import CRUDState from './components/CRUDState';
import Title from './components/Title';
import Total from './components/Total';
import { useState } from 'react';

function App() {
  const savedLists = JSON.parse(localStorage.getItem('expenseLists'));
  const [expenseLists, setExpenseLists] = useState(savedLists ? savedLists : []);
  const [stateProperty, setStateProperty] = useState({
    view: false,
    msg: "생성",
    color: "green"
  });
  return (
    <AppContainer>
      <CRUDState stateProperty={stateProperty} />
      <Title />
      <CRUDContainer
        setStateProperty={setStateProperty}
        expenseLists={expenseLists}
        setExpenseLists={setExpenseLists}
      />
      <Total expenseLists={expenseLists} />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
