import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react';

import { motion} from 'framer-motion';
import { AuthContext } from './AuthProvider';

import usersRegistro from '../usersRegistro'


const useAuth = () => useContext(AuthContext);

// -----------------------------------------------------------------------------
// 🧩 Lección 5 – Renderizado Condicional & props.children | LoginModal
// -----------------------------------------------------------------------------
const LoginModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState(''); // Lección 2 (useState)
    const [password, setPassword] = useState('');
    const [estado, setEstado] = useState(true);
    const { login } = useAuth();
    const inputRef = useRef(null); // Lección 6 (useRef)

    // useEffect → enfoca el input cuando el modal se abre (ciclo de vida: mount).
    useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    // Handler estable gracias a useCallback (evita re‑crearse en cada render).
    const handleLogin = useCallback(
    (e) => {
        e.preventDefault();
        if (!username.trim()) return; // guard clause.

        //Buscar usuario

        usersRegistro.forEach(element => {
            if(element.user == username && element.password == password){
                login(username.trim());
                setEstado(true);
                onClose();
            }
        });
        
        console.log("usuario incorrecto")
        setEstado(false)

        setUsername('');
        setPassword('');
    },
    [login, username, password, onClose]
    );

    if (!isOpen) return null; // Render condicional básico.

    return (
    <motion.div
        /* Backdrop */
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
    >
        <motion.div
        /* Caja modal */
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
        >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
            placeholder="Ingresa tu nombre de usuario"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
            placeholder="Ingresa tu contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <span className="text-gray text-center w-full block pb-4">{estado ? "" : "Datos incorrectos"}</span>
        <div className="flex gap-3">
            <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
            Cancelar
            </button>
            <button
            type="button"
            onClick={handleLogin}
            disabled={!username.trim()}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
            Entrar
            </button>
        </div>
        </motion.div>
    </motion.div>
    );
};

export default LoginModal