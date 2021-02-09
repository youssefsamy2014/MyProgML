import React,{useState} from 'react';
import axios from '../../axios-order'
import classes from './Spliter.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const VideoProcess =(props)=>{

    const [userID,setUserID]=useState({
        id:""});
    

    const  spliteHandler = () => {
            const id =userID.id
            let axiosConfig = {
                headers: {
                    
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Credentials': true,
                },crossDomain: true
            };
            axios.get('/Spliter/'+id,axiosConfig)
                .then(function (response) {
                    if(response.status === 200){
                        console.log(response.data)}
                    })
                .catch(function (error) {
                    console.log(error);
                });
        };
        
    const  trainingHandler = (e) => {
        let axiosConfig = {
            headers: {
                
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },crossDomain: true
        };
        axios.get('/Trainning',axiosConfig)
            .then(function (response) {
                if(response.status === 200){
                    console.log(response.data)}
                })
            .catch(function (error) {
                console.log(error);
            });
    };


    const handleChange = (e) => {
        const {id , value} = e.target   
        setUserID(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


    return(
        <div>
        <TextField  type="text" name="facultyid" onChange={handleChange} 
                        id="id" value={userID.id} label="Faculty ID" variant="outlined"
        size="small"/>
            <br/>
        <Button 
        type="submit" 
        onClick={spliteHandler}
        variant="contained" 
        style={{margin:'7px'}}
        >Spiter</Button>

        <Button  
        type="submit" 
        onClick={trainingHandler}
        variant="contained" color="secondary"
        style={{margin:'7px'}}
        >Training</Button>
                            
        </div>
    );
}


export default VideoProcess;