import React, {useState, useEffect} from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { useHistory, Link  } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './Home.css';
import axios from 'axios';
import {api_host, api_hosting,api_hosting_main , user_token} from '../constants'

function CoursesAvailble(props)
{
    const [contentLearner,setContent] = useState({learning_material:[],isLoading:true});
 
    const [pageCount, setPageCount] = useState({
        number_of_pages:1
    });
  
     const getData = (params) => {
       const array = [...contentLearner]
       array.push(params);
       setContent(array);
     } 

    useEffect( async() => {
        let user = JSON.parse(localStorage.getItem("user"));
        const authAxios = axios.create({
          headers:{
                 "X-Auth-Token": `${user.access_token}`,
                 "Content-Type": 'application/json',
                 "Accept": 'application/json'
          }
        })
            const resp          = await authAxios.get(`${api_hosting_main}/learner/learning-material/list`);
            let response        = resp.data.data;
            console.log("Response",resp);
            var number_of_pages = resp.data.number_of_pages;
            setPageCount(number_of_pages)
            setContent({...contentLearner,learning_material:response,isLoading:false});
            
        },[]);

        const fetchPagination = async(currentPage) => {
          let user = JSON.parse(localStorage.getItem("user"));
          const authAxios = axios.create({
              headers:{
                     "X-Auth-Token": `${user.access_token}`
              }
            })
            let limit = 6;
            const res     = await authAxios.get(`${api_hosting_main}/learner/learning-material/list?page=${currentPage}&limit=${limit}&ORDER=DESC`);
            let response  = await res.data.data;
            return response;
          }
    
      const handlePagePagination = async (data) => {
          let currentPage = data.selected+1;
          const commentsFormServer = await fetchPagination(currentPage);
          setContent({...contentLearner,learning_material:commentsFormServer,isLoading:false});
      }

    return(
        <>
        <div className="">
        <Container>
            <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
            <div className="learner-courses-head">
                <h2>Courses Available</h2>
                </div>
            </Col>
            {
      contentLearner.learning_material?.map((item,index) => {
         return (
             <>
         <Col xl={4} lg={4} md={4} sm={12} key={index}>
                    <div className="learner-courses">
                        {/* <img src="assets/minimalist-blocks/preview/Free-Online-Courses-with-Certificates.jpg" alt=""/> */}
                    <h4><Link to={`learnershowpages/${item.id}`}>{item.title}</Link></h4>
                    </div>
                </Col>
        </>
         )
      })
    }
            </Row>
        </Container>

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

        </div>
        </>
    )
}
export default CoursesAvailble