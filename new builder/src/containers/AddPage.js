import React, {useState,useEffect} from 'react'
import './Home'
import { Modal, Button, Row, Col, Container } from 'react-bootstrap'
import { useHistory, Link  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios' 
import { api_hosting, api_host, user_token } from '../constants';


const override = css`
  display: block;
  margin: 0 auto; 
  color: #fff;
`;

function MyVerticallyCenteredModal(props) {
  
  const [addInput,setAdd] = useState({title:'',description:'',number_of_pages:1,html:'',author:'',error_list:[],});
  let [loading, setLoading] = useState(false);
  const {changeModalShow} = props;
  const handlesInput = (e) => {
    const {name,value} = e.target;
    setAdd({...addInput,[name]: value}); 
  }
  const toastId = React.useRef(null);

console.log("AddInput",addInput);

  const tutorCreate = async (e) => {
    e.preventDefault();
    console.log("AddInputTitle",addInput.title)
    if(addInput.title == '' || addInput.description == ''){
      toast.error("Please fill all fields.",{ position:"bottom-right" });
      return false;
    }
    const params = new FormData()
    params.append('title', addInput.title);
    params.append('description', addInput.description);
           changeModalShow(false);
           let user = JSON.parse(localStorage.getItem("user"));
           const authAxios = axios.create({
             headers:{
                    "X-Auth-Token": `${user.access_token}`
             }
           })
          
           const res = await authAxios.post(`${api_hosting}/learning-material/add`,params);
          if(res.status === 200)
          {
            localStorage.setItem('auth_token', res.data.token);

              toast.success("Add New Learning Material Successfull!",{
                position:"bottom-right"
            });


            props.fetchPagination(1);
            //Create The Defaukt Page Starts
            const formData = new FormData()
            formData.append('content_id', res.data.data.id);
            formData.append('title', 'Default');
            formData.append('description', 'Enter Some Description');
            const authAxios = axios.create({
              headers:{
                     "X-Auth-Token": `${user.access_token}`
              }
            })
               const res_pages = await authAxios.post(`${api_hosting}/learning-material/add-page`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });
              
            //Create The Defaukt Page Ends
          } 
          else if(res.status === 400)
          {
            toast.warning("wrong email or password!",{
              position:"bottom-right"
          });
          }
          else
          {
            setAdd({...addInput,errorList:res.data.errorsList});
            toast.error("Please Fill The All Field",{
              position:"bottom-right"
          });
          }
  } 


  return (
    <>
    <div className="sweet-loading">
      <div className="swt-loading">
      <DotLoader loading={loading} css={override} size={150} />
    </div>
    </div>
   
      <Modal
        {...props}
        size="md"
        className="fade"
        aria-labelledby="contained-modal-title-vcenter"
        top
      >
        <Modal.Header closeButton>
          <Modal.Title className="title_modal-add" id="contained-modal-title-vcenter">
            Please Enter The Content Properties
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={tutorCreate}>
            <div className="form-group input-forming">
                <label>Content Title <span>*</span></label>
                <input type="text" name="title" onChange={handlesInput} className="form-control" placeholder="Enter A Title"/>
            </div>
            <div className="form-group input-forming">
               <label>Short Description <span>*</span></label>
               <textarea type="text" name="description" onChange={handlesInput} className="form-control" placeholder="Enter A Short Description"></textarea>
            </div>
            <div className="form-group input-forming-btn">
      <button type="submit" className="btn btn-Success btn-new-add">Add Learning Material</button>
            </div>
        </form>
        </Modal.Body>
      </Modal>
      </>
    );
  }
  

function AddPage()
{
  const [contentInput,setContent] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(async() => {
      const authAxios = axios.create({
        headers:{
               "X-Auth-Token": `${user.access_token}`
        }
      })
      let limit = 6;
      const resp              = await authAxios.get(`${api_hosting}/tutor/learning-material/fetch?page=1&limit=${limit}&ORDER=DESC`);
      let response            = resp.data.data;
      const number_of_pages   = resp.data.number_of_pages;
      console.log("Leaning data", response);
      setPageCount(number_of_pages);
      setContent(response);
  },[]);

      const fetchPagination = async(currentPage) => {
        let user = JSON.parse(localStorage.getItem("user"));
        const authAxios = axios.create({
          headers:{
                 "X-Auth-Token": `${user.access_token}`
          }
        })
        let limit = 6;
        const res     = await authAxios.get(`${api_hosting}/tutor/learning-material/fetch?page=${currentPage}&limit=${limit}&ORDER=DESC`);
        let response  = await res.data;
        setPageCount(response.number_of_pages);
        setContent(response.data);
        return response.data;
      }

  const handlePagePagination = async (data) => {
      let currentPage = data.selected+1;
      const commentsFormServer = await fetchPagination(currentPage);
      setContent(commentsFormServer);
  }

  function changeModalShow(value){
    setModalShow(value);
  }
    const [modalShow, setModalShow] = React.useState(false); 
    return(
   <>
       <div className="add_page-mul">
          <div className="add_multiple_pae">
              <button className="btn btn-new-page" onClick={() => setModalShow(true)}>Learning Material</button>
          </div>
          <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        changeModalShow={changeModalShow}
        fetchPagination={fetchPagination}
      />
   <Container>
  <Row>
    {
      contentInput.map((item,index) => {
    return(
  <Col xl={6} lg={6} md={6} sm={12} key={index}>
    <div className="main-page-section">
      <Row>
        <Col xl={6} lg={8} md={8} sm={12}>
          <div className="main-courses-show">
          <div className="show_content-courses">
          <Link to={`/showdata/${item.id}`}>
          <h4>{item.title}</h4>
          </Link>
          </div>
          </div>
        </Col>
        <Col xl={6} lg={4} md={4} sm={12}>
          <div className="edit-content">
            <ul className="list-content">
              <li><Link to={`/edit/${item.id}`} className="btn btn-success-new">Edit</Link></li>
              <li><Link to="/loginlearner" className="btn btn-publisher">Publisher</Link></li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  </Col>
);
})
}
</Row>
</Container>
       </div>
       <ReactPaginate 
          previousLabel="<"
          nextLabel=">"
          activeClassName={'active'}
          itemsCountPerPage={1}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePagePagination}
          containerClassName={'pagination react-pagintion'}
          pageClassName = {'page-item'}
          pageLinkClassName={'page-link'}
          /> 
       <ToastContainer />
   </>
    );
}
export default AddPage;