import { useEffect, useState } from "react";
import Home from "../components/Home";
import FbLogin from "../components/FbLogin";
import PreviewPost from "../components/PreviewPost";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [postPreprocess, setPostPreprocess] = useState(false);
  const [dataPreviewPost, setDataPreviewPost] = useState({});

  useEffect(() => {
    // console.log("obj changed", obj);
  });

  const fbResponse = (res) => {
    // res get the data returned from facebook login including the access token etc
    console.log(res);
    setLoggedIn(true);
  };

  const preprocessPost = async (file, caption, finishedCallback) => {
    const data = new FormData();
    data.append("uploaded_file", file);
    data.append("caption", caption);
    const resp = await fetch("http://localhost:3005/api/process_post", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .catch((err) => {
        // console.log(err);
        alert("Server is not online")
        finishedCallback();
      });
    console.log(resp);
    setDataPreviewPost({
      filename: resp.filename,
      fileDescription: resp.fileDescription,
      caption: resp.caption,
    });
    setPostPreprocess(true);
    finishedCallback();
  };

  return (
    <>
      {loggedIn && !postPreprocess && <Home preprocessPost={preprocessPost} />}
      {loggedIn && postPreprocess && (
        <PreviewPost dataPreProcess={dataPreviewPost} />
      )}
      {!loggedIn && <FbLogin fbResponse={fbResponse} />}
    </>
  );
};

export default Main;
