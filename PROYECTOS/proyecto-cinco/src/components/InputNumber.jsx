import { useState } from 'react'
import Message from './Message';

function InputNumber({entrada, setEntrada}){
    
    return(
        <>
        <input
            type="number"
            className="form-control"
            placeholder="Ingresa un número"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
        />
        </>
    );
}

export default InputNumber