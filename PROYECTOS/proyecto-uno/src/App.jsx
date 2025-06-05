import Tarjeta from "./Tarjeta";

function App(){

  return(

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <h1 style={{textAlign: 'center'}}>Tarjeta de Presentación</h1>
      <Tarjeta />
    </div>

  );
}

export default App;