import React from 'react'

function MySelect({options, defaultValue, value, onChangeHello}) {
    return (
        <select
            value={value}
            onChange={event => onChangeHello(event.target.value)}
        >
            <option disabled value='' >{defaultValue}</option>
                {options.map(option => 
                    <option 
                        key={option.value}
                        value={option.value}> {option.name}
                    </option>
                )}
        </select>
    )
}

export default MySelect
