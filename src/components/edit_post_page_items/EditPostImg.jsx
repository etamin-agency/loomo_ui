import "./EditPageItems.scss"
import Button from "react-bootstrap/Button";
import {useDropzone} from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import any_image from "../../assets/loomo.png"

const EditPostImg = ({close, setter}) => {
    const {post} = useSelector(state => state.classPost);
    const [file, setFile] = useState();
    const [userImage, setUserImage] = useState(any_image);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof post?.videoImg?.data === 'string' && post?.videoImg?.data !== '') {
            setUserImage(`data:image/jpeg;base64,${post?.videoImg?.data}`)
        } else if (typeof post?.videoImg?.data === 'file') {
            convertFileToImage(post?.videoImg?.data);
        } else {

        }
    }, []);


    const convertFileToImage = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setUserImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback(acceptedFiles => {
        try {
            setFile(acceptedFiles[0])
            const reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = () => {
                setUserImage(reader.result);
            };
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, []);

    const handleSaveData = () => {
        dispatch(setter({changed:true,data:file}))
        close()
    };
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="some-name">
            <div className="EditPostImg">
                <img
                    src={userImage}
                    alt="user-image" className="user-image-icon"/>
                <div className="dropzone-user-image" {...getRootProps()} >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drop file here, or click button</p>
                    }
                </div>
                <div className="btn-wrapper">
                    <Button className="button-cancel" type="button" size="sm" onClick={() => close()}>
                        Cancel
                    </Button>
                    <Button className="text-button" type="button" size="sm" onClick={handleSaveData}>
                        Save
                    </Button>
                </div>
            </div>

        </div>
    )
}
export default EditPostImg;