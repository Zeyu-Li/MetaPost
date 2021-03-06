import FacebookLogin from 'react-facebook-login'

const FbLogin = (props) => {
    return (
      <>
      <div className="div-style flex-column">
        <div className="div-style flex-row">
          <h1 style={{fontSize:120}} > 
          MetaPost  
        </h1>
      <img
          src={"/logo.png"}
          alt={"MetaPost logo"}
          style={{ height: 250, width: 250}}
        />
        </div>
        <p style={{fontSize:32, maxWidth: 800, margin: 0}}>An app made to make social media a more warm and accessible place for everyone</p>
        <div style={{ height: 100 }} ></div>
    
          <FacebookLogin
              appId="432233278303617"
              autoLoad={true}
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={props.fbResponse} />
        <div style={{ height: 100 }} ></div>
      </div>
          

      </>
    );
}

export default FbLogin;