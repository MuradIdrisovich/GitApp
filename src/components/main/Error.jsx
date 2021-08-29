import React from 'react'

function Error(props) {
    return (
        <div style={{textAlign: 'center'}}>
            <button onClick={()=> props.history.push('/')}>GO TO MAIN PAGE</button>
            <div>ERROR!</div>
        </div>
    )
}

export default Error
