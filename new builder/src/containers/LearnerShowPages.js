import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { api_host, api_hosting, user_token } from '../constants';
import Icon from 'react-svg-use'
import './Home.css'
import axios from 'axios';

class LearnerShowPages extends Component
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
            advertising:true,
            learning_material: [],
            _id:0,
            mydata: [],
            checked:false,
            content_id: 0,
        };
    }
 
    async componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        const authAxios = axios.create({
          headers:{
                 "X-Auth-Token": `${user.access_token}`
          }
        })

        const id = this.props.match.params.id;
        const result = await authAxios.get(`${api_hosting}/learning-material/fetch-pages/${id}?order=ASC`).
        catch(err => console.log(err));
        let respondes = result.data.data;
        this.setState({learning_material:respondes,isLoaded:false});
        const page_id = this.state.learning_material.length > 0 ? this.state.learning_material[0].id : 0;
        const myresp = await axios.get(`${api_host}/learning-material/fetch-page-content/${page_id}`).
        catch(err => console.log(err));
        var myrespdata = (myresp?.data) ? [myresp.data] : [];     
        this.setState({
            mydata: myrespdata,
            content_id: id,
        });
    }

    getPageContentData = async (page_number) => {

        const page_id = this.state.learning_material.length > 0 ? this.state.learning_material[page_number].id : 0;
        const myresp = await axios.get(`${api_host}/learning-material/fetch-page-content/${page_id}`).
        catch(err => console.log(err));
        var myrespdata = (myresp?.data) ? [myresp.data] : [];     
        this.setState({
            mydata: myrespdata,
        });
    }
    
    pageContent = async (item, index) => {
        this.getPageContentData(index); 
        var pageId = (item.id);
        const updatedTasks = this.state.learning_material.find((page) => pageId === page.id  );
        this.setState({ currentpage: updatedTasks});
    }

    quizSubmit = () => {
    }

    
render ()
{
    
    var page_content = this.state.mydata.length > 0 ? this.state.mydata[0].html : '';
    page_content = page_content.replace(/checked="checked"/gi,'');
     let pageId = this.state.mydata.length > 0 ? this.state.mydata[0].page_id : '';
    localStorage.setItem('pageId',pageId);

    let questions = this.state.mydata.length > 0 ? this.state.mydata[0].questions : '';
    questions = Object.keys(questions).reduce((array, key) => {
        return [...array, {key: questions[key]}]
    }, [])
    localStorage.setItem('questionsarr',JSON.stringify(questions));

  var student_HTMLTABLE = "";
    student_HTMLTABLE = this.state.learning_material.length > 0 ? this.state.learning_material.map( (item,index) => {
      
        return(
            <>
            <div className="learner-bk-side">
             <Container>
                 <Row key={index}>
                     <Col lg={4} md={4} sm={12}>
                     <div className="learner_side_img">
                    <img src="assets/minimalist-blocks/preview/learnerside.svg" alt="img-select"/>
                     </div>
                     </Col>
                     <Col lg={8} md={8} sm={12} className="learner-sieing">
                     <div className="learner_side_heading">
                <button onClick={this.pageContent.bind(this,item,index)} ><h2>{item.title}</h2></button>
                </div>
                     </Col>
                     <Col lg={12} md={12} sm={12}>
                     <p class="more">{item.description}</p>
                     </Col>
                 </Row>
             </Container>
             </div>
            </>
        )
}) : '';


   return(
       <>
       <div className="learner_main_header">
           <Container fluid>
               <Row>
                <Col xxl={4} xl={4} lg={4} md={6} sm={12}>
                   <div class="sidebar-brand">
                    <a href="#">
                      <img src="../assets/minimalist-blocks/preview/Navigation.png" alt="img"/>
                   </a>
                   </div>
                </Col>
                   <Col xxl={4} xl={4} lg={4} md={6} sm={12}>
                   
               </Col>
                   <Col xxl={4} xl={4} lg={4} md={6} sm={12}>
                   <nav class='animated bounceInDown learner_signout'>
	 <ul className="learner_list_item">
		<li class='learner-sub-menu'><a className="learner_first_item" href="javascript:void(0)"><img src="assets/minimalist-blocks/preview/icon/signout.svg" alt="img-select"/><div class='fa fa-caret-down right'></div></a>
			<ul>
                <li><a href='javascript:void(0)'>Profile</a></li>
				<li><Link to="/coursesavailble">SignOut</Link></li>
			</ul>
		</li>
	</ul>
</nav>
                   </Col>
               </Row>
           </Container>
       </div>

       <div className="learner-main-content-data">
           
       </div>

           <div className="learner_show_all_data">
           <Container className="learner_main_container">
           <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
                <div className="learner_main_content">
            <div className="learner-courses-head">
                <h2>{this.state.currentpage.title}</h2>
            </div>
                <div data-is-lerner='true' data-page-id={pageId} data-content-id={this.state.content_id}> {ReactHtmlParser(page_content)}</div>
                </div>
            </Col>
            </Row>
            </Container>

      
            {/* <div id="wrapper" class="toggled"> */}
        <div id="wrapper">
<div id="sidebar-wrapper" className="learner_side_wrapper">
   <ul class="sidebar-nav">

       {student_HTMLTABLE}
       <div className="learner-advertises">
        <Row>
            <Col lg={3} md={3} sm={12}>
            <div className="learner-advertises-img">
            <img src="../assets/minimalist-blocks/preview/advertise.svg" alt=""/>
            </div>
            </Col>
            <Col lg={9} md={9} sm={12}>
            <div className="learners-advertises-heading">
            <span>Need further clarity with the material?</span>
                </div>
            </Col>
            <Col lg={12} md={12} sm={12}>
                <div className="learner-advertises-heading">
                <h5>Book a Free Session with <a href="javascript:void(0);">Vera White</a> Now!</h5>
                </div>
            </Col>
        </Row>
    </div>

   </ul>
</div>        
<div id="page-content-wrapper">
<button class="btn btn-default" id="menu-toggle"><i class="fa fa-angle-double-left"></i></button>
</div>
</div>

           </div>


    <div className="learner-advertise">
        <div className="learner-advertise-img">
            <img src="../assets/minimalist-blocks/preview/advertise.svg" alt=""/>
        </div>
        <div className="learner-advertise-heading">
            <ul>
                <li><span>Need further clarity with the material?</span></li>
                <li><h5>Book a Free Session with <a href="javascript:void(0);">Vera White</a> Now!</h5></li>
            </ul>
            <button type="button" id="learner_close_advertis" class="close">&times;</button>
        </div>
    </div>

       </>
   )
}
}
export default LearnerShowPages