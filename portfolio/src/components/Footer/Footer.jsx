import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-line"></div>

      <div className="footer-content">

        <div>

          <h3>Jasleen Kaur Sohal</h3>

          <p>
            AI Engineer • Computer Vision • Deep Learning •
            Multimodal AI • 3D Reconstruction
          </p>

        </div>

        <div className="footer-links">

          <a
            href="https://github.com/jasleeeen"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/jasleen-kaur-sohal-286117271"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a href="mailto:jasleen7904@gmail.com">
            Email
          </a>

        </div>

      </div>

      <span className="copyright">
        © {new Date().getFullYear()} Jasleen Kaur Sohal
      </span>

    </footer>
  );
}