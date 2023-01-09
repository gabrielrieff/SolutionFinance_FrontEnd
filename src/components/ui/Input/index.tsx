
import { InputHTMLAttributes } from "react";
import styled from './styled.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    text: string
}

export function Input({text,...rest}: InputProps){
    return(
        <label className={styled.input}>
            <span>{text}</span>
            <input {...rest} />
        </label>
    )
}