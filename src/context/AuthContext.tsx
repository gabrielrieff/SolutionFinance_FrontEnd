import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';

import { api } from '../services/apiClient';
import Router from 'next/router'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
    newInovoice: (credentials: newInovoiceProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type  AuthProviderProps = {
    children: ReactNode
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

export type newInovoiceProps = {
    description: string;
    value: number;
    type: boolean;
    category_id: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    }catch{
        console.log('Error singOut');
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser]= useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() =>{
        const {'@nextauth.token': token} = parseCookies();

        if(token){
            api.get('/detail').then(response =>{
                const {id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() =>{
                signOut();
            })
        }
    } ,[])

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('session',{
                email,
                password
            })

            const {id, name, token} =  response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //expira em 30 dias
                path: "/"
            })

            setUser({
                id, name, email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/dashboard')


        }catch(err){
        }
    }

    async function signUp({name, email, password}: SignUpProps) {
        try{
            const response = await api.post('/users',{
                name,
                email,
                password
            })

            Router.push('/')
        }catch(err){

        }
    }

    async function newInovoice({description, value, type, category_id}: newInovoiceProps){
        try{
            const response = await api.post('/inovoice',{
                description,
                value,
                type,
                category_id
            })
        }catch(err){

        }
    }

    // async function saveEdit({id, description, value, type, category_id}: editOrderProps){
    //     console.log('OK')
    //     try{
    //         const response = await api.put('/inovoice/uptade',{
    //             id: id,
    //             description: description,
    //             value: value,
    //             type: type,
    //             category_id: category_id
    //         })
    //     }catch(err){
    //         console.log('Erro' , err)
    //     }
    // }
    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, newInovoice}}>
            {children}
        </AuthContext.Provider>
    )
}