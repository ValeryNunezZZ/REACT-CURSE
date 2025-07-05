import { useParams } from 'react-router-dom';

function Cita() {
    const { id } = useParams();
    
    return (
        <div>
            <h2>Detalles de la Cita</h2>
            <p>ID de la cita: {id}</p>
        </div>
    );
}

export default Cita;
