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
import { api_hosting } from '../constants';


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
    console.log(name,value);
    setAdd({...addInput,[name]: value}); 
  }

  const tutorCreate = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams()
    params.append('title', addInput.title);
    params.append('description', addInput.description);
    // params.append('html', addInput.html);
    // params.append('author', addInput.author);
          //  setLoading(true);
           changeModalShow(false);
           const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
           const authAxios = axios.create({
             headers:{
                    "X-Auth-Token": `${config}`
             }
           })
           const res = await authAxios.post(`${api_hosting}/learning-material/add`,params);
           console.log("Original",res.data);
          if(res.status === 200)
          {
            console.log(res.data.message);
            localStorage.setItem('auth_token', res.data.token);
              toast.success("Add New Learning Material Successfull!",{
                position:"bottom-right"
            });


            //Create The Defaukt Page Starts
            const formData = new FormData()
            formData.append('content_id', res.data.data.id);
            formData.append('title', 'Default');
            formData.append('description', 'Some');
            const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
            const authAxios = axios.create({
              headers:{
                     "X-Auth-Token": `${config}`
              }
            })
               const res_pages = await authAxios.post(`${api_hosting}/learning-material/add-page`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });
            //Create The Defaukt Page Ends


          //  setLoading(true);
/*            setTimeout(function(){
            window.location.reload(1);
         }, 2000); */
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
  const [pageCount, setPageCount] = useState({number_of_pages:''});

  useEffect(() => {

    const fetchPosts = async() => {
      const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
      const authAxios = axios.create({
        headers:{
               "X-Auth-Token": `${config}`
        }
      })
      let limit = 40;
      const resp = await authAxios.get(`${api_hosting}/tutor/learning-material/fetch?page=1&limit=${limit}`);
      // console.log("User Fetch Data",resp);
      let response = resp.data.data;
      const number_of_pages = resp.data.number_of_pages;
      // console.log("Number_of_Pages",number_of_pages);
      setPageCount(number_of_pages);
      setContent(response);
    }
    fetchPosts();
      },[]);

      const fetchPagination = async(currentPage) => {
        console.log("CurrentPage",currentPage);
        const config = 'eyJpdiI6InhocUtXTTNWMWNaNnBYeTZOY0d0ekE9PSIsInZhbHVlIjoiZkk1ZlFmTzBTa0pYMnRyMkY3WVJiZ3FGMjhHTHl6Um9BYUNvcVRRNzR0c3c1YTkxaVBTcTRNRC9TUUhBd3NIMlNFSklxZFZKSHQvT1BScDF6TFZwVDRVd25IWndBeHZSOTNYUy8xcEVYTE1TV2FoKzZrYVhzaWYyVXpzQ29wYTJ3NEx0UmpaeU5RT1Nkb3NJdnFNekg1bWNJbXViLzdqSUg1R0UwaWxWYUZweXNFbnd5ZmRleGNUUVN3VmhzUm41ZGJxVnlTdzZoUWJXU01iTHdvbU53czIya2FsK3Uzb004OHZYZm9xeWM2S1FyN0psaEFZa2pnd0dwRnEvZHJ3OWVEYUFmZFJ0bVNQVUwrV0ZKdVBIUFVDVDN3TVdwWEVLamRFQjVZOHIzckU4UmpWQlNzTWpJem1TaWUrYkJpa3RQRzE1OXlJTEpMcFMzOC91T1EwQ2VRdmdJQ1BFN085c3pFcEgvRzh6YklZTjlia1VQNVQvRGkyTHZQakRESlZtZm5naW1BNmFybS9mNVZYZURoS0NGQ3l4SFQ4L3Uwa2lPdDd4Wm5DemhhUnNCT1FCbzBpbm00R29sbXA5bjAwWVBvVVlOTEpMby80OUpWdHA3aEU4OFJGbGdlZUpRRjZWcW1lWTh4UnN5NTU4RFVtSUJzU2NBeEo3SW8zdUZ2UlB4T0dXNkFUN0dGZWs1NmVRT08wRm12c2N0eVVYUEZyYWFuMWJzbWVrN1o3ZklhL2dxSHg2dFhNZXRrTGlxSDJWUkxsMFd4Rk9xREx2OWFxbk9tVlZ5enMvdGdzU0ZoRUZkcXpzNFV2cExQWT0iLCJtYWMiOiJkMzM1NWM1Nzg1ZmRkM2MwYWIxYzcwMzBiODM2NTljNTg4MzAwODVmZGIxY2FjMDBlMjdhMDg5YTljNTg4MDMwIiwidGFnIjoiIn0=';
        const authAxios = axios.create({
          headers:{
                 "X-Auth-Token": `${config}`
          }
        })
        let limit = 40;
        const res = await authAxios.get(`${api_hosting}/tutor/learning-material/fetch?page=${currentPage}&limit=${limit}`);
        console.log("Responing",res.data);
        let response = await res.data.data;
        console.log("response",response);
        return response;
      }

  const handlePagePagination = async (data) => {
      console.log(data.selected);
      let currentPage = data.selected+1;
      console.log("CurrentPage",currentPage);
      const commentsFormServer = await fetchPagination(currentPage)
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
       <ToastContainer/>
   </>
    );
}
export default AddPage;