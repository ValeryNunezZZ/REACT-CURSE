import { useEffect, useState } from "react";

function Panel ({gasolina, distancia, nombre}) {

    const [dis, setDis] = useState(distancia);
    const [gas, setGas] = useState(gasolina);
    const [nom, setNom] = useState(nombre);
    const [listo, setListo] = useState(false);
    const [estadoNave, setEstadoNave] = useState(0);

    useEffect(() => {

        console.log("¡El panel está listo!");

        const intervalo = setInterval(() => {
            
            setDis(prev => {
                if(prev<=0){
                    setListo(true);
                }else{
                    return (prev - 1);
                }
            });
            
            setGas(prev => {
                if(prev<=0){
                    setListo(true);
                }else{
                    return (prev - 1);
                }
            });
            
        }, 1000);

        return () => {
            console.log("El panel se ha apagado.")
        };
            
        
    }, []);

    useEffect(() => {
        console.log("¡Combustible actualizado!");
    }, [gas]);

    const aterrizar = () => {
        setEstadoNave(1);
    }

    return(
        <>
    <div className="container text-center py-4">
        <h1 className="mb-4">Viajando a <span className="text-primary">{nom}</span></h1>

        {listo ? (
            estadoNave === 0 ? (
                <button className="btn btn-success" onClick={aterrizar}>Aterrízame</button>
            ) : (
                <h2 className="text-success">¡Has llegado a tu destino!</h2>
            )
        ) : (
            <div className="row justify-content-center gap-2">
                <div className="col-md-3">
                    <label>Distancia</label>
                    <input className="form-control text-center" value={dis} readOnly />
                </div>
                <div className="col-md-3">
                    <label>Gasolina</label>
                    <input className="form-control text-center" value={gas} readOnly />
                </div>
            </div>
        )}
    </div>
</>

    );
}

export default Panel