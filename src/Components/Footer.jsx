import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
          <h3>About Us</h3>
          <Link to="/products">  Products  </Link>
      </div>

      <div className="footer-center">
        <h3>ShopEasy</h3>
        <p>Your simple online shopping store</p>
        <p>© 2026 ShopEasy</p>
      </div>

      <div className="footer-right">
        <h3>Follow Us</h3>
        <div className="icons">  <FaFacebook />  <FaInstagram />  <FaLinkedin />  </div>
      </div>

    </footer>
  );
}

export default Footer;