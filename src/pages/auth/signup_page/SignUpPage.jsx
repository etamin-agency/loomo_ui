import {useState} from "react";
import SignUp from "../../../components/signup/SignUp";
import ConfirmEmail from "../../../components/confirm_email/ConfirmEmail";


const SignUpPage = () => {
    const [page, setPage] = useState('sign-up');
    const [email, setEmail] = useState('');
    const [data,setData]=useState(null);
    return (
        <div>
            {
                page === 'sign-up' ? <SignUp data={data} setData={setData} setEmail={setEmail}  setPage={setPage}/> : <ConfirmEmail data={data} email={email} setPage={setPage}/>
            }
        </div>
    )
}

export default SignUpPage;