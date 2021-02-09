import React ,{useState}from 'react';
import axios from '../../axios-order'
import Input from '../../components/UI/Input/Input'
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Registration.css'
import Button from '../../components/UI/Button/Button';


const Registration =(props)=>{
const [regForm, setRegForm] = useState({


    nationalid: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'National ID'
        },
        value: '',
        validation: {
          required: true
                },
        valid: false,
        touched: false
      },
      firstname: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'First Name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        
    lastname: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      
    facultyid: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Faculty ID'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      
    faculty: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Faculty'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },

    dept: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Dept'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      }
    });


const [masseges,setMsg]=useState({
    massege:""
})

const sendDetailsToServer = () => {
    const payload={
    "dept":regForm.dept.value , 
    "email":regForm.email.value, 
    "faculty":regForm.faculty.value, 
    "facultyid":regForm.facultyid.value, 
    "firstname":regForm.firstname.value, 
    "lastname":regForm.lastname.value, 
    "nationalid":regForm.nationalid.value, 
    "password":regForm.password.value,
    "usertype":"admin"
    }

    axios.post('/Registration', payload)
        .then(function (response) {
            if(response.status === 200){
                console.log(response.data)}
                setMsg({"massege":response.data.message})
                console.log(masseges)
            })
        .catch(function (error) {
            console.log(error);
        });
}

const submitHandler = (e) => {
    e.preventDefault();
    sendDetailsToServer();
    props.history.push('/Login')
  }


const formElementsArray = [];
  for (let key in regForm) {
    formElementsArray.push({
      id: key,
      config: regForm[key]
    });
  }
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(regForm, {
      [controlName]: updateObject(regForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          regForm[controlName].validation
        ),
        touched: true
      })
    });
    setRegForm(updatedControls);
  };
let form = (
    <form onSubmit={submitHandler}>
      {formElementsArray.map(formElement => (
        <Input
        
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
           invalid={!formElement.config.valid}
           shouldValidate={formElement.config.validation}
           touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />

      ))}
        <Button btnType="Success">REGISTER</Button>

    </form>
  );


return(
    <div className={classes.registration}>
 
    {form}
</div>  
    )
};

export default Registration;