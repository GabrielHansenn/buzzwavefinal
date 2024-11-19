import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: name,
                email: user.email,
                createdAt: new Date().toISOString(),
            });

            navigate("/posts");
        } catch (err) {
            setError("Erro ao criar conta. Tente novamente.");
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    className={styles.inputField}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    type="email"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className={styles.inputField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <div className={styles.submitButtonContainer}>
                    <button type="submit" className={styles.submitButton}>Cadastrar</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
