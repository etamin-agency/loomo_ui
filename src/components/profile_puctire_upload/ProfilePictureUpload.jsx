import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './ProfilePictureUpload.scss'
import profile from '../../assets/student_image.png';

const ProfilePictureUpload = (props) => {
    const  [userImage,setUserImage] =useState(profile);
    const [dragActive,setDragActive]=useState(false);
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        for (const file of acceptedFiles) {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    setUserImage(reader.result);
                };
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop })

        console.log(isDragActive)
    return (
        <div className="some-name" >
            <div  className="ProfilePictureUpload">
                <img src={userImage} alt="user-image" className="user-image-icon" />
                <div className="dropzone-block" {...getRootProps() } >
                    <input {...getInputProps()} />
                    {
                        isDragActive  ?
                            <p>Drop the files here ...</p> :
                            <p>Drop file  here, or click button</p>
                    }
                </div>
                <div onClick={()=>props.setShowUploadView(false)} className="btn-close close-button"></div>
            </div>
        </div>

    )
}


export default ProfilePictureUpload;