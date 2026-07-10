import "./Certificates.css";

const certificates = [
  {
    title: "Deep Learning",
    issuer: "NPTEL",
    year: "2025",
  },
  {
    title: "Machine Learning",
    issuer: "NPTEL",
    year: "2025",
  },
  {
    title: ".NET & Azure",
    issuer: "Capgemini Exceller",
    year: "2026",
  },
  {
    title: "Python",
    issuer: "Coursera",
    year: "2024",
  },
];

export default function Certificates() {
  return (
    <section className="certificates">

      <div className="cert-header">

        <span>CERTIFICATIONS</span>

        <h2>Learning Never Stops</h2>

      </div>

      <div className="cert-grid">

        {certificates.map((item) => (

          <div
            key={item.title}
            className="cert-card"
          >

            <span>{item.year}</span>

            <h3>{item.title}</h3>

            <p>{item.issuer}</p>

          </div>

        ))}

      </div>

    </section>
  );
}