import { useState } from "react";
import { Input, useTheme } from "ledgerui";

export default function App() {
  const { theme, preference, setPreference, toggle } = useTheme();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  return (
    <main>
      <header>
        <div className="title">ledgerui</div>
        <div className="sub">minimal react + scss ui kit</div>
      </header>

      <section>
        <div className="label">theme</div>
        <div className="row">
          <span>current: {theme}</span>
          <span>preference: {preference}</span>
        </div>
        <div className="row">
          <button type="button" onClick={() => setPreference("light")}>light</button>
          <button type="button" onClick={() => setPreference("dark")}>dark</button>
          <button type="button" onClick={() => setPreference("system")}>system</button>
          <button type="button" onClick={toggle}>toggle (cmd+d)</button>
        </div>
      </section>

      <section>
        <div className="label">input (underline)</div>
        <Input placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} />
      </section>

      <section>
        <div className="label">input (plain)</div>
        <Input variant="plain" placeholder="a note" value={note} onChange={(e) => setNote(e.target.value)} />
      </section>

      <footer>
        hit <code>cmd+d</code> to flip themes. tokens are css vars prefixed <code>--lui-</code>.
      </footer>
    </main>
  );
}
