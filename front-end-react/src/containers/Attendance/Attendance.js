import React,{useState} from 'react';
import axios from '../../axios-order'
import classes from './Attendance.css'
import VideoRecorder from 'react-video-recorder'
import Button from '@material-ui/core/Button';


const Attendance = () => {
  const [recordedChunks, setRecordedChunks] = useState([]);
  const handleSubmit =() => {
      const reader = new FileReader(); 
      reader.readAsDataURL(recordedChunks); 
      reader.onloadend = function () { 
      const b64 = reader.result.replace(/^data:.+;base64,/, '');
      const payload={
      "video":b64
        }
        let axiosConfig = {
          headers: {
              
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': "*",
              'Access-Control-Allow-Credentials': true,
          },crossDomain: true
      };
        axios.post('/Attendance', payload,axiosConfig)
            .then( (response) =>{
                if(response.status === 200){
                    console.log(response.data.students_attended_today)}
                })
            .catch( (error) =>{
                console.log(error);
            });
      }
    
  }
  return (
    <div className={classes.container}>
      
   
      <div className={classes.camcon} >
      <VideoRecorder  audio={false} 
    className={classes.cam}
    onRecordingComplete={videoBlob => {
      // Do something with the video...
      setRecordedChunks(videoBlob)
      console.log('videoBlob', videoBlob)}}
      />

</div>
<Button variant="contained" 
      color="primary" 
      className={classes.Button } 
      onClick={handleSubmit} 
      type="submit"
      style={{margin:'7px',background:'#2D8EDD'}}
      >Save Video</Button >

</div>

  );
};

export default Attendance;