import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse</h3>
      {/* Simbolo de copyright */}
      <p>Mini Blog &copy; 2022</p>
    </footer>
  )
}

export {Footer}