import { useState } from "react";
import { Input, useTheme } from "@nategiraudeau/ledgerui";

export default function App() {
  const { theme, preference } = useTheme();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  return (
    <main>
      <header className="masthead">
        <h1 className="title">ledgerui</h1>
        <p className="sub">minimal react + scss ui kit</p>
      </header>

      <section className="section" aria-labelledby="inputs-heading">
        <h2 className="label" id="inputs-heading">
          inputs
        </h2>
        <div className="inputs-row">
          <div className="input-slot">
            <div className="label" id="underline-label">
              underline
            </div>
            <Input
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-labelledby="underline-label"
            />
          </div>
          <div className="input-slot">
            <div className="label" id="box-label">
              box
            </div>
            <Input
              variant="box"
              placeholder="a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              aria-labelledby="box-label"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="buttons-heading">
        <h2 className="label" id="buttons-heading">
          buttons
        </h2>
        <div className="row">
          <button type="button">run</button>
          <button type="button">copy</button>
          <button type="button">export</button>
        </div>
      </section>

      <section
        className="section section--chrome"
        aria-labelledby="theme-status-heading"
      >
        <h2 className="label" id="theme-status-heading">
          theme
        </h2>
        <p className="theme-meta">
          current: {theme}, preference: {preference}
        </p>
      </section>

      <footer>
        hit <code>cmd+d</code> to flip themes. tokens are css vars prefixed <code>--lui-</code>.
      </footer>
    </main>
  );
}
