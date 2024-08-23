import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import demoRoomService from "../../../../services/demoRoomService";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Participant from "../../../../components/demo_room/Participant";
import hang_up_icon from "../../../../assets/red-hang-up-icon.png";
import audioOn from "../../../../assets/audio-on.png";
import audioOff from "../../../../assets/audio-off.png";
import videoOn from "../../../../assets/video-on.png";
import videoOff from "../../../../assets/video-off.png";
import showIcon from "../../../../assets/show.png";
import hideIcon from "../../../../assets/hide.png";
// import screenShareIcon from "../../../../assets/screen-share.png";  // New icon for screen sharing
// import screenStopIcon from "../../../../assets/screen-stop.png";    // New icon for stopping screen sharing
import Chat from "../../../../components/demo_room/chat";
import Loading from "../../../../components/loading/Loading";
import CreateClassView from "../../../../components/creeate_class/CreateClassView";
import classService from "../../../../services/classService";

import './DemoRoomPage.scss';

const DemoRoomPage = () => {
    const [value, setValue] = React.useState('1');
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const {roomId} = useParams();
    const {role} = useSelector(state => state.role);
    const navigate = useNavigate();
    const ws = useRef(new WebSocket('ws://16.16.159.103:8086/demo-room'));
    const participantsView = useRef(new Map());
    const userName = useRef(jwtDecode(Cookie.get('access_token')).sub);
    const [teacherName, setTeacherName] = useState('');
    const [isAudioOn, setAudioOn] = useState(true);
    const [isVideoOn, setVideoOn] = useState(true);
    const [isScreenSharing, setScreenSharing] = useState(false);  // New state for screen sharing
    const [loading, setLoading] = useState(true);
    const [showStudents, setShowStudents] = useState(true);
    const [showCreateClass, setShowCreateClass] = useState(false);
    const screenTrack = useRef(null);  // Reference to the screen track

    useEffect(() => {
        checkIfExistence(roomId).then(r => console.log("hey"));
        ws.current = new WebSocket('ws://16.16.159.103:8086/demo-room');
        console.log("Page Loaded - Opened WebSocket");
        triggerRender();
        ws.current.onopen = () => {
            console.log("WebSocket connection established.");
            sendMessage({
                id: 'joinRoom',
                name: userName.current,
                room: roomId,
            });

            ws.current.onmessage = (message) => {
                let parsedMessage = JSON.parse(message.data);
                console.info('Received message: ' + message.data);
                switch (parsedMessage.id) {
                    case 'existingParticipants':
                        onExistingParticipants(parsedMessage);
                        break;
                    case 'newParticipantArrived':
                        onNewParticipant(parsedMessage);
                        break;
                    case 'participantLeft':
                        onParticipantLeft(parsedMessage);
                        break;
                    case 'receiveVideoAnswer':
                        receiveVideoResponse(parsedMessage);
                        break;
                    case 'roomClosed':
                        handleLeaveRoom();
                        break;
                    case 'iceCandidate':
                        console.info(parsedMessage.candidate);
                        onIceCandidate(parsedMessage);
                        break;
                    default:
                        console.error('Unrecognized message', parsedMessage);
                }
            };
        };
        ws.current.onclose = () => {
            if (participantsView.current.size !== 0) {
                window.location.reload();
            }
        };
        return () => {
            console.log("Page unloaded - Close WebSocket");
            ws.current.close();
            stopScreenSharing();  // Ensure screen sharing stops when the component unmounts
        };
    }, []);

    const createClassAndClose = (nameOfClass) => {
        setLoading(true);
        classService.createClass(nameOfClass, roomId).then(isCreated => {
            if (isCreated) {
                leaveTeacher();
            }
        });
    }

    const checkIfExistence = async (roomId) => {
        const isExists = await demoRoomService.isRoomExists(roomId);
        if (!isExists) {
            navigate("/");
        }
    }

    const onExistingParticipants = (msg) => {
        console.log(userName.current + " registered in room " + roomId);
        participantsView.current.set(userName.current, <Participant name={userName.current}
                                                                    isOwnCamera={true}
                                                                    sendMessage={sendMessage}/>);
        setTeacherName(msg.teacherName);
        msg.data.forEach(receiveVideo);
        triggerRender();
    }

    const sendMessage = (message) => {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        ws.current.send(jsonMessage);
    }

    const onNewParticipant = (request) => {
        receiveVideo(request.name);
    }

    const receiveVideoResponse = (result) => {
        const participant = participantsView.current.get(result.name);

        if (participant) {
            const updatedParticipant = React.cloneElement(participant, {
                sdpAnswer: result.sdpAnswer,
            });
            participantsView.current.set(result.name, updatedParticipant);
            triggerRender();
        }
        setLoading(false);
    }

    const triggerRender = () => {
        setUpdateTrigger(prev => !prev);
    };

    const onIceCandidate = (result) => {
        const participant = participantsView.current.get(result.name);

        if (participant) {
            const updatedParticipant = React.cloneElement(participant, {
                candidate: result.candidate,
            });
            participantsView.current.set(result.name, updatedParticipant);
            triggerRender();
        }
    }

    const receiveVideo = (sender) => {
        participantsView.current.set(sender, <Participant name={sender}
                                                          sendMessage={sendMessage}/>);
        triggerRender();
    }

    const handleLeaveRoom = async () => {
        if (role === "teacher") {
            const isClassCreated = await classService.isClassExists(roomId);
            if (isClassCreated) {
                leaveTeacher();
            } else {
                setShowCreateClass(true);
            }
        } else {
            participantsView.current.clear();
            sendMessage({
                id: 'leaveRoom'
            });
            ws.current.close();
            navigate("/class-demo");
            window.location.reload();
        }
    }

    const leaveTeacher = () => {
        participantsView.current.clear();
        sendMessage({
            id: 'leaveRoom'
        });
        ws.current.close();
        navigate("/posts");
        window.location.reload();
    }

    const onParticipantLeft = (request) => {
        participantsView.current.delete(request.name);
        triggerRender();
    }

    const handleAudioOnAndOff = (isAudioOn) => {
        const participant = participantsView.current.get(userName?.current);
        if (participant) {
            const updatedParticipant = React.cloneElement(participant, {
                isAudioOn: isAudioOn
            });
            participantsView.current.set(userName?.current, updatedParticipant);
        }
        setAudioOn(isAudioOn);
    }

    // const startScreenSharing = async () => {
    //     try {
    //         const stream = await navigator.mediaDevices.getDisplayMedia({
    //             video: true,
    //         });
    //         screenTrack.current = stream.getTracks()[0];
    //         const participant = participantsView.current.get(userName?.current);
    //         if (participant) {
    //             const updatedParticipant = React.cloneElement(participant, {
    //                 screenTrack: screenTrack.current,
    //             });
    //             participantsView.current.set(userName?.current, updatedParticipant);
    //             sendMessage({
    //                 id: 'shareScreen',
    //                 screenTrack: screenTrack.current,
    //             });
    //         }
    //         setScreenSharing(true);
    //     } catch (error) {
    //         console.error("Error sharing screen: ", error);
    //     }
    // }
    const startScreenSharing = async () => {
        try {
            // Ensure the function is called by user interaction to avoid permission issues
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always", // Show cursor during screen share
                },
                audio: false, // Optionally include audio
            });
    
            screenTrack.current = stream.getTracks()[0];
            const participant = participantsView.current.get(userName?.current);
            if (participant) {
                const updatedParticipant = React.cloneElement(participant, {
                    screenTrack: screenTrack.current,
                });
                participantsView.current.set(userName?.current, updatedParticipant);
                sendMessage({
                    id: 'shareScreen',
                    screenTrack: screenTrack.current,
                });
            }
            setScreenSharing(true);
        } catch (error) {
            if (error.name === "NotAllowedError") {
                alert("Screen sharing permission was denied. Please allow access to share your screen.");
            } else if (error.name === "NotFoundError") {
                alert("No screen was found to share. Ensure you have a screen or window available.");
            } else {
                console.error("Error sharing screen: ", error);
                alert("An unexpected error occurred while trying to share your screen.");
            }
        }
    }

    const stopScreenSharing = () => {
        if (screenTrack.current) {
            screenTrack.current.stop();
            screenTrack.current = null;
            const participant = participantsView.current.get(userName?.current);
            if (participant) {
                const updatedParticipant = React.cloneElement(participant, {
                    screenTrack: null,
                });
                participantsView.current.set(userName?.current, updatedParticipant);
                sendMessage({
                    id: 'stopShareScreen',
                });
            }
            setScreenSharing(false);
        }
    }

    const toggleScreenSharing = () => {
        if (isScreenSharing) {
            stopScreenSharing();
        } else {
            startScreenSharing();
        }
    }

    return (
        <div className="DemoRoomPage">
            {loading && <Loading />}
            {showCreateClass && <CreateClassView createClass={createClassAndClose} close={() => setShowCreateClass(false)} />}
            <div className={`students-video-wrapper ${!showStudents && 'hide-students'}`}>
                {Array.from(participantsView.current.values()).map((participant, index) => {
                    if (participant.props.name === teacherName) return;
                    return (
                        <div className="demo-video-item" key={index}>
                            {participant}
                        </div>
                    );
                })}
            </div>

            <div className="teacher-group">
                <div className="teacher-video-wrapper">
                    <div className="teacher-wrapper">
                        <div className="teacher-video">
                            {participantsView.current.get(teacherName)}
                        </div>
                        <div className="mates-video">
                            <div className="mate"></div>
                            <div className="mate"></div>
                            <div className="mate"></div>
                        </div>
                        <div className="tool-wrapper">
                            <div className="tool-center-wrapper">
                                <div className="student-show-button">
                                    {showStudents ? <img src={showIcon} alt="show-on-icon" className="student-show"
                                        onClick={() => setShowStudents(false)} /> :
                                        <img src={hideIcon} alt="show-off-icon" className="student-show"
                                            onClick={() => setShowStudents(true)} />}
                                </div>
                                <div className="audio-button">
                                    {isAudioOn ? <img src={audioOn} alt="audio-on-icon" className="audio"
                                        onClick={() => handleAudioOnAndOff(false)} /> :
                                        <img src={audioOff} alt="audio-off-icon" className="audio"
                                            onClick={() => handleAudioOnAndOff(true)} />}
                                </div>
                                <button className="hang-up-button" onClick={handleLeaveRoom}>
                                    End meeting
                                </button>
                                <div className="video-button">
                                    {isVideoOn ? <img src={videoOn} alt="video-on-icon" className="video"
                                        onClick={() => setVideoOn(false)} /> :
                                        <img src={videoOff} alt="video-off-icon" className="video"
                                            onClick={() => setVideoOn(true)} />}
                                </div>
                                
                                <button className="screen-sharing" onClick={toggleScreenSharing}>
                                    {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                                </button>
                                
                            </div>
                        </div>
                    </div>
                    <div className="Teacher-video-chat">
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemoRoomPage;
