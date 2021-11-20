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
      <h1 style={{fontsize:30}} > 
          MetaPost  
        </h1>
      <img
          src={"/logo.png"}
          alt={"logo"}
          style={{ height: 500, width: 500}}
        />
          <FacebookLogin
              appId="432233278303617"
              autoLoad={true}
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={props.fbResponse} />
        <h1
          
          style={{
            opacity: 1,
          }}
        ></h1>
      </div>
          

      </>
    );
}

export default FbLogin;