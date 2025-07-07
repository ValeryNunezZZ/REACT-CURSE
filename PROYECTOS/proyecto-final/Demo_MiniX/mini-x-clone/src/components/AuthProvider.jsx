import React, {
  useCallback,
  useReducer,
  createContext,
} from 'react';

// -----------------------------------------------------------------------------
// 🧩 Lección 6 – useReducer + Context | Autenticación global
// -----------------------------------------------------------------------------
// 💡 createContext() crea un "túnel" para compartir estado sin prop‑drilling.
const AuthContext = createContext(null);

// Reducer -> patrón tipo Redux pero sin librerías externas.
const authReducer = (state, action) => {
switch (action.type) {
    case 'LOGIN':
    return { user: action.user, isAuthenticated: true };
    case 'LOGOUT':
    return { user: null, isAuthenticated: false };
    default:
    return state; // ⚠️ BEST PRACTICE: reducer siempre devuelve estado válido.
}
};

// Componente proveedor (Provider) – envuelve a <App/>. Similar al RouteProvider
const AuthProvider = ({ children }) => {
const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
});

// useCallback -> la identidad de la función sólo cambia cuando cambie dispatch.
const login = useCallback((username) => {
    // Para principiantes: nunca mutamos el estado, sólo despachamos acciones.
    dispatch({ type: 'LOGIN', user: { username, avatar: '👤' } });
}, []);

const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), []);

// ⚠️ BEST PRACTICE: Memoizar el value si fuera un objeto con refs grandes.
return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};


export default AuthProvider;
export { AuthContext };
