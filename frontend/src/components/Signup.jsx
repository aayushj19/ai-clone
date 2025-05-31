// import {React,Link} from "react";
import {Link} from "react-router-dom"


const Signup = () => {
  return (
    <div>
      <div>
            {/* {Heading} */}
            <h1>Signup</h1>

            {/* {firstName} */}
            <div>
                <input type="text" name="First Name" placeholder="First Name" />
            </div>

            {/* {lastName} */}
            <div></div>

            {/* {email} */}
            <div></div>

            {/* {password} */}
            <div></div>

            {/* {Error Message} */}
            <span>Error</span>

            {/* {Terms and Conditions} */}
            <p>By signing up or logging in, you agree to Deepseek's <a href="">Terms of Use</a> and <a href="">Privacy Policy</a>.</p>  

            {/* {Signup Button} */}
            <button>Signup</button>

            {/* {Links} */}
            <div> <a href="" > Already have an account?</a>
            <Link to="/login">Login</Link>
            </div>
        </div>
    </div>
  );
};

export default Signup;
