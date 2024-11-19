import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import styles from './CreatePost.module.css';  

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");  

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "" || author.trim() === "") return;  


    await addDoc(collection(db, "posts"), {
      title,
      content,
      author,  
    });

    window.location.href = "/posts"; 
  };

  return (
    <div className={styles.container}>
      <h1>Criar Post</h1>

      <form onSubmit={handleCreatePost}>
        <input
          className={styles.inputField}
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Autor"
        />
        <input
          className={styles.inputField}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <textarea
          className={styles.textareaField}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo"
        />
        <div className={styles.submitButtonContainer}>
          <button className={styles.button} type="submit">
            Criar Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
