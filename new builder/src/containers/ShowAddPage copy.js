import React, {useState,useEffect} from "react";
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import './Home.css'


function ShowAddPage()
{
  const [pageInput,setPage] = useState({profiles:[],isLoading:true});
  const [currentPage,setCurrentPage] = useState(1);



 const handlePageChange = (pageNumber) => {
   setCurrentPage(pageNumber);
   console.log(`active page is ${currentPage}`);
  }

    useEffect( async() => {
    const resp = await axios.get(`http://localhost:5000/api/profiles/tutorPage?page=${currentPage}&limit=1`);
    console.log("Original",resp.data);
    let response = resp.data.data;
    console.log("response",resp,'activepage',currentPage);
    setPage({...pageInput,profiles:response,isLoading:false})
    setCurrentPage(currentPage);
    console.log("responseing",currentPage);
    },[currentPage]);
   return(
       <>
       <div className="show_page-add">
         <Container>
           {
             pageInput.profiles.map((item, index) => (
               <>
               <div className="" key={index}>
         <Row>
           <Col lg={12} md={12} sm={12}>
             <div className="ftr-create-page">
               <h1>{item.page_title}</h1>
             </div>
           </Col>
         </Row>
            <Row>
              <Col lg={6} md={6} sm={6}>
                <div className="ftr-content">
                <p>{item.short_description}</p>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6}>
              <div className="ftr-thumbnail">
               <img src="../../../assets/minimalist-blocks/images/-BwYjC1.jpg" alt="thumbnail-img"/>
              </div>
              </Col>
              </Row>
              </div>
              </>
            ))
           }
             <Pagination
          activePage={currentPage}
          itemsCountPerPage={1}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
            </Container>
       </div>
       </>
   )
}
export default ShowAddPage