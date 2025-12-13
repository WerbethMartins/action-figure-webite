import React, { useState, createContext } from 'react'; 
import type {UserContextType} from "../interface/userContext";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserContextType['user']>(null);

    const signIn: UserContextType['signIn'] = (userData: UserContextType['user']) => {
        // Lógica de login 
        setUser(userData);
    };

    const signOut: UserContextType['signOut'] = () => {
        // Lógica de logout
        setUser(null);
    };
    
    // O objeto de valor que será compartilhado
    const value = { user, signIn, signOut };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};