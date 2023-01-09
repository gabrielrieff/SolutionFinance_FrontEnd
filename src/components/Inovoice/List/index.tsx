import { useState, useEffect } from 'react';
import { BsArrowDownCircle, BsArrowUpCircle,} from 'react-icons/bs'
import { VscGear } from 'react-icons/vsc'
import { TbEdit, TbTrash } from 'react-icons/tb'


import styled from './styled.module.scss'

type itenProps = {
    category_id: string;
    id: string;
    value: number;
    type: boolean;
    description: string;
    created_at: number;
    category: {
        id: string;
        title: string;
        abbreviation: string
    }
}

interface ListProps{
    bills: itenProps[];
    handleFinishTransaction: (id: string) => void;
    handleEdit: (id: string) => void
}

export function List( {bills, handleFinishTransaction, handleEdit}: ListProps ){

    function convertDate(date){
        var data = new Date(date);
        var newDate = data.toLocaleDateString();

        return(newDate)
    }
    
    return(
        <>

            <table className={styled.Content}>
                <thead className={styled.THead}>
                    <tr>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th><VscGear size={30}/></th>
                    </tr>
                </thead>
                <tbody className={styled.TBody}>
                {bills.map(item =>(
                    <tr key={item.id}>
                        <td>{item.type ? (<BsArrowUpCircle color='#157A0C' className={styled.iconType}/>) : (<BsArrowDownCircle color='#FF0000' className={styled.iconType}/>)}</td>
                        <td> {item.category.title}</td>
                        <td>{convertDate(item.created_at)}</td>
                        <td>{item.description}</td>
                        <td>R${item.value.toFixed(2)}</td>
                        <td> <TbEdit className={styled.iconEdit} onClick={()=> handleEdit(item.id)}/> <TbTrash className={styled.iconDelet} onClick={()=>handleFinishTransaction(item.id)}/></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    )}
