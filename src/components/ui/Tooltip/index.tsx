
import styled from './styled.module.scss'

interface TooltipProps{
    text: string
}

export function Tooltip({text}: TooltipProps){
    return(
        <div className={styled.Container}>
            <span>{text}</span>
        </div>
    )
}