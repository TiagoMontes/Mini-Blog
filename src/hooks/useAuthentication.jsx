// Importações do Firebase
import { db } from "../firebase/config";

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

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        // A declaração try...catch marca um bloco de declarações para testar (try), e especifica uma resposta, caso uma exceção seja lançada
        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            
            // Atualizando usuário
            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false);
        
          return user
        } catch (error) {
            
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "Email já cadastrado"
            } else {
                // Erro relacionado ao sistema
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            
            setError(systemErrorMessage)
        }

        setLoading(false);
    }

    // Com isso evitaremos memory limit e teremos uma aplicação mais performática
    useEffect(() => {
        return () => setCancelled(true)
    },[])


    return{
        auth,
        createUser,
        error,
        loading,
    }
}