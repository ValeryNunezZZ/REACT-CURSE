import { useState, useEffect, useMemo } from "react";

function Formulario() {
    const [nuevaTarea, setNuevaTarea] = useState('');
    const [duracion, setDuracion] = useState('');
    const [tarea, setTarea] = useState([]);

    const [indexEditado, setIndexEditado] = useState(-1);
    const [valorEditadoDuracion, setValorEditadoDuracion] = useState('');
    const [valorEditadoNombre, setValorEditadoNombre] = useState("");

    const agregarTarea = () => {
        if (nuevaTarea !== "") {
            const objTarea = {
                nombre: nuevaTarea,
                duracion: parseInt(duracion)
            };
            setTarea([...tarea, objTarea]);
            setNuevaTarea('');
            setDuracion('');
        }
    };

    const calcularTiempo = useMemo(() => {
        return tarea.reduce((acumulado, actual) => acumulado + actual.duracion, 0);
    }, [tarea]);

    const comenzandoEdicion = (id) => {
        setIndexEditado(id);
        setValorEditadoNombre(tarea[id].nombre);
        setValorEditadoDuracion(tarea[id].duracion);
    };

    const guardarNuevaInfo = (index) => {
        const objAux = {
            nombre: valorEditadoNombre,
            duracion: parseInt(valorEditadoDuracion)
        };
        const tareaAux = [...tarea];
        tareaAux[index] = objAux;
        setTarea(tareaAux);
        setIndexEditado(-1);
        setValorEditadoNombre('');
        setValorEditadoDuracion('');
    };

    const eliminarElemento = (index) => {
        setTarea(tarea.filter((_, i) => i !== index));
    };

    useEffect(() => {
        document.title = `Total: ${calcularTiempo} minutos`;
    }, [calcularTiempo]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gestor de Tareas</h2>

            <div className="mb-3 row g-2 align-items-end">
                <div className="col-md-5">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nuevaTarea} 
                        onChange={(e) => setNuevaTarea(e.target.value)} 
                        placeholder="Tarea" 
                    />
                </div>
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={duracion} 
                        onChange={(e) => setDuracion(e.target.value)} 
                        placeholder="Duración (minutos)" 
                    />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary w-100" onClick={agregarTarea}>
                        Agregar Tarea
                    </button>
                </div>
            </div>

            <ul className="list-group mb-4">
                {tarea.map((element, index) => (
                    <li key={index} className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                        {indexEditado === index ? (
                            <>
                                <input 
                                    className="form-control me-2 mb-2 mb-md-0"
                                    value={valorEditadoNombre} 
                                    onChange={(e) => setValorEditadoNombre(e.target.value)} 
                                />
                                <input 
                                    className="form-control me-2 mb-2 mb-md-0"
                                    value={valorEditadoDuracion} 
                                    onChange={(e) => setValorEditadoDuracion(e.target.value)} 
                                />
                                <button className="btn btn-success" onClick={() => guardarNuevaInfo(index)}>Guardar</button>
                            </>
                        ) : (
                            <>
                                <div className="flex-grow-1">
                                    <strong>{element.nombre}</strong> - {element.duracion} min
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-danger" onClick={() => eliminarElemento(index)}>Eliminar</button>
                                    <button className="btn btn-secondary" onClick={() => comenzandoEdicion(index)}>Editar</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <div className="alert alert-info text-center">
                <strong>Duración total:</strong> {calcularTiempo} minutos
            </div>
        </div>
    );
}

export default Formulario;
