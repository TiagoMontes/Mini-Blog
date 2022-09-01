import { useState, useEffect, useReducer } from "react";
import {db} from "../firebase/config";
//Firebase não usa tabelas, ele guarda em collections, addDoc adiciona um documento na collection e Timestamp que marca o horário do post criado
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    success: null,
}

const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {
                loading: true,
                error: null,
            }
        case "SUCCESS":
            return {
                loading: false,
                error: null,
            }
        case "ERROR":
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        })

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertDocument = await addDoc(
                collection(db, docCollection),
                newDocument
                )

                checkCancelBeforeDispatch({
                    type: "INSERT_DOC",
                    payload: insertDocument,
                })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }

    useEffect(() => {
        return () => 
            setCancelled(true);
    }, []);

    return { insertDocument, response };
}