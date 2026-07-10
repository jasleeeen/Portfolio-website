import "./ProjectFilter.css";

const filters = [
  "All",
  "Computer Vision",
  "Deep Learning",
  "FastAPI",
  "3D",
];

export default function ProjectFilter({
  active,
  setActive,
}) {
  return (
    <div className="project-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={
            active === filter ? "active" : ""
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}