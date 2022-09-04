import styles from "./CreatePost.module.css";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Atrelar o post ao usuário
import { useAuthentication } from '../../hooks/useAuthentication';
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([""]);
  const [formError, setFormError] = useState("");
  
  const {user} = useAuthValue()
  const {insertDocument, response} = useInsertDocument("posts");
  const navigate = useNavigate();


 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar imagem URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida");
    }

    // Criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    // Checar todos os valores
    if (!title || !image || !body || !tags) {
      setFormError("Por favor preencha todos os campos");
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redirecionar para Homepage
    navigate("/");
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Pensem num bom título..." 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira uma imagem que representa seu post" 
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea 
            name="body" 
            required 
            placeholder="Insira o conteúdo do post" 
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name="tags" 
            required 
            placeholder="Insira as tags separadas por vírgula" 
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export {CreatePost}