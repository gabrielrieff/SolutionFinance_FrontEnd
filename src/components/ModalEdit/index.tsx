
import Modal from 'react-modal'

import { FormEvent, useState } from 'react';
import { editOrderProps } from '../../pages/inovoice/'


import styled from './styled.module.scss'

type categoryProps = {
    map(arg0: (res: any) => JSX.Element): import("react").ReactNode;
    id: string;
    title: string
}

interface modalOrderProps {
    categories: categoryProps;
    isOpen: boolean;
    onRequestClose: () => void;
    order: editOrderProps;
    editOrder: (credentials: editOrderProps) => Promise<void>
}


export function ModalEdit({categories, isOpen, onRequestClose, order, editOrder}: modalOrderProps ){
    const { id, value, description, type, category_id } = order

    const [orderId, setOrderId] = useState(id)

    const [category, setCategory] = useState('')
    const [newType, setNewType] = useState('')
    const [newValue, setNewValue] = useState('')

    const [oldType, setOldType] = useState(type)
    const [oldDescription, setOldDescription] = useState(description)
    const [oldValue, setOldValue] = useState(value)
    const [oldCategory, setOldCategory] = useState(category_id)

    async function handleEditOrder(event: FormEvent){
        event.preventDefault();

        var id = orderId;
        var description = oldDescription;
        var category_id = category === "" ? oldCategory : category;
        var tipo = newType === '' ? oldType : newType;
        
        var teste = newValue === "" ? oldValue : newValue;

        if(tipo === 'true'){
            tipo = true
        }else if(tipo === 'false'){
            tipo = false
        }

        var value = Number(teste)
        var type = Boolean(tipo)

        let data = {
            id,
            description,
            value,
            type,
            category_id
          }

       await editOrder(data)

          setCategory('')
          setNewType('')
          setNewValue('')
          setOldDescription('')

    }

    const customStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.80)'
        },
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F0F2F5',
            width: '50%',
            height: '50%',

        }
    }

    return(
        <Modal
            onRequestClose={onRequestClose}
            isOpen={isOpen}
            style={customStyle}
        >
            <form onSubmit={handleEditOrder} className={styled.container}>
                <h3>Editar transação</h3>
                <div>
                    <label>
                        <span>Tipo</span>
                        <select onChange={(e)=>{ setNewType(e.target.value)}}>
                            <option></option>
                            <option value={'true'}>Entrada</option>
                            <option value={'false'}>Saída</option>
                        </select>
                    </label>
                    <label>
                        <span>Categoria</span>
                        <select  onChange={(e)=>{ setCategory(e.target.value)}}>
                            <option value={''}></option>
                            {categories.map(res => (
                                <option key={res.id} value={res.id} onChange={()=>{}}>{res.title}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>valor</span>
                        <input type={'number'} value={newValue} onChange={(e)=>{ setNewValue(e.target.value)}}/>
                    </label>
                </div>

                <div>                    
                    <label>
                        <span>Descrição</span>
                        <input type={'text'} value={oldDescription} onChange={(e)=>{ setOldDescription(e.target.value)}}/>
                    </label>
                </div>

                <div className={styled.containerBnt}>
                    <button 
                        type={'submit'}
                        onClick={onRequestClose}
                        className='react-modal-close'
                        >
                        Cancelar
                    </button>

                    <button type={'submit'}>Editar</button>

                </div>

            </form>
        </Modal>
    )
}


