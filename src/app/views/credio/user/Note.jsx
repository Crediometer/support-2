import './user.css';
import Icon from '@mui/material/Icon';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BsThreeDotsVertical} from 'react-icons/bs'
import Modal from '@mui/material/Modal';
import { Card, Grid, MenuItem, Select, Box, styled } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCredio from '../../../hooks/useCredio';
import useFetchData from '../../../hooks/useFetch';
import Sendnotification from './Sendnotification';
import axios from 'axios';
import { MatxLoading } from '../../../components';


const API_ENDPOINT = 'https://credio-api.herokuapp.com/api/v1/admin/send/notifications/single?';
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const Note = () => {
    var { loaded, credio, getNewDashboard } = useCredio();
    const [data, setData] = useState('');
    let { phoneNumber } = useParams();
    const [show, setshow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleoption = ()=>{
        setshow(!show);
    }
    const ContentBox = styled('div')(({ theme }) => ({
        margin: '30px',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://credio-api.herokuapp.com/api/v1/admin/send/notifications/single?phoneNumber=${phoneNumber}`);
          setData(response.data.data);
        } catch (error) {
          console.error(error);
        }finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [phoneNumber]);

    const handleClick = (_id) => {
        setData(prevData => {
          const newData = prevData.map(note => {
            if (note._id === _id) {
                return { ...note, isButtonClicked: !note.isButtonClicked };
            } else {
              return note;
            }
          });
          return newData;
        });
      };
      if (loaded)
            return ( 
                <Fragment>
                <ContentBox className="analytics">
                <>
                <div className="note">
                        <div className="notification-head">
                            <div className="notification-left">
                                <p className="notification-header">Notification</p>
                                {/* <p className="notification-subheader">You have 1 <span>unread notification</span></p> */}
                            </div>
                            <div className="notification-right">
                                
                                <div className="notification-right-icon">
                                    <div className="red-dot"></div>
                                    <Icon>notifications</Icon>
                                </div>
                            </div>
                        </div>
                        <div className="note-container">
                            <div className="date-mark">
                                <p className="time-sent">Today</p>
                                <p className='mark-all'>Mark all as Read</p>
                            </div>
                            {/* {data.map((note) => {
                                <div className="note-message">
                                <div className="note-message-left">
                                    <div className="note-image">
                                        <Icon>person</Icon>
                                    </div>
                                    <div className="note-content">
                                        <p className='note-content-message'>{note.title}</p>
                                        <p className="time">12:30pm</p>
                                    </div>
                                </div>
                                <div className="note-message-right" onClick={handleoption}>
                                    <Icon className='more-icon'>moreVertRounded</Icon>
                                    {show && (
                                        <div className="optionss">
                                            <p>Mark as read</p>
                                            <p>delete</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            }
                            )} */}
                            {isLoading ? (
                                <p>Loading...</p>
                            ): data.length > 0 ? (
                                <div>
                                    {data.map((note) =>(
                                        <div className="note-message" key={note._id}>
                                            <div className="note-message-left">
                                                <div className="note-image">
                                                    <Icon className='person-icon'>person</Icon>
                                                </div>
                                                <div className="note-content">
                                                    <p className='note-content-message'>{note.title}</p>
                                                    <p className="time">{note.createdAt.slice(11, 16)}</p>
                                                </div>
                                            </div>
                                            <div className="note-message-right" >
                                                <div onClick={() => handleClick(note._id)}><BsThreeDotsVertical/></div>
                                                {note.isButtonClicked && (
                                                    <div className="optionss">
                                                        <p>Mark as read</p>
                                                        <p>delete</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ): 
                                <p className='note-empty'>{`No Note found for ${phoneNumber}`}</p>
                            }
                        </div>
                        <div className="send-notification-button" onClick={handleOpen}>
                            <Icon className='send'>send</Icon>
                        </div>  
                </div> 
                </>
                </ContentBox>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Sendnotification phoneNumber={phoneNumber}/>
                    </Box>
                </Modal>
            </Fragment>
            );
            else return <MatxLoading></MatxLoading>;
}
 
export default Note;