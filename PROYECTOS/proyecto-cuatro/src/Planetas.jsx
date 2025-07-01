import { useEffect, useState } from "react";
import Panel from "./Panel";
import planetasJSON from "./planetasJSON";

function Planetas () {
    const [nombre, setNombre] = useState("");
    const [desc, setDesc] = useState("");
    const [aEditar, setAEditar] = useState(-1);
    const [editandoNombre, setEditandoNombre] = useState("");
    const [editandoDesc, setEditandoDesc] = useState("");

    const [distancia, setDistancia] = useState(0);
    const [gasolina, setGasolina] = useState(0);

    const [nombreViaje, setNombreViaje] = useState(0);
    const [distanciaViaje, setDistanciaViaje] = useState(0);
    const [gasolinaViaje, setGasolinaViaje] = useState(0);
    const [iniciarViaje, setIniciarViaje] = useState(false);

    const [planetas, setPlanetas] = useState(() => {
        const local = JSON.parse(localStorage.getItem('planetas'));
        const json = JSON.parse(JSON.stringify(planetasJSON));
        return local && local.length > 0 ? local : json;
    });

    useEffect(() => {
        localStorage.setItem('planetas', JSON.stringify(planetas));
    }, [planetas]);

    const registrarPlaneta = () => {
        if(nombre === "" || desc === ""){
            alert("No ingrese campos vacíos");
            return;
        }

        const nuevaDistancia = Math.floor(Math.random() * (100 - 1) + 1);
        const nuevaGasolina = Math.floor(Math.random() * (100 - 1) + 1);

        const planeta = {
            nombre,
            desc,
            distancia: nuevaDistancia,
            gasolina: nuevaGasolina
        };

        setPlanetas([...planetas, planeta]);
        setNombre("");
        setDesc("");
    };

    const eliminarPlaneta = (index) => {
        setPlanetas(planetas.filter((_, i) => i !== index));
    };

    const editarPlaneta = (index) => {
        setEditandoNombre(planetas[index].nombre);
        setEditandoDesc(planetas[index].desc);
        setAEditar(index);
    };

    const guardarPlaneta = (index) => {
        const planetaEditado = {
            nombre: editandoNombre,
            desc: editandoDesc,
            distancia: planetas[index].distancia,
            gasolina: planetas[index].gasolina
        };

        const planetasAux = [...planetas];
        planetasAux[index] = planetaEditado;
        setPlanetas(planetasAux);
        setAEditar(-1);
    };

    const viajarAPlaneta = (index) => {
        setIniciarViaje(!iniciarViaje);
        setNombreViaje(planetas[index].nombre);
        setDistanciaViaje(planetas[index].distancia);
        setGasolinaViaje(planetas[index].gasolina);
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Registrar Planeta</h1>
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Descripción" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary w-100" onClick={registrarPlaneta}>Registrar</button>
                </div>
            </div>

            <h2 className="mb-3">Planetas Registrados</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {planetas.map((planeta, index) => (
                    <div className="col" key={index}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                {aEditar === index ? (
                                    <>
                                        <input type="text" className="form-control mb-2" value={editandoNombre} onChange={(e) => setEditandoNombre(e.target.value)} />
                                        <input type="text" className="form-control mb-2" value={editandoDesc} onChange={(e) => setEditandoDesc(e.target.value)} />
                                        <button className="btn btn-success me-2" onClick={() => guardarPlaneta(index)}>Guardar</button>
                                        <button className="btn btn-secondary" onClick={() => setAEditar(-1)}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="card-title">{planeta.nombre}</h5>
                                        <p className="card-text">{planeta.desc}</p>
                                        <p className="card-text"><strong>Distancia:</strong> {planeta.distancia}</p>
                                        <p className="card-text"><strong>Gasolina:</strong> {planeta.gasolina}</p>
                                        <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                                            <button className="btn btn-danger" onClick={() => eliminarPlaneta(index)}>Eliminar</button>
                                            <button className="btn btn-warning" onClick={() => editarPlaneta(index)}>Editar</button>
                                            <button className="btn btn-info text-white" onClick={() => viajarAPlaneta(index)}>Viajar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                {iniciarViaje && (
                    <Panel 
                        nombre={nombreViaje} 
                        gasolina={gasolinaViaje} 
                        distancia={distanciaViaje} 
                    />
                )}
            </div>
        </div>
    );
}

export default Planetas;
