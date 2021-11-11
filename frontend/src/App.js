import { useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className="App">
      <main className="App-header">
        <div
          className="main-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#fafafa",
            color: "#333333",
            textAlign: "center",
          }}
        >
          <div>
            <h1
              className="transition"
              style={{
                opacity: open ? 1 : 0,
              }}
            >
              Analyzer
            </h1>
            <form className="main-container__form">
              <div>
                <input type="file" style={{ textAlign: "center" }} />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
