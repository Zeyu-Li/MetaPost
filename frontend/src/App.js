import { createRef, useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
  const dropRef = createRef(null);

  const dragIn = () => {
    setOnHover(true);
  };

  const dragOut = () => {
    setOnHover(false);
  };

  useEffect(() => {
    setOpen(true);
    dropRef.current.addEventListener("dragenter", dragIn);
    dropRef.current.addEventListener("dragleave", dragOut);
    dropRef.current.addEventListener("drop", dragOut);
  }, [dropRef]);

  const submitForm = (e) => {
    e.preventDefault();
    setError(false);
    // TODO: submit data then await
    const description = e.target.description.value;
    if (!description) {
      // show error
      setErrorMsg("Description is empty");
      setError(true);
      return;
    }
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
                <label>
                  <input
                    type="file"
                    title="Select image or video"
                    ref={dropRef}
                    className={`transition ${onHover ? "inputbox--hover" : ""}`}
                  />
                </label>
              </div>
              <textarea
                rows={5}
                placeholder="Description here"
                name="description"
              />
              <p className="main-container__form__error">
                {error ? errorMsg : null}
              </p>
              <br />
              <button type="submit" title="Submit" className="transition">
                <b>Submit</b>
              </button>
            </form>
            <div style={{ height: 200 }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
