import { useEffect, useState } from "react";

const PreviewPost = ({ dataPreProcess }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          src={"http://localhost:3005/api/get_image/" + dataPreProcess.filename}
          alt={dataPreProcess.fileDescription}
          style={{ height: 500, width: 500 }}
          title={dataPreProcess.fileDescription}
        />
        <h1
          className="transition"
          style={{
            opacity: open ? 1 : 0,
          }}
        >
          {dataPreProcess.fileDescription}
        </h1>
        <h2>Description: {dataPreProcess.caption}</h2>
      </div>
    </>
  );
};

export default PreviewPost;
