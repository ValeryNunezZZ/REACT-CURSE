
function RestarButton({nuevoJuego, entrada, setEntrada}){

    return(
        <>
            <button
                className="btn btn-success mt-3"
                onClick={() => nuevoJuego()}
            >
                🔄 Reiniciar
            </button>
        </>
    );
}

export default RestarButton