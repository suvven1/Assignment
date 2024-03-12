import React, { useState } from 'react'
import styled from 'styled-components'

const CRUDInput = ({ title, type, input, setInput }) => {
    return (
        <Input>
            <Title>{title}</Title>
            <input
                type={type}
                value={input}
                onChange={(e) => { setInput(e.target.value) }}
                placeholder={type == "text" ? "예) 렌트비" : "예) 1000"} />

        </Input>
    )
}

export default CRUDInput
const Input = styled.div`
    width: 100%;
    input {
        width: 95%;
        border-style: none;
        border-bottom: 1px solid lightgray;
        padding: 10px 0 10px 0;
        font-size: 18px;
    }

    input:focus{
        outline: none;
    }
`;

const Title = styled.div`
    color: rgb(215, 174, 93);
`;