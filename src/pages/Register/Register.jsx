import styles from './Register.module.css'

import { useState, useEffect } from 'react'

const Register = () => {
  // States relacionados ao formulário
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State relacionado à ERRO
  const [error, setError] = useState("");

  // Preciso reunir todos os dados do formulário e enviar -> método submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Formando o usuário baseado em ->
    const user = {
      displayName,
      email,
      password
    }

    // Quero validar
    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return
    }

    // Vamos verificar se o usuário está sendo criado
    console.log(user);
  }

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe sua história</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input 
              type="text" 
              name='displayname' 
              required 
              placeholder='Nome do usuário'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              />
          </label>
          <label>
            <span>Email:</span>
            <input 
              type="email" 
              name='email' 
              required 
              placeholder='E-mail do usuário'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label>
            <span>Senha:</span>
            <input 
              type="password" 
              name='password' 
              required 
              placeholder='Insira sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </label>
          <label>
            <span>Confirmação de senha:</span>
            <input 
              type="password" 
              name='ConfirmPassword' 
              required 
              placeholder='Confirme sua senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </label>
          <button className='btn'>Cadastrar</button>
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export {Register}