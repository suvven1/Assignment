import React from 'react'
import styled from 'styled-components'
import { MdEdit, MdDelete } from "react-icons/md";
const CRUDList = ({ expense, setCreate, handleDelete, setEditContent }) => {
    const editList = () => {
        setCreate(false)
        setEditContent(expense)
    }
    return (
        <List>
            <div>{expense.item}</div>
            <div style={{ color: "gray" }}>{expense.price}</div>
            <EditDelete>
                <MdEdit style={{ color: "green" }} onClick={editList} />
                <MdDelete style={{ color: "darkred" }} onClick={() => handleDelete(expense.id)} />
            </EditDelete>
        </List>
    )
}

export default CRUDList

const List = styled.div`
    display: flex;
    width: 95%;
    border: 1px solid lightgray;
    padding: 15px 20px 15px 20px;
    justify-content: space-between;
    cursor: default;

    &:hover {
        transition: all 0.2s ease-out;
        width: 96%;
    }
`;

const EditDelete = styled.div`
    display: flex;
    gap: 15px;
    svg{
        font-size: 18px;
        cursor: pointer;
    }
`;