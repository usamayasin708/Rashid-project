import React, {Component} from "react";
import './containers/Home.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactHtmlParser from 'react-html-parser';
import { api_host } from "./constants";
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap';

class ShowData extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            // see Home.js where localStorage is set first as a sample/initial content
            visible : false,
            page_title:'',
            short_description:'',
            creates:[],
            profiles:[],
            showData:[],
            content_id:'',
            isLoaded:true,
            currentpage:'',
            pageContent:'',
            _id:0,
        };
    }

 
    async componentDidMount() {
        const _id = this.props.match.params.id;
        console.log("hi",_id);
        const resp = await axios.get(`${api_host}/create/tutorPageShow/${_id}`);
        console.log("Original",resp.data);
        let responde = resp.data
        this.setState({creates:responde,isLoaded:false,})
    }

    pageDelete = async () => {
        var fetchId  = this.state.currentpage;
        console.log("fetchId",fetchId);
        var pageId = fetchId._id;
        console.log("user get the ID",pageId);
        const updatedTasks = this.state.creates.find((page) => pageId === page._id  );
        console.log("hi-red-user",updatedTasks);
        this.setState({ currentpage: updatedTasks});
        console.log("page",{currentpage: updatedTasks});
        axios.delete(`${api_host}/create/tutorPageDelete/${pageId}`).then(res => {
        console.log("delete the data",res.data);
        if(res.status === 200)
       {
           // document.getElementsById('languges').reset();   
           console.log(res.data);
           toast.success("Delete The Successfull!",{
             position:"bottom-right"
         });
         setInterval(() => {
             window.location.reload();
           }, 1000);
       } 
      })
      .catch(e => {
        console.log(e);
      });
       
      }

    pageContent = (item) => {
        var pageId = (item._id);
        console.log("hi-user",pageId);
        const updatedTasks = this.state.creates.find((page) => pageId === page._id  );
        console.log("hi-red-user",updatedTasks);
        this.setState({ currentpage: updatedTasks});
        console.log("page",{currentpage: updatedTasks});
    }

render ()
{
  var student_HTMLTABLE = "";
    student_HTMLTABLE = this.state.creates.length > 0 ? this.state.creates.map( (item,index) => {
        console.log("hi-item",item);
        return(
            <>
                <li key={index}>
                <div className="pages_image_show learner-side-page">
                     <button onClick={this.pageContent.bind(this,item)} ><h2>{item.page_title}</h2></button>
                     {/* <p class="more">{item.short_description}</p> */ console.log(item.id)}
                </div>
                </li>
            </>
        )
}) : '';


   return(
       <>
           <div className="tutor-save-data">
           <Container>
           <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
            <div className="tutor-courses-head">
                <h2>{this.state.currentpage.page_title}</h2>
            </div>
                <div> {ReactHtmlParser(this.state.currentpage.html)}</div>
            </Col>
            </Row>
            </Container>

      
            {/* <div id="wrapper" class="toggled"> */}
        <div id="wrapper">
<div id="sidebar-wrapper">
   <ul class="sidebar-nav">
       <li class="sidebar-brand">
           <a href="#">
               <img src="../assets/minimalist-blocks/preview/Navigation.png" alt="img"/>
           </a>
       </li>
       {student_HTMLTABLE}
   </ul>
</div>        
<div id="page-content-wrapper">
<button class="btn btn-default" id="menu-toggle"><i class="fa fa-angle-double-left"></i></button>
</div>
</div>

<div className="data_page_delete">
    <button className="btn btn-danger" onClick={this.pageDelete}>Delete The Page</button>
</div>

           </div>
           <ToastContainer/>
       </>
   )
}
}
export default ShowData