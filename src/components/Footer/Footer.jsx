import "./Footer.css";
function Footer() {
  return (
    <footer className="footer__container">
      <p className="footer__author">Developed by Alfredo Parodi</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
}
export default Footer;
