import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
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

import Loading from "../../../../components/loading/Loading";

import './DemoRoomPage.scss'

const DemoRoomPage = () => {
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const {roomId} = useParams();
    const navigate = useNavigate()
    const ws = useRef(new WebSocket('ws://localhost:8086/demo-room'));
    const participantsView = useRef(new Map());
    const userName = useRef(jwtDecode(Cookie.get('access_token')).sub);
    const [teacherName, setTeacherName] = useState('');
    const [isAudioOn, setAudioOn] = useState(true);
    const [isVideoOn, setVideoOn] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showStudents, setShowStudents] = useState(true);

    useEffect(() => {
        checkIfExistence(roomId).then(r => console.log("hey"));
        ws.current = new WebSocket('ws://localhost:8086/demo-room');
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
                        handleLeaveRoom()
                        break;
                    case 'iceCandidate':
                        console.info(parsedMessage.candidate)
                        onIceCandidate(parsedMessage)
                        break;
                    default:
                        console.error('Unrecognized message', parsedMessage);
                }
            }
        };
        ws.current.onclose = () => {
            if (participantsView.current.size != 0) {
                window.location.reload()
            }
        }
        return () => {
            console.log("Page unloaded - Close WebSocket");
            ws.current.close();
        };
    }, []);


    const checkIfExistence = async (roomId) => {
        const isExists = await demoRoomService.isRoomExists(roomId);
        if (!isExists) {
            navigate("/")
        }
    }


    const onExistingParticipants = (msg) => {
        console.log(userName.current + " registered in room " + roomId);
        participantsView.current.set(userName.current, <Participant name={userName.current}
                                                                    isOwnCamera={true}
                                                                    sendMessage={sendMessage}/>)
        setTeacherName(msg.teacherName)
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
                                                          sendMessage={sendMessage}
        />)

        triggerRender();
    }
    const handleLeaveRoom = () => {
        participantsView.current.clear();
        sendMessage({
            id: 'leaveRoom'
        });
        ws.current.close();
        navigate("/classes");
        window.location.reload()
    }
    const onParticipantLeft = (request) => {
        participantsView.current.delete(request.name)
        triggerRender();
    }
    console.log(teacherName)
    return (
        <div className="DemoRoomPage">
            {loading && <Loading/>}
                <div className= {`students-video-wrapper ${!showStudents&&'hide-students'}`}>
                    {Array.from(participantsView.current.values()).map((participant, index) => {
                        if (participant.props.name === teacherName) return;
                        return (
                            <div className="demo-video-item" key={index}>
                                {participant}
                            </div>
                        )
                    })}
                </div>
            <div className="teacher-video-wrapper">
                <div className="teacher-video">
                    {
                        participantsView.current.get(teacherName)
                    }
                </div>
                <div className="tool-wrapper">
                    <div className="tool-center-wrapper">
                        <div className="student-show-button">
                            {showStudents ? <img src={showIcon} alt="show-on-icon" className="student-show"
                                              onClick={() => setShowStudents(false)}/> :
                                <img src={hideIcon} alt="show-off-icon" className="student-show"
                                     onClick={() => setShowStudents(true)}/>}
                        </div>
                        <div className="audio-button">
                            {isAudioOn ? <img src={audioOn} alt="audio-on-icon" className="audio"
                                              onClick={() => setAudioOn(false)}/> :
                                <img src={audioOff} alt="audio-off-icon" className="audio"
                                     onClick={() => setAudioOn(true)}/>}
                        </div>
                        <div className="hang-up-button">
                            <img onClick={handleLeaveRoom} src={hang_up_icon} alt="hang-up-icon"
                                 className="hang-up-icon"/>
                        </div>
                        <div className="video-button">
                            {isVideoOn ? <img src={videoOn} alt="video-on-icon" className="video"
                                              onClick={() => setVideoOn(false)}/> :
                                <img src={videoOff} alt="video-off-icon" className="video"
                                     onClick={() => setVideoOn(true)}/>}
                        </div>
                        <div className="empty-block">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemoRoomPage;