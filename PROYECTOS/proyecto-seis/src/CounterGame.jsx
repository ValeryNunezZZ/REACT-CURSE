import { useReducer, useRef, useCallback, useEffect } from "react";

const initialState = { count: 0, history: [] };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
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
    const [state, dispatch] = useReducer(reducer, initialState);
    const incrementBtnRef = useRef(null);

    const handleIncrement = useCallback(() => {
        dispatch({ type: "increment" });
    }, []);
    
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
        <div>
            <h2>Contador: {state.count}</h2>
            {/*<button ref={incrementBtnRef} onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button> */}
            <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>

            {/* EJERCICIO 1 */}

            <button onClick={handleUndo}>Undo</button>

            <h3>Historial de cambios:</h3>
            <ul>
            {state.history.map((entry, index) => (
                <li key={index}>{entry}</li>
            ))}
            </ul>
        </div>
    );
}

export default CounterGame