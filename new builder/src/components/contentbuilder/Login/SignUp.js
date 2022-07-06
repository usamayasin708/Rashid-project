import React, {useState} from 'react'
import { Container, Row, Col } from 'react-grid-system';
import { Link } from "react-router-dom";
import '../Login/Login.css';
import { api_host } from '../../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function SignUp()
{

  const [registersInput,setRegisers] = useState({name:'',email:'',password:'',error_list:[],});
  const handlesInputs = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    setRegisers({...registersInput,[name]: value}); 
   }

   const tutorRegister = async (e) => {
    e.preventDefault();
    console.log("hi");
    const params = new URLSearchParams()
params.append('name', registersInput.name);
params.append('email', registersInput.email);
params.append('password', registersInput.password);
       console.log("Selected Field",params);
       const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
       const res = await axios.post(`${api_host}/users/register`, params, config);
          console.log("success",res);   
          if(res.status === 200)
          {
              // document.getElementsById('languges').reset();   
              console.log(res.message);
              toast.success("Register The Value Successfull!",{
                position:"bottom-right"
            });
            window.location.reload();
          } 
          else if(res.status === 400)
          {
                 setRegisers({
                     error_list:res.data.errors
                 })
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
                 <h4>Sign Up To TheTutor</h4>
                 <form onSubmit={tutorRegister}>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group group_label">
                              <label for>UserName</label>
                              <input type="text" name="name" value={registersInput.name} onChange={handlesInputs} className="form-control sign_up_control" placeholder="Please Enter The UserName"/>
                          </div>
                      </Col>
                     </Row>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group group_label">
                              <label for>Email</label>
                              <input type="email" name="email" value={registersInput.email} onChange={handlesInputs} className="form-control sign_up_control" placeholder="Please Enter The Email"/>
                          </div>
                      </Col>
                     </Row>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group group_label">
                              <label for>Password</label>
                              <input type="password" name="password" value={registersInput.password} onChange={handlesInputs} className="form-control sign_up_control" placeholder="Please Enter The Passsword"/>
                          </div>
                      </Col>
                     </Row>
                     <Row>
                      <Col xxl={12} lg={12} md={12}>
                          <div className="form-group">
                              <input type="submit" className="btn btn-pmary btn-primary" value="Sign Up"/>
                          </div>
                      </Col>
                     </Row>
                 </form>
                 <div className="hre_sign_up">
                     <span>AlReady SignUp ? <Link to="/" className="already-sign">Login Here</Link></span>
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
export default SignUp