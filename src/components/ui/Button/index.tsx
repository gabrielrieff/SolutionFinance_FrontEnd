import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from './styled.module.scss'
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean,
    children: ReactNode
}

export function Button({loading, children, ...rest}: ButtonProps){
    return(
        <button className={styled.button} disabled={loading} {...rest}>
            {loading ? (<FaSpinner color="#FFF" size={26} />) : 
            (
                <a>{children}</a>
            )}
        </button>
        )
}