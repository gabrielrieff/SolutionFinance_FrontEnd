/* eslint-disable react/no-unescaped-entities */
import { useContext, FormEvent, useState } from 'react';
import styled from '../../styles/home.module.scss';
import Head from 'next/head';

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { canSSRGuest } from '../utils/canSSRGuest'

import { AuthContext } from '../context/AuthContext'
import Link from 'next/link';

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      return;
    }

    setLoading(false)

    let data ={
      email: email,
      password: password
    }

     await signIn(data)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className={styled.containerCenter}>
        <form onSubmit={handleLogin}>
            <Input
            text='Email'
            type={'email'}
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            />

            <Input
            text='Password'
            type={'password'}
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            />

        <Button type={'submit'} loading={loading} >
            Login
        </Button>

          <Link href={'/signUp'} className={styled.link}>
            Don't have a registration? Register
          </Link>
        </form>
      </div>

    </>
  )
}


export const getServerSideProps = canSSRGuest(async (context) =>{
  return{
    props:{}
  }
})