import { useState } from "react";

function ListaCompras() {
const [productos, setProductos] = useState([]);
const [nuevoProducto, setNuevoProducto] = useState("");

const [editandoIndex, setEditandoIndex] = useState(-1);
const [productoEditado, setProductoEditado] = useState("");

const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto("");
    }
};

const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
};

const iniciandoEdicion = (index) => {
    setEditandoIndex(index);
    setProductoEditado(productos[index]);
};

const guardarEdicion = (index) => {
    const copia = [...productos];
    copia[index] = productoEditado;
    setProductos(copia);
    setEditandoIndex(-1);
    setProductoEditado("");
};

return (
    <div style={{
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif"
    }}>
    <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        🛒 Lista de Compras
    </h2>

    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
        type="text"
        value={nuevoProducto}
        onChange={(e) => setNuevoProducto(e.target.value)}
        placeholder="Agrega un producto..."
        style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px"
        }}
        />
        <button
        onClick={agregarProducto}
        style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
        }}
        >
        Agregar
        </button>
    </div>

    <ul style={{ listStyle: "none", padding: 0 }}>
        {productos.map((producto, index) => (
        <li
            key={index}
            style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            color: "black",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
        >
            {editandoIndex === index ? (
            <>
                <input
                type="text"
                value={productoEditado}
                onChange={(e) => setProductoEditado(e.target.value)}
                style={{
                    flex: 1,
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginRight: "10px"
                }}
                />
                <button
                onClick={() => guardarEdicion(index)}
                style={{
                    padding: "8px 12px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                >
                Guardar
                </button>
            </>
            ) : (
            <>
                <span style={{ flex: 1 }}>{producto}</span>
                <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={() => eliminarProducto(index)}
                    style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer"
                    }}
                >
                    Eliminar
                </button>
                <button
                    onClick={() => iniciandoEdicion(index)}
                    style={{
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer"
                    }}
                >
                    Editar
                </button>
                </div>
            </>
            )}
        </li>
        ))}
    </ul>
    </div>
);
}

export default ListaCompras;
