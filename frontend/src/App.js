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
          }}
        >
          <h1
            className="transition"
            style={{
              opacity: open ? 1 : 0,
            }}
          >
            Analyzer
          </h1>
        </div>
      </main>
    </div>
  );
}

export default App;
