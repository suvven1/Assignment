import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CRUDInput from './CRUDInput'
import { MdSend } from "react-icons/md";

const CRUDForm = ({ setStateProperty, create, setCreate, expenseLists, setExpenseLists, editContent }) => {
    const [item, setItem] = useState("");
    const [price, setPrice] = useState(0);

    const hadleSubmit = (e) => {
        e.preventDefault()
        if (item != "" && price != "") {
            if (create) {
                const newLists = [...expenseLists, { id: new Date().getTime(), item: item, price: price }]
                setExpenseLists(newLists)
                localStorage.setItem('expenseLists', JSON.stringify(newLists))
            } else {
                for (let list of expenseLists) {
                    if (list.id === editContent.id) {
                        list.item = item;
                        list.price = price;
                    }
                }
                setExpenseLists(expenseLists)
                localStorage.setItem('expenseLists', JSON.stringify(expenseLists))
            }
            setProperty();
        }
    }

    const setProperty = () => {
        setCreate(true);
        setItem("");
        setPrice(0);
        setStateProperty({
            view: true,
            msg: create ? "생성" : "수정",
            color: "green"
        })

        setTimeout(() => {
            setStateProperty({
                view: false
            });
        }, 2000)
    }

    useEffect(() => {
        if (!create) {
            setItem(editContent.item);
            setPrice(editContent.price);
        }
    }, [editContent])
    return (
        <Form onSubmit={hadleSubmit}>
            <InputContainer>
                <CRUDInput title={"지출 항목"} type={"text"} input={item} setInput={setItem} />
                <CRUDInput title={"비용"} type={"number"} input={price} setInput={setPrice} />
            </InputContainer>
            <button type="submit">{create ? "제출" : "수정"} <MdSend /></button>
        </Form>
    )
}

export default CRUDForm

const Form = styled.form`
    display: flex;
    flex-direction: column;
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

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
