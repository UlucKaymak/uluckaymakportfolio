import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <main className="about-main">
      <section className="about-content">
        <div className="profile-image">
          <img src="/uluc.gif" alt="Uluç Kaymak" />
        </div>

        <div className="name-display">
          <span className="eyebrow">Hi I'm</span>
          <h2>Uluç Kaymak</h2>
        </div>

        <div className="about-text">
          <p>
            <strong>As a digital artist</strong>, I create conceptual audio/visual pieces shaped by human
            perception, experience, and psychology.<br />
            <strong>As a composer</strong>, I design soundscapes that resonate with how people feel.<br />
            <strong>As a sound designer</strong>, I craft personal works that people categorize as
            simulations of mental disorder.<br />
            <strong>As a person</strong>, I love ducks.<br /><br />

            I'm also a partner and co-founder of the interactive motion graphics and sound design firm,
            <strong>BizYapım</strong>.
          </p>

          <div className="contact-info">
            <p>
              If you want to say hi:{' '}
              <a href="mailto:uluckaymak@gmail.com">uluckaymak@gmail.com</a>
            </p>
          </div>

          <h3>My Links</h3>
          <ul className="links-list">
            <li><Link to="/collab">Collab with Me!</Link></li>
            <li>
              <a href="https://www.buymeacoffee.com/uluckaymak" target="_blank" rel="noopener noreferrer">
                🔗 Buy Me a Coffee, also my digital shop
              </a>
            </li>
          </ul>

          <h3>Exhibitions</h3>
          <ul className="exhibitions-list">
            <li><strong>SARNIÇ</strong> | 2025_October_18-2026_January_18 | Istanbul_TR</li>
            <li><strong>Kültür Yolu: Eskizden Piksele</strong> | 2025_August_02-10 | Nevşehir_TR</li>
            <li><strong>Kültür Yolu: Eskizden Piksele</strong> | 2024_September_14-21 | Antep_TR</li>
            <li><strong>CAMP!ŞahikaIST</strong> | 2024_September_06-13 | Istanbul_TR</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default AboutMe;
