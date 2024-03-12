import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import CRUDForm from './CRUDForm';
import CRUDLists from './CRUDLists';

const CRUDContainer = ({ setStateProperty, expenseLists, setExpenseLists }) => {
    const [create, setCreate] = useState(true);
    const [editContent, setEditContent] = useState({ item: "test", price: 1000 })
    return (
        <Container>
            <CRUDForm
                setStateProperty={setStateProperty}
                setCreate={setCreate}
                create={create}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
                editContent={editContent}
            />
            <CRUDLists
                setCreate={setCreate}
                setStateProperty={setStateProperty}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
                setEditContent={setEditContent}
            />
        </Container>
    )
}

export default CRUDContainer

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 900px;
    background-color: white;
`;
