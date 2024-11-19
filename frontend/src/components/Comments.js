import { useState, useEffect } from "react";
import { db } from "../firebase";  
import { collection, getDocs, addDoc, query, where, doc, getDoc, updateDoc } from "firebase/firestore";  
import styles from './Comments.module.css';  
import { useParams } from "react-router-dom";

const Comments = () => {
  const { postId } = useParams();  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(""); 
  const [post, setPost] = useState(null);  

  // Função para buscar os comentários
  const fetchComments = async () => {
    const commentsCollection = collection(db, "comments");
    const q = query(commentsCollection, where("postId", "==", postId));  
    const commentsSnapshot = await getDocs(q);  
    const commentsList = commentsSnapshot.docs.map(doc => doc.data());  
    setComments(commentsList);
  };

  useEffect(() => {
    // 1. Buscar o post (detalhes do post)
    const fetchPost = async () => {
      const postRef = doc(db, "posts", postId); 
      const postDoc = await getDoc(postRef);  
      setPost(postDoc.data());
    };

    // Chama as funções para buscar o post e os comentários
    fetchPost();
    fetchComments();  
  }, [postId]);  

  // Função para curtir o post e atualizar as curtidas no Firestore
  const handleLike = async (currentLikes) => {
    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        likes: currentLikes + 1, 
      });
    } catch (error) {
      console.error("Erro ao curtir o post: ", error);
    }
  };

  // Função para adicionar um comentário
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || userName.trim() === "") return;  

  
    await addDoc(collection(db, "comments"), {
      postId,
      comment: newComment,
      userName,  
      createdAt: new Date().toISOString(),
    });

    setNewComment("");  
    fetchComments();  
  };

  // Função para atualizar o nome do usuário
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  if (!post) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.commentContainer}>
      <h1>{post.title}</h1>


      <button
        className={styles.likeButton}
        onClick={() => handleLike(post.likes || 0)}>
        Curtir
      </button>
      <span className={styles.likesCount}>
        {post.likes || 0} Curtidas
      </span>


      <h1 className={styles.commentHeader}>
        Comentários
      </h1>

      {/* Lista de Comentários */}
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className={styles.commentText}>
            <p><strong>{comment.userName}</strong>: {comment.comment}</p> {/* Exibe o nome do autor do comentário */}
          </div>
        ))
      ) : (
        <p>Não há comentários para este post.</p>
      )}

      {/* Formulário para adicionar comentário */}
      <form className={styles.formContainer} onSubmit={handleAddComment}>
        <input
          className={styles.inputField}
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Seu nome"
        />
        <textarea
          className={styles.textareaField}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva seu comentário..."
        />
        <button className={styles.commentButton} type="submit">Adicionar Comentário</button>
      </form>
    </div>
  );
};

export default Comments;
