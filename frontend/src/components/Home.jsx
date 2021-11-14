import { createRef, useEffect, useState } from "react";

const Home = () => {
    const [open, setOpen] = useState(false);
    const [onHover, setOnHover] = useState(false);

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
        // TODO: submit data then await
    };

    return (
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
                    className="transition"
                />
                <br />
                <button type="submit" title="Submit" className="transition">
                    <b>Submit</b>
                </button>
            </form>
            <div style={{ height: 200 }}></div>
        </div>
    );
}

export default Home;