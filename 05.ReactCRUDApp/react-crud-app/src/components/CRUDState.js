import React from 'react'

const CRUDState = ({ stateProperty }) => {

    const getStyles = () => {
        return {
            width: '900px',
            textAlign: 'center',
            padding: '20px',
            marginTop: '30px',
            backgroundColor: stateProperty.color,
            color: "white",
            display: stateProperty.view ? "block" : "none"
        }
    }

    return (
        <div style={getStyles()}>
            아이템이 {stateProperty.msg}되었습니다.
        </div>
    )
}

export default CRUDState
