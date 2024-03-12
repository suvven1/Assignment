import React, { useEffect, useState } from 'react'

const Total = ({ expenseLists }) => {
    const total = expenseLists.reduce((acc, current) => { return parseInt(acc) + parseInt(current.price) }, 0);

    return (
        <h2 style={{ width: '930px', textAlign: 'end' }}>
            총 지출 : {total}원
        </h2>
    )
}

export default Total
