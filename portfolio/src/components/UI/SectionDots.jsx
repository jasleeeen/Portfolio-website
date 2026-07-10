import "./SectionDots.css";

const ids = [
  "hero",
  "about",
  "domains",
  "projects",
  "experience",
  "contact",
];

export default function SectionDots() {

  return (

    <nav className="section-dots">

      {ids.map((id) => (

        <button
          key={id}
          onClick={() =>
            document
              .getElementById(id)
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        />

      ))}

    </nav>

  );

}