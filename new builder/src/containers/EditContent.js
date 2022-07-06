import React, { Component } from "react";
import BuilderControl from "../components/contentbuilder/buildercontrol";
import {Container, Row, Col} from 'react-bootstrap';
import Modal from 'react-awesome-modal';
import { render } from 'react-dom';
import './Home.css'
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom' 
import Pagination from "react-js-pagination"; 
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { api_host } from '../constants';
import { api_hosting } from '../constants';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // see Home.js where localStorage is set first as a sample/initial content
            html: "",
            visible : false,
            title:'',
            description:'',
            selectedFile:'',
            currentPage:1,
            currentsPage:0,
            number_of_pages:1,
            default:0,
            creates:[],
            learning_material:[],
            showData:[],
            content_id:'',
            page_id:'',
            questions:[],
            correct_answer:'',
            activePage:15,
            question:'',
            totalUsers: 0,
            pagtes:'',
            id:'',
            loading:false,
            mydata:[],
        };
        this.history = props.history;
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
/*         this.handleOnSaveAndFinish = this.handleOnSaveAndFinish.bind(this);  */ 
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
          console.log("Thumbnail",{selectedFile: event.target.files[0]});
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

     fullScreenPage = () => 
     {
         var el = document.getElementById('main_content');
         el.requestFullscreen();
     }

    handleOnSave = async(html, pageNumber) => {
        var subjective_questions = document.querySelectorAll('.subjective_question');
        var objective_questions = document.querySelectorAll('.objective_question');
        var selctiny = document.querySelectorAll('.options_booleans');
        
 
          html = html.replace("its-answer", "its-org");
          html = html.replace("multiple_bbolean", "multiple_bboolean");
          html = html.replace("multi_box_answer", "multis_boxes_answers");
          html = html.replaceAll("mcqs-answer", "multi_mcqting_answer");


          html = html.replaceAll('data-editable="false"', 'contenteditable="false"');
          html = html.replaceAll('data-editable="true"', 'contenteditable="true"');

          
        
        console.log("subjective",subjective_questions[0]);
        console.log("objective",objective_questions[0]);
        let questions = [];
         const page_id = this.state.learning_material.length > 0 ? this.state.learning_material[0].id : 0;
        console.log("page_id",page_id)
         for(let question of subjective_questions){
            console.log(question.querySelector('#question').innerText);
            // console.log(question.querySelector('#correct_answer').innerText);
            questions.push({ 
                question : question.querySelector('#question').innerText,
                correct_answer : question.querySelector('#correct_answer').innerText,
                page_id: page_id,
            })
        }
        
        var content_id = this.state.content_id;
        var learning_material = this.state.learning_material[0].id;
    console.log('pageNumber', pageNumber);
    console.log('this.state.number_of_pages', this.state.number_of_pages);

        console.log('this.state.mydata',this.state.mydata);
      if(this.state.number_of_pages == 1)
        {
            const id = this.state.mydata.length > 0 ? this.state.mydata[0]._id : '';
          console.log('Mydatas',id,id != '');  
          if(id == '' || id === undefined)
          {
            const params = new URLSearchParams()
            params.append('content_id', this.state.content_id);
            params.append('page_id', learning_material);
            params.append('html', html);
            const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            }

            const resp = await axios.post(`${api_host}/learning-material/create/`,params, config); 
            this.setState({html:html,
                loading:true,
                content_id:content_id,
                page_id:learning_material,
            });
            if(resp.status === 200)
            {
                console.log(resp.data);
                toast.success("Saved Successfull!",{
                  position:"bottom-right"
              });
            }
          }
          else
          {
              console.log('else mydata ', this.state.mydata);
            const params = new URLSearchParams()
            params.append('page_id', learning_material);
            params.append('html', html);
            const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            }

            const resp = await axios.post(`${api_host}/learning-material/update/`,params, config); 
            this.setState({html:html,
                loading:true,
                content_id:content_id,
                page_id:learning_material,
            });
            if(resp.status === 200)
            {
                console.log(resp.data);
                toast.success("Saved Successfull!",{
                  position:"bottom-right"
              });
            }
          }
        }
        else
        {
           
            const id = this.state.mydata.length > 0 ? this.state.mydata[0]._id : '';
            console.log('MyId',id,id != '');  
            
          if(id == '' || id === undefined)
            {
              const params = new URLSearchParams()
              params.append('content_id', this.state.content_id);
              params.append('page_id', learning_material);
              params.append('html', html);
              const config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
              }
  
              const resp = await axios.post(`${api_host}/learning-material/create/`,params, config); 
              this.setState({html:html,
                  loading:true,
                  content_id:content_id,
                  page_id:learning_material,
              });
              if(resp.status === 200)
              {
                  console.log(resp.data);
                  toast.success("Saved Successfull!",{
                    position:"bottom-right"
                });
              }
            }
            else
            {
                console.log('else mydata ', this.state.mydata);
              const params = new URLSearchParams()
              params.append('page_id', learning_material);
              params.append('html', html);
              const config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
              }
  
              const resp = await axios.post(`${api_host}/learning-material/update/`,params, config); 
              this.setState({html:html,
                  loading:true,
                  content_id:content_id,
                  page_id:learning_material,
              });
              if(resp.status === 200)
              {
                  console.log(resp.data);
                  toast.success("Saved Successfull!",{
                    position:"bottom-right"
                });
              }
            }


        }
    }

    componentWillUnmount() {
        if(this.callDestroy) this.callDestroy();
    }


    async componentDidMount() {
        const id = this.props.match.params.id;
        const myresp = await axios.get(`${api_host}/learning-material/fetch-page-content/${id}`);
        const myrespdata = myresp.data;
        console.log("MyRespDaties",myrespdata);
        this.setState({
            mydata:[myrespdata],
        });


        const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
        const authAxios = axios.create({
          headers:{
                 "X-Auth-Token": `${config}`
          }
        })
     
        var id1 = this.props.match.params.id;
        console.log("id1",id1)
        const result1 = await authAxios.get(`${api_hosting}/learning-material/fetch-page-detail/${id1}`);
        console.log("Result1",result1);
       var response = result1.data.data;
       console.log("response",response);
        this.setState({learning_material:[response]});


        var currentPage = this.state.currentPage;
        console.log("currentPage",currentPage);
        const result = await authAxios.get(`${api_hosting}/tutor/learning-material/fetch`);
        console.log("Result",result);
        var number_of_pages = this.state.number_of_pages;
        var currentPage = this.state.currentPage;
        console.log("NumberPages",number_of_pages);
        const data = result.data.data;
        this.setState({
            creates:data,
            learning_material:data,
            number_of_pages:number_of_pages,
            showData:result.data,
            isLoading:false,
            content_id: id,
            currentPage:currentPage,
        });
    
        this.fetchThePagination(this.state.currentPage);
        
    }




    fetchThePagination = async (pageNumber) => { 
        console.log(pageNumber,'pageNumber');
        const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';

            const authAxios = axios.create({
                headers:{
                       "X-Auth-Token": `${config}`
                }
              })

         
        if( pageNumber == 1 ){
            const id = this.props.match.params.id;
            const result = await authAxios.get(`${api_hosting}/tutor/learning-material/fetch/${id}`);
            console.log("Result",result);
            var number_of_pagies = result.data.number_of_pages ? result.data.number_of_pages+1 : this.state.number_of_pages;
            console.log("NumberPagies",number_of_pagies);
            const data = result.data.data;
            this.setState({
                creates:data,
                profiles:[data],
                number_of_pages:number_of_pagies,
                showData:result.data,
                isLoading:false,
                content_id: id,
                currentPage:pageNumber,
            });
            return;
        
        } 
    let url = `${api_hosting}/learning-material/fetch-pages/${this.state.content_id}?page=${pageNumber}&limit=1`;
    const resp = await authAxios.get(url);  
    console.log("Original",resp.data);
    let data = resp.data.data;
    const id = this.props.match.params.id;
    console.log("pagiID",id);
    const number_of_pages = resp.data.number_of_pages ? resp.data.number_of_pages+1 : this.state.number_of_pages;
    console.log("My number_of_pages", number_of_pages);
    this.setState({
        learning_material:data,
        number_of_pages: number_of_pages,
        currentPage: pageNumber,
    });


  }
  
 /*  
  getContent = async(pageNumber) => {
      if(pageNumber == 1)
      {
  var learning_material = this.props.match.params.id;
    console.log('Learning Material',learning_material);
  const myresp = await axios.get(`${api_host}/learning-material/fetch-page-content/${learning_material}`);
  const myrespdata = myresp.data
  console.log("MyRespData",myrespdata);
  this.setState({
      mydata:myrespdata,
  });
}
else
{
    var learning_material = this.state.learning_material;
    console.log('Learning Material',learning_material);
    const myresp = await axios.get(`${api_host}/learning-material/fetch-page-content/${learning_material}`);
    const myrespdata = myresp.data
    console.log("MyRespDatas",myrespdata);
    this.setState({
        mydata:myrespdata,
    });
}
} */


    closeBuilder = () => {

        const answer = window.confirm(
            'Do you really want to leave?'
        )
        if (!answer) return false

        this.props.history.push('/');
    }

    openModal() {
        this.setState({
            visible : true
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }

    changeContent = (html) => {
        console.log("html",html);
        if(html == '' || html == 'undefined')
            return;
        document.getElementById('main_content').innerHTML = html;
        document.querySelector('#main_content').classList.add('builder-active');
        // document.querySelector('#main_content .row.clearfix').classList.add('row-active');
        // document.querySelector('#main_content .column').classList.add('cell-active');
        // document.querySelector('#main_content .row .column').setAttribute('contenteditable',true);
        // document.querySelector('#main_content .row .column').setAttribute('data-click',true);
        // var d = document.getElementsByClassName('#main_content .row');
        // d.className += ' row-active'; //note the space
        // var c = document.getElementsByClassName('#main_content .column');
        // c.className += ' cell-active';
    }
    handlesInput = (e) => {
        const {name,value} = e.target;
        console.log(name,value);
        this.setState({[name]: value}); 
      }
    
      tutorCreate = async (e) => {
        e.preventDefault();
        console.log("this.state.content_id",this.state.content_id);
        const formData = new FormData()
        formData.append('content_id', this.state.content_id);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('thumbnail', this.state.selectedFile,this.state.selectedFile.name);
        console.warn(this.state.selectedFile);
        const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
        const authAxios = axios.create({
          headers:{
                 "X-Auth-Token": `${config}`
          }
        })
           const res = await authAxios.post(`${api_hosting}/learning-material/add-page`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
              /* console.log("success",res); */   
              if(res.status === 200)
              {
                  // document.getElementsById('languges').reset();   
                  /* console.log(res.data); */
                  toast.success("Page Added Successfull!",{
                    position:"bottom-right"
                });
/*                 setInterval(() => {
                    window.location.reload();
                  }, 1000); */
              } 
              else if(res.status === 400)
              {
                toast.warning("wrong email or password!",{
                  position:"bottom-right"
              });
              }
              else
              {
                this.setState({errorList:res.data.errorsList});
                toast.error("Please Fill The All Field",{
                  position:"bottom-right"
              });
              }
      } 

    
          pageDelete = async () => {
              var contet_id = this.state.content_id;
              console.log("qwerty",contet_id);
          if(this.state.number_of_pages == 1)
              {
                toast.error("This page can't be Delete!",{
                    position:"bottom-right"
                });
              }
              else
              {
           var pageId = this.state.creates[0]._id;
           console.log('pageId',pageId);
        const updatedTasks = this.state.creates.find((page) => pageId === page._id  );
        console.log("hi-red-user",updatedTasks);
        this.setState({ currentpage: updatedTasks});
        console.log("page",{currentpage: updatedTasks});
        axios.delete(`${api_host}/create/tutorPageDelete/${pageId}`).then(res => {
        console.log("delete the data",res.data);
        if(res.status === 200)
       {   
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
      }


    render() 
    {  
        const mydata = this.state.mydata.length > 0 ? this.state.mydata[0]._id : 0;
        // var MYDATA = this.state.mydata;
        console.log('MYDATA',mydata);
        var content_url_id = this.state.content_id;
        console.log("url_id",content_url_id); 
        console.log("url_idies",this.state.learning_material);          
        var url_id = "http://localhost:3000/#/showdata/"+content_url_id;
        console.log("pathing",url_id);
        
         var student_HTMLTABLE = "";
                student_HTMLTABLE = this.state.learning_material.length > 0 ? this.state.learning_material?.map( (item,index) => {    
            
                    return(
                        <>    
                <li key={index} className="setting-01"><Link to="#"><div className="blue-box"></div>{item.title}</Link></li> 
                </>
                        )
                }) : ''; 




        return <>

    <div id="overlay">
  <div className="cv-spinner">
    <span className="spinner"></span>
    </div>
     </div>
        <div className="html_showPart">
       </div>
       <div className="first_data_showPart">
          {/* {this.state.creates.page_title} */}
       </div>
       <div className="logo_tutor">
      <img src="../assets/minimalist-blocks/preview/Logo.svg" alt="logo-img"/>
       </div>
   <div className="back_round"></div>
<div className="is-ui ui_save_content" style={{"position":"fixed","top":"20px","right": "35px","display":"flex","justify-content": "flex-end"}}>
         <img src="../assets/minimalist-blocks/preview/icon/add_page.svg" id="add_current" className="tutor-content-modal"/>
         <img src="../assets/minimalist-blocks/preview/icon/delete_page.svg" className="add-contenting" id="delete_current"/>
            <button type="button" className="save-contenting" onClick={() => this.callSave()}>Save</button>
            {/* <button type="button" onClick={() => this.callSaveAndFinish()} style={{"width":"120px"}}>Save On Page</button> */}
            {/* <button type="button" className="save-contenting" onClick={() => this.closeBuilder()} style={{"width":"85px"}}>Close</button> */}
        </div>

        <div id="confirmModal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog confirm_dialog">
            <div className="modal-content confirm-content">
                <div className="modal-body">
                 <h1>Confirm !</h1>   
                 <h2>Are You Sure Delete Page</h2>
                </div>
                <div className="modal-footer">
                   <button type="button" id="close_hide" className="close btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>
                    <button className="btn btn-confirm" onClick={() => this.pageDelete()}>Confirm</button>
                </div>
            </div>
        </div>
    </div>

        <BuilderControl 
            history={this.history}
            initialHtml={this.state.html} 
            onSave={this.handleOnSave}
            doSave={f => this.callSave = f} /* https://stackoverflow.com/questions/37949981/call-child-method-from-parent */
            doDestroy={f => this.callDestroy = f}
            base64Handler={"/upload"}
            largerImageHandler={"/upload"}
            imageSelect={"images.html"}
            snippetFile={"/assets/minimalist-blocks/content.js"}
            languageFile={"/contentbuilder/lang/en.js"} /> 
          
            {
             this.state.currentPage == 1 ?
             this.state.mydata.length > 0 ? this.state.mydata?.map((items,index) => {
                
                return(
                    <>
                <div key={index} >{this.changeContent(items.html)}</div>
                </>
                )
            }) : ''
            :
            this.state.mydata?.length > 0 ? this.state.mydata?.map( (item,index) => {
               
                    return(
                        <>
                <div key={index}>{this.changeContent(item.html)}</div>
                </>
                        )
                }) : ''
            }     
          <div id="tutor_add_page_modal" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog tutor-adding-page-modal">
            <div className="modal-content tutor_modal">
                <div className="modal-header tutor-modal-header">
                <div className="title_modal-add modal-title h4" id="contained-modal-title-vcenter">Please Enter The 
                        Page Properties</div>
                    <button type="button" id="tutor_close_page" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                <form onSubmit={this.tutorCreate} encType="multipart/form-data">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="control-group file-upload" id="file-upload1">
  <div className="image-box text-center">
  <span className="iconify tutor-iconifing" data-icon="clarity:plus-line"></span>
		<img src="" alt="img-tutor"/>
	</div>
  <div className="controls" style={{"display": "none"}}>
		<input type="file" name="thumbnail" onChange={this.handleInputChange}/>
	</div>
</div>
                <h4 className="tutor-popup-thumbnail">Thumbnail <span>*</span></h4>    
                </div>  
                <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="form-group input-forming">
                <input type="text" name="title" onChange={this.handlesInput}  minlength="4" maxlength="50" className="form-control" placeholder="Enter A Title"/>
            </div>
            <div className="form-group input-forming">
               <textarea type="text" name="description" minlength="4" maxlength="300" rows="4" cols="50" onChange={this.handlesInput} className="form-control" placeholder="Enter A Short Description"></textarea>
            </div>
            <div className="form-group input-forming-btn">
                <button type="submit" className="btn btn-Success btn-new-add">Add New Page</button>
            </div>            
                    </div>  
                </div>          
        
        </form>
                </div>
            </div>
        </div>
    </div>
  
 
                <div className="back_rounds"></div>

          
        <Pagination 
          activePage={this.state.currentPage}
          itemsCountPerPage={1}
          totalItemsCount={3}
          pageRangeDisplayed={this.state.id}
          onChange={this.fetchThePagination}
          itemClass="page-item"
          linkClass="page-link"/> 
 

        <ToastContainer autoClose={2000}/>
        {/* <div className="zoom-tool-bar"></div> */}

        <div className="tutor-menu-content"> 
            <img className="screen_element" onClick={this.fullScreenPage} src="../assets/minimalist-blocks/preview/icon/full_screen.svg" alt="full-icon"/>

        
		<nav className="empowers">
			<ul>
				<li className="menu" id="dropMenu">
					<div className="drop-boxes" data-backdrop="static" data-keyboard="false">
					<a className="drop-textes" href="javascript:void(0)">
                    <img src="../assets/minimalist-blocks/preview/icon/house.svg" alt="full-icon"/>
                    </a>
					</div>
					<ul id="uly" className="settings_empowers">
                        <li className="home">
                        <div className="arrow"></div>
                        <Link to="/">
                        <div className="blue-box"></div>
                        Home</Link>
                        </li>
                        <li className="setting-01">
                        <Link to="/">
                        <div className="blue-box"></div>
                        Dashboard</Link>
                        </li>
                        <li className="setting-02">
                        <a href="javascript:void(0)">
                        <div className="blue-box"></div>
                        Help</a>
                        </li>
					</ul>
				</li>
			</ul>
		</nav>
		<nav className="empower">
			<ul>
				<li className="menu" id="dropMenu">
					<div className="drop-box" data-backdrop="static" data-keyboard="false">
					<a className="drop-text" href="javascript:void(0)">
                    <img src="../assets/minimalist-blocks/preview/icon/power_normal.svg" alt="full-icon"/>
                    </a>
					</div>
					<ul id="tutor_ul" className="setting_empower">
                        <li className="home">
                        <div className="arrow"></div>
                        <a href="javascript:void(0)">
                        <div className="blue-box"></div>
                        Setting</a>
                        </li>
                        <li className="setting-01">
                        <a href="javascript:void(0)">
                        <div className="blue-box"></div>
                        Setting 01</a>
                        </li>
                        <li className="setting-02">
                        <a href="javascript:void(0)">
                        <div className="blue-box"></div>
                        Setting 02</a>
                        </li>
                        <li className="creator">
                        <a href="javascript:void(0)">
                        <div className="blue-box"></div>
                        Creator Type</a>
                        </li>
                        <li className="settings">
                        <a href="javascript:void(0)" className="change_individual" title="minimal" id="pre-minimal" data-value="power" value="Power">
                        <div className="blue-box"></div>
                        Power</a>
                         </li>
                         <li className="messages">
                        <a href="javascript:void(0)" className="change_individual" id="default" data-value="normal" value="Normal">
                        <div className="blue-box"></div>
                        Normal</a></li>
					</ul>
				</li>
			</ul>
		</nav>        
		<nav className="tutor_current_page">
			<ul>
				<li className="menu" id="dropMenu">
					<div className="drop-boxies" data-backdrop="static" data-keyboard="false">
					<a className="drop-texties" href="javascript:void(0)">
                    <img src="../assets/minimalist-blocks/preview/icon/text.svg" alt="full-icon"/>
                    </a>
					</div>
					<ul id="ulies" className="settingies_empoweries">
                        <li className="home">
                        <div className="arrow"></div>
                        <Link to="/">
                        <div className="blue-box"></div>
                        Page Title</Link>
                        </li>
                         {student_HTMLTABLE}  
					</ul>
				</li>
			</ul>
		</nav>
        
        </div>
    </>
    }
}