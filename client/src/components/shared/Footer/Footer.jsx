import MyContainer from "../MyContainer/MyContainer";
import { SiFacebook, SiGithub, SiLinkedin } from "react-icons/si";
import { Link } from "react-router";
import { FaSquareXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <MyContainer className="space-y-3.5">
      <div className="footer sm:footer-horizontal text-base-content">
        <aside>
          <Logo />

          <p className="max-w-sm opacity-80">
            Nexira is your trusted partner in connecting businesses with top
            freelance talent worldwide. Our platform empowers companies to scale
            efficiently while helping skilled professionals build meaningful
            careers through flexible work opportunities and secure
            collaborations.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title text-neutral font-bold opacity-100">
            Services
          </h6>
          <a className="footer-link">Branding</a>
          <a className="footer-link">Design</a>
          <a className="footer-link">Marketing</a>
          <a className="footer-link">Advertisement</a>
        </nav>

        <nav>
          <h6 className="footer-title text-neutral font-bold opacity-100">
            Legal
          </h6>
          <a className="footer-link">Terms & Conditions</a>
          <a className="footer-link">Privacy Policy</a>
          <a className="footer-link">Cookie Policy</a>
        </nav>

        <nav>
          <h6 className="footer-title text-neutral font-bold opacity-100">
            Social Links
          </h6>
          <Link
            to="https://www.facebook.com/programmerrakibul/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <SiFacebook className="footer-social-icon" /> Facebook
          </Link>

          <Link
            to="https://github.com/programmerrakibul"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <SiGithub className="footer-social-icon" /> Github
          </Link>

          <Link
            to="https://x.com/innocentboy206"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaSquareXTwitter className="footer-social-icon" /> Twitter
          </Link>

          <Link
            to="https://www.linkedin.com/in/md-rakibul-islam-9399b3228/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <SiLinkedin className="footer-social-icon" /> Linkedin
          </Link>
        </nav>
      </div>

      <div className="pt-3.5 border-t-2 border-t-primary/13">
        <pre className="font-semibold text-center opacity-70">
          &copy; All Rights Reserved by <em>Nexira</em>
        </pre>
      </div>
    </MyContainer>
  );
};

export default Footer;
