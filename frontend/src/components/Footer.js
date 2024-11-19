import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {new Date().getFullYear()} BuzzWave. Todos os direitos reservados.
        </p>
        <div className={styles.links}>
          <a href="/about" className={styles.link}>
            Sobre nós
          </a>
          <a href="/privacy" className={styles.link}>
            Política de Privacidade
          </a>
          <a href="/contact" className={styles.link}>
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
