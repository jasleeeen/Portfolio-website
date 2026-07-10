import "./GitHubStats.css";
import githubStats from "../../data/githubStats";

export default function GitHubStats() {
  return (
    <section className="github-stats">

      <div className="stats-header">

        <span>AT A GLANCE</span>

        <h2>Numbers</h2>

      </div>

      <div className="stats-grid">

        {githubStats.map((item) => (
          <div
            key={item.label}
            className="stats-card"
          >
            <h3>{item.value}</h3>

            <span>{item.label}</span>
          </div>
        ))}

      </div>

    </section>
  );
}