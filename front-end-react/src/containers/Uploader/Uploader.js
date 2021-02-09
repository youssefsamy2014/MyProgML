import React ,{useState}from 'react';
import classes from './Uploader.css'
import axios from '../../axios-order'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles({
//     root: {
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       border: 0,
//       borderRadius: 3,
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       color: 'white',
//       height: 48,
//       padding: '0 30px',
//     },
//   });



const Uploader =()=>{
const[state,setState]=useState({selectedFile: null,
    loaded: 0
})// eslint-disable-next-line
const [userID,setUserID]=useState({
    id:""});

const  onChangeHandler = (e) => {
        setState({
            selectedFile: e.target.files[0],
            
            loaded: 0
        });
        console.log(e.target.files[0])
    };

    const handleChange = (e) => {
        const {id , value} = e.target   
        setUserID(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

const  handleSubmit = (e) => {
        e.preventDefault();
        const file = state.selectedFile,
        reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        const payload={
            "video":b64
            }
            const id =userID.id
            let axiosConfig = {
                headers: {
                    
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Credentials': true,
                },crossDomain: true
            };
            axios.post('/savevide/'+id, payload,axiosConfig)
                .then(function (response) {
                    if(response.status === 200){
                        console.log(response.data)}
                    })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    // const classes=useStyles();
    return (
    <form  onSubmit={handleSubmit}>
<div className={classes.button_wrap}>
  <label className ={classes.new_button} for="upload"> Upload Video</label>
  <input id='upload' type="file" />
</div>
<br/>

        {/* <label>Upload Video :</label>
        <br/>
            <input type=file" name="file"  onChange={onChangeHandler}/>
                                                                        <br/>
                                                                        <br/>
         */}
             <TextField type="text" name="facultyid" onChange={handleChange} 
               id="id" value={userID.id} label="Faculty ID" variant="outlined"
               size="small"

               />
      <Button
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        type="submit"
        size="medium"
      >
        Upload
      </Button>                                                             <br/>

    </form>         
);};

export default Uploader;