import {useState} from "react";
import Home from "../components/Home";
import FbLogin from "../components/FbLogin";

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const fbResponse = (res) => {
        // res get the data returned from facebook login including the access token etc
        console.log(res)
        setLoggedIn(true)
    }

    const processPost = (desc="Demo Desc") => {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify(reqObject),
        };
    }
    return (
      <>
          {loggedIn &&
            <Home />
          }
          {!loggedIn &&
            <FbLogin
                fbResponse={fbResponse}
            />
          }
      </>
    );
}

export default Main