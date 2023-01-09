/* eslint-disable react/no-unescaped-entities */
import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../context/AuthContext'
import { canSSRGuest } from '../../utils/canSSRGuest'

import styled from '../../../styles/home.module.scss'
import Link from 'next/link';

export default function SignUp() {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      return;
    }

    setLoading(false)

    let data = {
      name,
      email,
      password
    }

     await signUp(data)

     setLoading(true)
  }

  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>

      <div className={styled.containerCenter}>
        <form onSubmit={handleSignUp}>
            <Input
            text='Name'
            type={'text'}
            value={name}
            onChange={ (e) => setName(e.target.value)}
            />

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
          registration
        </Button>

          <Link href={'/'} className={styled.link}>
          Already have a registration? log in
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