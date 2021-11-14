import FacebookLogin from 'react-facebook-login'

const FbLogin = (props) => {
    return (
      <>
          <FacebookLogin
              appId="432233278303617"
              autoLoad={true}
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={props.fbResponse} />

      </>
    );
}

export default FbLogin;