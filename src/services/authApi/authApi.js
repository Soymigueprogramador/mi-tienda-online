import { data } from "react-router-dom";

// La api del backend
const api = "http://localhost:3000/api";

// Funcion para crear el regustro de usuarios
export const registerUser = async ( data ) => {
    // Llamamos a la api
    const res = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

// Funcion para crear el login de usuarios
export const loginUser = async (data) => {
    // Llamamos a la api
    const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};