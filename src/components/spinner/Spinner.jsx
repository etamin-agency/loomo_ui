import spinnerGif from '../../assets/1481.gif';

import './spinner.css';
const Spinner = () => {
    return (
        <>
            <div className="spinner" >
                <img src={spinnerGif} alt="Loading..." />
            </div>
        </>
    )
}
export default Spinner;