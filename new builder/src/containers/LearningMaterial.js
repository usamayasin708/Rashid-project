import React from 'react';
import { Modal, Button, Row, Col, Container } from 'react-bootstrap'
import { Link  } from "react-router-dom";

const LearningMaterial = ({ contentInput }) => {

  return (
    <ul className='list-group mb-4'>
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
    </ul>
  );
};
export default LearningMaterial;