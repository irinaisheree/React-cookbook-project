export default function Register(){
  return (
   <>

<div className="wrapper">
    <header>Login Form</header>
    <form action="#">
      <div className="field email">
        <div className="input-area">
          <input type="text" placeholder="Email Address"/>
          <i className="icon fas fa-envelope"></i>
          <i className="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div className="error error-txt">Email can't be blank</div>
      </div>
      <div className="field password">
        <div className="input-area">
          <input type="password" placeholder="Password" />
          <i className="icon fas fa-lock"></i>
          <i className="error error-icon fas fa-exclamation-circle"></i>
        </div>
        <div className="error error-txt">Password can't be blank</div>
      </div>
      <div className="pass-txt"><a href="#">Forgot password?</a></div>
      <input type="submit" value="Login"/>
    </form>
    <div className="sign-txt">Not yet member? <a href="#">Signup now</a></div>
  </div>
  {/* <script src="script.js"></script> */}


   </>
      
  );
}