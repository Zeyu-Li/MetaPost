const PreviewPost = ({ dataPreProcess }) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          src={"http://localhost:3005/api/get_image/" + dataPreProcess.filename}
          alt={""}
          style={{ height: 500, width: 500 }}
        />
        <h1>{dataPreProcess.fileDescription}</h1>
        <h2>{dataPreProcess.caption}</h2>
      </div>
    </>
  );
};

export default PreviewPost;
