export default function Register(){
  return (
    <>

   
<div class="wrapper">
        <header>Register Form</header>
        <form action="#">
            
            <div class="field">
                <div class="input-area">
                    <input type="text" placeholder="Email Address" />
                    <i class="icon fas fa-envelope"></i>
                    <i class="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div class="error error-txt">Email can't be blank</div>
            </div>
            <div class="field">
                <div class="input-area">
                    <input type="password" placeholder="Password" />
                    <i class="icon fas fa-lock"></i>
                    <i class="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div class="error error-txt">Password can't be blank</div>
            </div>
            <div class="field">
                <div class="input-area">
                    <input type="password" placeholder="Confirm Password" />
                    <i class="icon fas fa-lock"></i>
                    <i class="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div class="error error-txt">Confirm password can't be blank</div>
            </div>
            <input type="submit" value="Register"/>
        </form>
        <div class="sign-txt">Already a member? <a href="#">Login now</a></div>
    </div>
</>
      
  );
}