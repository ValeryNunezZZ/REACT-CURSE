import { useState } from "react";
import { useReducer, useRef, useCallback, useEffect } from "react";

const initialState = { count: 0, history: [] };

function reducer(state, action) {
    switch (action.type) {
        case "increment":

            if(action.value > 0){

                let cantAct = state.count;
                console.log("cantAct: ", cantAct);
                
                for(let i=0 ; i<action.value ; i++){
                    cantAct++;
                    state.history.push(`+1 (Nuevo valor: ${cantAct})`);
                }

                return {
                    count: state.count + parseInt(action.value),
                    history: state.history
                }
            }

            return { 
                count: state.count + 1, 
                history: [...state.history, `+1 (Nuevo valor: ${state.count + 1})`] 
            };
        case "decrement":
            return { 
                count: state.count - 1, 
                history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`] 
            };
        case "reset":
            return initialState;

        case "undo":

            if(state.history.length == 0) return state

            const type = state.history[state.history.length-1][0];
            const auxHistory = state.history.slice(0,state.history.length-1);

            return{
                count: type != '+'?state.count+1:state.count-1, 
                history: auxHistory 
            }

        default:
            return state;
    }
}


function CounterGame() {

    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('state')));
    const [cant, setCant] = useState(0);
    const incrementBtnRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
        console.log(localStorage.getItem('state'));
    }, [state])

    const handleIncrement = useCallback(() => {
        //console.log(cant)
        dispatch({ type: "increment", value: cant});
    }, [cant]);
    
    const handleDecrement = useCallback(() => {
        dispatch({ type: "decrement" });
    }, []);

    const handleUndo = useCallback(() => {
        dispatch({type: "undo"});
    }, []);

    // Fijar el foco en el botón de incremento al renderizar
    useEffect(() => {
    incrementBtnRef.current.focus();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Contador: <span className="badge bg-primary">{state.count}</span></h2>

            <div className="mb-3 d-flex gap-2 flex-wrap">
                <button ref={incrementBtnRef} onClick={handleIncrement} className="btn btn-success">+</button>
                <button onClick={handleDecrement} className="btn btn-danger">-</button>
                <button onClick={() => dispatch({ type: "reset" })} className="btn btn-secondary">Reset</button>
                <button onClick={handleUndo} className="btn btn-warning">Undo</button>
            </div>

            <div className="mb-4">
                <label htmlFor="cantInput" className="form-label">Cantidad a incrementar</label>
                <input
                    id="cantInput"
                    type="number"
                    className="form-control"
                    value={cant}
                    onChange={(e) => setCant(parseInt(e.target.value) || 0)}
                />
            </div>

            <div>
                <h3>Historial de cambios:</h3>
                <ul className="list-group">
                    {state.history.map((entry, index) => (
                        <li key={index} className="list-group-item">{entry}</li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default CounterGame