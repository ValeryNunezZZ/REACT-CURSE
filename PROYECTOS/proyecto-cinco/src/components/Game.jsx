import { useState } from 'react'
import InputNumber from './InputNumber';
import Message from './Message';
import RestarButton from './RestarButton';
import Puntaje from './Puntaje';

function Game() {

    const [aleatorio, setAleatorio] = useState(Math.floor(Math.random() * 99 + 1));
    const [entrada, setEntrada] = useState('');
    const [calculo, setCalculo] = useState(true);
    const [score, setScore] = useState(0);

    function nuevoJuego(){
        setEntrada('');
        setAleatorio(Math.floor(Math.random() * 99 + 1));
    }

    function aumentarScore(){
        setScore(score + 1);
    }


    return(
        <>
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Score: <Puntaje score={score} /></h4>
            </div>

            <div className="card p-4 shadow-sm">
            <div className="mb-3">
                <InputNumber setEntrada={setEntrada} entrada={entrada} />
            </div>

            {calculo && (
                <div className="mb-3">
                <Message
                    entrada={entrada}
                    aleatorio={aleatorio}
                    aumentarScore={aumentarScore}
                    setEntrada={setEntrada}
                />
                </div>
            )}

            <div className="text-center">
                <RestarButton nuevoJuego={nuevoJuego} score={score} />
            </div>
            </div>
        </div>
        </>

    );
}

export default Game