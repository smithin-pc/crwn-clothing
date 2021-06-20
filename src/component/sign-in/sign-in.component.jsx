import { React, Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { auth,signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {

        event.preventDefault();
        const {email , password} = this.state;

        try{

        await auth.signInWithEmailAndPassword(email,password);
        }
        catch(error)
        {
            console.error(error);
        }
        this.setState({ email: '', password: '' });
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign-In with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" value={this.state.email} handleChange={this.handleChange} label="email" required />
                    <FormInput type="password" name="password" value={this.state.password} handleChange={this.handleChange} label="password" required />


                    <div className='buttons'>
                        <CustomButton type="submit">
                            SIGN IN
                        </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign In With Google
                        </CustomButton>

                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;