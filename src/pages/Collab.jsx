import { Link } from 'react-router-dom';

function Collab() {
  return (
    <main className="about-main">
      <section className="about-content">
        <div className="name-display">
          <span className="eyebrow">The Ways of</span>
          <h2>Collaboration</h2>
        </div>

        <div className="about-text">
          <p></p>
          <p>Last updated: June 2025</p>

          <h3>Suitable Collaborations</h3>
          <p>
            I primarily work in these areas: <br />
            - Audio/visual compositions<br />
            - Audio/visual installations<br />
            - Sound design, music composition, and mixing (not that good with mastering)<br />
            - UX and interaction design<br />
            - Interactive media projects<br />
            - Visual interpretation of text-based digital publications<br />
            - Graphic design and so on...<br />
            - If your project doesn't fit exactly into one of these, feel free to reach out anyway (weird
            is welcome)<br />
          </p>

          <h3>Pricing & Timeline</h3>
          <p>
            - All work is priced and planned based on the provided brief.<br />
            - My base rate is $75, and for consulting it's $10.<br />
            - For first-time collaborators or teams, I request 50% upfront before the project starts.
            (don't take it personal)<br />
            - For large-scale projects, I may need dedicated time for research and development.<br />
            - For smaller jobs, I add a time factor on top of the base rate depending on complexity.<br />
            - After 3 revisions, additional changes are re-quoted. If the revisions diverge from the
            original brief, the project may be re-scoped and re-budgeted.<br />
            - I'm not particularly great at making the first demos (just being honest.)<br />
            - Okay fine, $60 is possible.<br />
          </p>

          <Link to="/termsofcollab" className="nav-link">Terms of Collaboration</Link>
        </div>
      </section>
    </main>
  );
}

export default Collab;
