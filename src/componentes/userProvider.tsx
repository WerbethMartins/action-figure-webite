import React, { useState, createContext } from 'react'; 
import type {UserContextType} from "../interface/userContext";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Inicializa o estado tentando buscar no localstorage
    const [user, setUser] = useState<UserContextType['user']>(() => {
        const savedUser = localStorage.getItem("@AnimesAction:user");
        return savedUser ? JSON.parse(savedUser) : null; 
    })

    const signIn = (userData: UserContextType['user']) => {
        setUser(userData);
        // Salva no navegador
        localStorage.setItem("@AnimesActions:user", JSON.stringify(userData));
    };

    const signOut = () => {
        setUser(null);
        // Limpa o navegador
        localStorage.removeItem("@AnimesActions:user");
    };
    
    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};