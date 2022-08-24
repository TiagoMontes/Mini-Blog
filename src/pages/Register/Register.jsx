import styles from './Register.module.css'

import { useState, useEffect } from 'react'

const Register = () => {
  return (
    <div>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe sua história</p>
        <form>
          <label>
            <span>Nome:</span>
            <input 
              type="text" 
              name='displayname' 
              required 
              placeholder='Nome do usuário'/>
          </label>
          <label>
            <span>Email:</span>
            <input 
              type="email" 
              name='email' 
              required 
              placeholder='E-mail do usuário'/>
          </label>
          <label>
            <span>Nome:</span>
            <input 
              type="password" 
              name='password' 
              required 
              placeholder='Insira sua senha'/>
          </label>
          <label>
            <span>Confirmação de senha:</span>
            <input 
              type="password" 
              name='ConfirmPassword' 
              required 
              placeholder='Confirme sua senha'/>
          </label>
          <button className='btn'>Cadastrar</button>
        </form>
    </div>
  )
}

export {Register}