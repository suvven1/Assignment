import React from 'react'
import CRUDList from './CRUDList'
import styled from 'styled-components'
import { MdDelete } from "react-icons/md";

const CRUDLists = ({ setCreate, setStateProperty, expenseLists, setExpenseLists, setEditContent }) => {
    const handleDelete = (id) => {
        if (expenseLists.length != 0) {
            if (id == "all") {
                setExpenseLists([]);
                localStorage.setItem('expenseLists', JSON.stringify([]));
            } else {
                const newLists = expenseLists.filter((expense) => expense.id !== id)
                setExpenseLists(newLists);
                localStorage.setItem('expenseLists', JSON.stringify(newLists));
            }

            setProperty();
        }
    }

    const setProperty = () => {
        setStateProperty({
            view: true,
            msg: "삭제",
            color: "#D94844"
        })

        setTimeout(() => {
            setStateProperty({
                view: false
            });
        }, 2000)
    }
    return (
        <Lists>
            {expenseLists.map((expense) => {
                return (
                    <CRUDList
                        key={expense.id}
                        expense={expense}
                        setCreate={setCreate}
                        handleDelete={handleDelete}
                        setEditContent={setEditContent}
                    />
                )
            })}
            <button onClick={() => handleDelete("all")}>목록 지우기 <MdDelete /></button>
        </Lists>
    )
}

export default CRUDLists

const Lists = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;

    button{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: fit-content;
        padding: 10px 15px 10px 15px;
        color: white;
        background-color: rgb(140, 180, 100);
        border-style: none;
        border-radius: 3px;
        align-self: flex-start;
        cursor: pointer;
        transition: all 0.5s ease-in-out;

        svg{
            font-size: 18px;
        }

        &:hover{
            box-shadow: 0px 0px 20px 10px lightgray;
            padding: 10px 16px 10px 16px;
        }
    }
`;