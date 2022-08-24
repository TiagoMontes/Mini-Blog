// Importações do Firebase
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // Vamos trabalhar com cleanup, já que teremos muitas mudanças de componentes e páginas, não podemos deixar resquicios de funções sendo executadas para assim evitar problemas de limite de memória
    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth()
    // consigo usar funções de autenticação a partir daqui, mas não significa que o usuário esteja autenticado

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

}