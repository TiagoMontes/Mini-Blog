import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom"

//hooks
import { useAuthValue} from "../../context/AuthContext" //Para pegar informações do usuário
import { useFetchDocuments } from "../../hooks/useFetchDocuments" //Para pegar os itens do usuário
import { useDeleteDocument } from "../../hooks/useDeleteDocument"

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid; //Pegando o id do usuário logado, assim consigo pegar os posts em useFetchDocument pelo id do usuário

  //Posts do usuário
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid); //o segundo argumento é null pois não estamos fazendo nenhuma busca

  const { deleteDocument } = useDeleteDocument("posts"); //Para deletar um post

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrado posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro Post</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header}>
              <span>Título</span>
              <span>Ações</span>
            </div>
            {posts && posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                    Editar
                  </Link>
                  <button 
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        
    </div>
  )
}

export {Dashboard}