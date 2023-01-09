import styled from './styled.module.scss'

type PropsCard = {
    text: string;
    icon: any;
    value: number;
    colors: string;
    back: string;
    colorsIco: string
}


export function Card({text, icon, value, colors, back, colorsIco}: PropsCard){
    const background ={ background : back };
    const cor = {color: colors};
    const colorIcon = {color: colorsIco}
    return(
        <div className={styled.Content} style={background}>
            <div className={styled.top}>
                <span style={cor}>{text}</span>
                <i style={colorIcon} >{icon}</i>
            </div>
            <span style={cor}>R${value}</span>
        </div>
    )
}

