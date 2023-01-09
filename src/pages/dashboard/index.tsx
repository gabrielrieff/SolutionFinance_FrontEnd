/* eslint-disable react/no-unescaped-entities */
import { canSSRAuth } from "../../utils/canSSRAuth"

import { AuthContext } from '../../context/AuthContext'

import { useContext } from "react"

import { BiLogOut } from 'react-icons/bi'
import { MdAttachMoney } from 'react-icons/md'

import styled from './styled.module.scss'
import Link from "next/link"
import Head from 'next/head';

export default function Dashboard(){
    const { signOut } = useContext(AuthContext)
    return(
    <>
        <Head>
            <title>Dashboard</title>
        </Head>


        <div className={styled.container}>
            <nav className={styled.nav}>
                    <Link href={'/inovoice'} target={"_blank"} className={styled.inovoice}><MdAttachMoney size={120}/></Link>
                    <BiLogOut size={40} onClick={signOut} className={styled.logout}/>
            </nav>

            <div className={styled.main}>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standdard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
            </div>
        </div>

    </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) =>{
    return{
      props:{}
    }
  })