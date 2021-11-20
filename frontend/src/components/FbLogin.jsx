import FacebookLogin from 'react-facebook-login'

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const FbLogin = (props) => {
    return (
      <>
      <div style={divStyle}>
      <h1 style={{fontSize: 36, margin: 0}} > 
        MetaPost  
      </h1>
      <img
          src={"/logo.png"}
          alt={"MetaPost logo"}
          style={{ height: 500, width: 500}}
        />
          <FacebookLogin
              appId="432233278303617"
              autoLoad={true}
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={props.fbResponse} />
        <div
          style={{
            height: 80,
          }}
        ></div>
      </div>
          

      </>
    );
}

export default FbLogin;