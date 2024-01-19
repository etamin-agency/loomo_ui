import {useState} from "react";
import SignUp from "../../components/signup/SignUp";
import ConfirmEmail from "../../components/confirm_email/ConfirmEmail";


const SignUpPage = () => {
    const [page, setPage] = useState('sign-up');
    const [email, setEmail] = useState('');
    return (
        <div>
            {
                page === 'sign-up' ? <SignUp setEmail={setEmail}  setPage={setPage}/> : <ConfirmEmail email={email} setPage={setPage}/>
            }
        </div>
    )
}

export default SignUpPage;