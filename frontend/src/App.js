import { useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    // TODO: submit data then await
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
                {/* TODO: https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929 */}
                <input type="file" title="Select image or video" />
              </div>
              <textarea
                rows={5}
                placeholder="Description here"
                className="transition"
              />
              <br />
              <button type="submit" title="Submit" className="transition">
                <b>Submit</b>
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
