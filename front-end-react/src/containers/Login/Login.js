import React ,{useState} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Login.css' 
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

const Login =(props)=>{
// useEffect(() => {
//   props.onCheckAuth()
//   //   if (props.authRedirectPath !== '/Login') {
//   //     props.onSetAuthRedirectPath();
//   //   }// eslint-disable-next-line 
//   }, []);

const [loginForm, setLoginForm] = useState({
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
      }
    });// eslint-disable-next-line

    const sendDetailsToServer = () => {
        const payload={
        "email":loginForm.email.value,
        "password":loginForm.password.value,
        }
        props.onAuth(payload);
      };
    
    
    const submitHandler = (e) => {
      e.preventDefault();
      sendDetailsToServer()
      // props.history.push('/Recorder');
    
    }


   

const formElementsArray = [];
  for (let key in loginForm) {
    formElementsArray.push({
      id: key,
      config: loginForm[key]
    });
  }
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(loginForm, {
      [controlName]: updateObject(loginForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          loginForm[controlName].validation
        ),
        touched: true
      })
    });
    setLoginForm(updatedControls);
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
              <Button btnType="Success">LOGIN</Button>

    </form>
  );



  
  // let errorMessage = null;

  // if (props.error) {
  //   errorMessage = <p>{props.error.message}</p>;
  // }

  // let authRedirect = null;
  // if (props.isAuthenticated) {
  //   authRedirect = <Redirect to={props.authRedirectPath} />;
  // }

return(
  <div className={classes.login}>
 
    {form}
    
</div>
   
    );
};

const mapStateToProps = state => {
  return {
    error: state.error,
    isAuthenticated: state.token !== null,
    // authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (payload) =>dispatch(actions.auth(payload)),
    // onCheckAuth:()=>dispatch(actions.authCheckState())
    // onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/Login'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
