import { useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <main className="App-header">
        <div className="main-container">
          <div>
            <h1
              className="transition"
              style={{
                opacity: open ? 1 : 0,
              }}
            >
              Analyzer
            </h1>
            <form
              className="main-container__form"
              onSubmit={(e) => submitForm(e)}
            >
              <div>
                <input type="file" title="Select image or video" />
              </div>
              <textarea rows={4} placeholder="Description here" />
              <br />
              <button type="submit" title="Submit">
                Submit
              </button>
            </form>
            <div style={{ height: 150 }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
