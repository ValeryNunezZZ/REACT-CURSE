import { useEffect, useState } from 'react'


function Message({aleatorio, entrada, aumentarScore, setEntrada}){

    const [mensaje, setMensaje] = useState('');

/*  0 = menor
    1 = mayor
    3 = igual */

    useEffect(()=>{
        const a = parseInt(aleatorio);
        const e = parseInt(entrada);

        if(isNaN(e)){
            setMensaje('Ingresa un numero');
        }else{
            if(aleatorio == entrada){
                setEntrada('');
                aumentarScore();
                setMensaje('¡Correcto!');
            }else if(aleatorio > entrada){
                setMensaje('El número es mayor');
            }else{
                setMensaje('El número es menor');
            }
        }
    }, [entrada, aleatorio])
    
    return(
        <>
            <div className="alert alert-info text-center" role="alert">
                {mensaje}
            </div>
        </>
    );
}

export default Message