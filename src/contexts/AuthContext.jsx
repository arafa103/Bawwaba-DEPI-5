
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { login, logout, getUserContext } from '../services/authService';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [studentId,setStudentId] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser === null) {
                    setUser(null);
                    setRole(null);
                    setStudentId(null);
                    return;
                }

                setUser(firebaseUser);

                const userData = await getUserContext(firebaseUser.uid);
                setRole(userData?.role ?? null);
                setStudentId(userData?.studentId ?? null);

            } catch (error) {
                console.error('Error loading user data:', error);
                setRole(null);
                setStudentId(null);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        role,
        loading,
        studentId,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
