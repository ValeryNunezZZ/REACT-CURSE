
function Tarjeta(){
    const nombre = "Valery Núñez";
    const profesion = "Estudiante";
    const mensaje = "Hola y bienvenid@ a mi tarjeta de presentación!"

    return (

        <div style={{background: '#3299', border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center'}}>
            <h2>{nombre}</h2>
            <h4>{profesion}</h4>
            <p>{mensaje}</p>

            <img style={{borderRadius: '100%', width: '150px', height: '150px'}} src="YO.jpg"></img>
        </div>

    );
}

export default Tarjeta;