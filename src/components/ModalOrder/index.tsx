
import Modal from 'react-modal';

import { FormEvent, useState } from 'react';
import { modalNewInovoice } from '../../pages/inovoice'

import styled from './styled.module.scss'

type categoryProps = {
    map(arg0: (res: any) => JSX.Element): import("react").ReactNode;
    id: string;
    title: string
}


interface modalOrderProps {
    categories: categoryProps;
    createInovoice: ({description, value, type, category_id}: modalNewInovoice) => Promise<void>;
    isOpen: boolean;
    onRequestClose: () => void;
}


export function ModalOrder({categories, createInovoice, isOpen, onRequestClose,}: modalOrderProps ){
        
    const [description, setDescription] = useState('');
    const [num, setNum] = useState('')
    const [category_id, setCategory] = useState('')
    const [tipo, setTipo] = useState('')

    async function handleInovoice(event: FormEvent) {
        event.preventDefault();

        var type = false

        if(description === '' || num === '' || category_id === '' || tipo === ''){
            return;
        }
        
        if(tipo === 'true'){
            type = true
        }

        let value = Number(num)

          let data = {
            description,
            value,
            type,
            category_id
          }

          await createInovoice(data)
          setDescription('')
          setCategory('')
          setNum('')
          setTipo('')
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
            <form onSubmit={handleInovoice} className={styled.container}>
                <h3>Nova transação</h3>
                <div>
                    <label>
                        <span>Tipo</span>
                        <select onChange={(e) => setTipo(e.target.value)}>
                            <option></option>
                            <option value={'true'}>Entrada</option>
                            <option value={'false'}>Saída</option>
                        </select>
                    </label>
                    <label>
                        <span>Categoria</span>
                        <select  onChange={(e) => setCategory(e.target.value)}>
                            <option value={''}></option>
                            {categories.map(res => (
                                <option key={res.id} value={res.id} >{res.title}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>valor</span>
                        <input type={'number'} value={num} onChange={(e) => setNum(e.target.value)}/>
                    </label>
                </div>

                <div>                    
                    <label>
                        <span>Descrição</span>
                        <input type={'text'} value={description} onChange={(e) => setDescription(e.target.value)}/>
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

                    <button  type={'submit'}>Salvar</button>

                </div>

            </form>
        </Modal>
    )
}


