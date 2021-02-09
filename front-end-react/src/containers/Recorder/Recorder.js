import React,{useState} from 'react';
import axios from '../../axios-order'
import Uploader from '../Uploader/Uploader'
import classes from './Recorder.css'
import VideoRecorder from 'react-video-recorder'
import Spliter from '../Spliter/Spliter';
// import { connect } from 'react-redux';
// import * as actions from '../../store/actions/index'
import Button from '@material-ui/core/Button';


const Recorder = (props) => {
  // useEffect(() => {
  //   props.onCheckAuth()
  //   //   if (props.authRedirectPath !== '/Login') {
  //   //     props.onSetAuthRedirectPath();
  //   //   }
  //   // eslint-disable-next-line 
  //   }, []);

   const [recordedChunks, setRecordedChunks] = useState([]);
  
  //eslint-disable-next-line
  const [userData,setUserData]=useState({
    id:"171011"
  })
  const submitHandler =() => {
  
      const reader = new FileReader(); 
      reader.readAsDataURL(recordedChunks); 
      reader.onloadend = function () { 
      const b64 = reader.result.replace(/^data:.+;base64,/, '');
      const payload={
      "video":b64
        }
        const id =userData.id
        axios.post('/savevide/'+id, payload)
            .then( (response)=> {
                if(response.status === 200){
                    console.log(response.data)}
                })
            .catch( (error)=> {
                console.log(error);
            });
      }
    }
  return (
    <div className={classes.container}>
      <div className={classes.camcon}>
      <VideoRecorder 
    onRecordingComplete={videoBlob => {
      
      setRecordedChunks(videoBlob)
      console.log('videoBlob', videoBlob)}}
      />
      </div>
    
      <Button variant="contained" 
      color="primary" 
      className={classes.Button } 
      onClick={submitHandler} 
      style={{margin:'7px',background:'#2D8EDD'}}
      >Save Video</Button >
      <Spliter/>
<hr/>
<br/>

<div className={classes.conUploader}>

<Uploader/>

</div>
</div>    
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onCheckAuth:()=>dispatch(actions.authCheckState())
//     // onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/Login'))
//   };
// };

export default Recorder

// connect(
//   // mapDispatchToProps
// )(Recorder);

