import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-grid-system';
import '../LoginLearner/Login.css';
import { Link, useHistory  } from "react-router-dom";
import { api_host } from '../../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login()
{

  const [loginInput,setLogin] = useState({email:'',password:'',error_list:[],});

  const history = useHistory();

  const handlesInput = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    setLogin({...loginInput,[name]: value}); 
   }

       
   const tutorLogin = async (e) => {
    e.preventDefault();
    console.log("hi");
    const params = new URLSearchParams()
    params.append('email', loginInput.email);
    params.append('password', loginInput.password);
           console.log("Selected Field",params);
           const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
       console.log("Selected Field",params);
       const res = await axios.post(`${api_host}/usersLearner/loginLearner`, params, config);
          console.log("success",res);   
          if(res.status === 200)
          {
              // document.getElementsById('languges').reset();   
              console.log(res.message);
              toast.success("Learner Login Successfull!",{
                position:"bottom-right"
            });
            setInterval(() => {
                // window.location.href = "/coursesavailble"
                history.push("/coursesavailble");
                window.location.reload();
              }, 2000);
          } 
          else if(res.status === 400)
          {
            toast.warning("wrong email or password!",{
              position:"bottom-right"
          });
          }
          else
          {
            setLogin({...loginInput,error_list:res.data.errorsList});
            toast.error("Please Fill The All Field",{
              position:"bottom-right"
          });
          }
  } 


    return(
    <>
    <div className="">
        <div className="sign_up_tech">
            <Container>
            <div className=""></div>
            <div className="sing_up_move">
            <Row>
                <Col xxl={6} lg={6} md={6}>
                   <div className="sign_up_head">
                    <h1>Welcome To <span>TheTutor</span></h1>
                    <p>TheTutor help connect all learner with the people and resources nedd to reach
                        their full potential.
                    </p>
                   </div>
                </Col>
                <Col xxl={6} lg={6} md={6}>
                <div className="sign_up_form">
                 <h4>Login To TheTutor</h4>
                 <form onSubmit={tutorLogin}>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group group_label">
                              <label for>Email</label>
                              <input type="email" name="email" value={loginInput.email} onChange={handlesInput} className="form-control sign_up_control" placeholder="Please Enter The Email"/>
                          </div>
                      </Col>
                     </Row>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group group_label">
                              <label for>Password</label>
                              <input type="password" name="password" value={loginInput.password} onChange={handlesInput} className="form-control sign_up_control" placeholder="Please Enter The Passsword"/>
                          </div>
                      </Col>
                     </Row>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group">
                              <input type="submit" className="btn btn-pmary btn-primary" value="Login"/>
                          </div>
                      </Col>
                     </Row>
                 </form>
                 <div className="hre_sign_up">
                     <span>Don't have account ? <Link to="/signuplearner" className="already-sign">Sign Up Here</Link></span>
                 </div>
                </div>
                </Col>
            </Row>
            </div>
            </Container>
        </div>
    </div>
    <ToastContainer/>
    </>
);
}
export default Login