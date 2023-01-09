import { canSSRAuth } from "../../utils/canSSRAuth";
import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { setupAPIClient } from '../../services/api'
import { AuthContext} from '../../context/AuthContext'

import { Card } from '../../components/Inovoice/Card';
import { List } from '../../components/Inovoice/List';
import { ModalOrder } from '../../components/ModalOrder'
import { ModalEdit } from '../../components/ModalEdit'

import Modal from 'react-modal'

import { BsArrowDownCircle, BsArrowUpCircle, BsCurrencyDollar } from 'react-icons/bs'

import styled from './styled.module.scss';


export type modalNewInovoice ={
    description: string;
    value: number;
    type: boolean;
    category_id: string;
}


export type editOrderProps = {
    id: string;
    description?: string;
    value?: number;
    type?: boolean;
    category_id?: string;
}


export default function Inovoice({bills, result, category}){

    const {entrada, saida, total} = result
    const { newInovoice } = useContext(AuthContext)

    const [modalItem, setModalItem ] = useState<editOrderProps>();
    const [modalOrderVisible, setModalOrderVisible ] = useState(false)
    const [modalEditVisible, setModalEditVisible ] = useState(false)
    const [orderList, setOrderList] = useState(bills || [])

    const [exist, setExist] = useState(saida)
    const [prohibited, setProhibited] = useState(entrada)
    const [sum, setSum] = useState(total)


    function handleCloseModalOrder(){
        setModalOrderVisible(false)
    }

    function handleCloseModalEdit(){
        setModalEditVisible(false)
    }
    
    function handleOpenModal() {
        setModalOrderVisible(true);
    }

    async function listLoading(){
        var saida = 0
        var entrada = 0
        var soma = 0
        const apiClient = setupAPIClient()

        const response = await apiClient.get('inovoice/all')
        const res = response.data
    
        for(var i = 0; i < res.length; i++){
            if(res[i].type === false){
                saida += res[i].value
            }else{
                entrada += res[i].value
            }
        };
    
        soma = entrada - saida
        
        setExist(saida.toFixed(2))
        setProhibited(entrada.toFixed(2))
        setSum(soma.toFixed(2))
        setOrderList(response.data)
    }

    async function handleDeleteTransaction(id: string) {
        const apiClient = setupAPIClient()
        await apiClient.delete('inovoice/delete', {
            params:{
                id: id,
            }
        })

        listLoading()

    }

    async function handleOpenModalEdit(id: string){
        const apiClient = setupAPIClient()

            const res = await apiClient.get('Inovoice/detail',{
                 params:{
                     id: id,
                 }
             });

        setModalItem(res.data);
        setModalEditVisible(true);
    }

    async function handleInovoice({description, value, type, category_id}: modalNewInovoice) {

          let data = {
            description,
            value,
            type,
            category_id
          }

          await newInovoice(data)

          listLoading()
  
    }


    async function handleEditOrder({id, description, category_id, type, value}:editOrderProps ) {
        const apiClient = setupAPIClient();

        try{
            const response = await apiClient.put('/inovoice/uptade',{
                    id: id,
                    description: description,
                    value: value,
                    type: type,
                    category_id: category_id,     
            })
            
            listLoading()
            handleCloseModalEdit()

        }catch(err){
        }

    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Finance</title>
            </Head>
            <div className={styled.content}>
                <div className={styled.background} >
                    <div>
                        <span>Solution</span>
                        <span>.</span>
                        <span>finance</span>
                        <span>$$</span>
                    </div>
                </div>

                <div className={styled.main}>
                    <div className={styled.Header}>
                        <Card
                            colors="#5F5F5F"
                            back="#FFF"
                            colorsIco="#18781B"
                            icon={<BsArrowUpCircle />}
                            value={prohibited}
                            text='Entrada'/>
                        <Card
                            colors="#5F5F5F"
                            back="#FFF"
                            colorsIco="#FF0000"
                            icon={<BsArrowDownCircle />}
                            value={exist}
                            text='Saída'
                        />
                        <Card                        
                            colors="#FFF"
                            back="#49AA26"
                            colorsIco="#FFF"
                            icon={<BsCurrencyDollar />}
                            value={sum}
                            text='Total'
                            />

                    </div>

                    <div className={styled.Transaction}>
                        <span onClick={() => handleOpenModal()}> + Transação</span>
                    </div>

                    <div className={styled.List}>
                        <List 
                            bills={orderList}
                            handleFinishTransaction={handleDeleteTransaction}
                            handleEdit={handleOpenModalEdit}
                        />
                    </div>

                </div>
                {modalOrderVisible && (
                    <ModalOrder
                        categories={category}
                        createInovoice={handleInovoice}
                        isOpen={modalOrderVisible}
                        onRequestClose={handleCloseModalOrder}
                    />
                )}

                {modalEditVisible &&(
                    < ModalEdit 
                    categories={category}
                    isOpen={modalEditVisible}
                    onRequestClose={handleCloseModalEdit}
                    order={modalItem}
                    editOrder={handleEditOrder}

                    />
                )}

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) =>{

    var saida = 0
    var entrada = 0
    var total = 0

    const apiClient = setupAPIClient(context)

    const response = await apiClient.get("inovoice/all")
    const category = await apiClient.get("/category")

    const inovoice = await response.data

    for(var i = 0; i < inovoice.length; i++){
        if(inovoice[i].type === false){
            saida += inovoice[i].value
        }else{
            entrada += inovoice[i].value
        }
    };

    total = entrada - saida

    const result = {
        saida: saida.toFixed(2),
        entrada: entrada.toFixed(2),
        total: total.toFixed(2)
    }

    return{
      props:{
        bills: response.data,
        result: result,
        category: category.data,
      }
    }
  })