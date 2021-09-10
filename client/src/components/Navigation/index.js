import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">ARCCOM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">            
            {/* <Nav.Link href="/policies">Policies</Nav.Link>            
            <NavDropdown title="Standards" id="basic-nav-dropdown">
              <NavDropdown.Item href="/standards">Standards</NavDropdown.Item>
              <NavDropdown.Item href="/standards/gradingstandards">Item Grading</NavDropdown.Item> 
            </NavDropdown>
            <Nav.Link href="/procedures">Procedures</Nav.Link>
            <NavDropdown title="Certifications" id="basic-nav-dropdown">
              <NavDropdown.Item href="/certifications/certify">Certify</NavDropdown.Item>    
              <NavDropdown.Item href="/certifications/review">Review</NavDropdown.Item>
              <NavDropdown.Item href="/certifications/create">Create</NavDropdown.Item>          
            </NavDropdown>
            <Nav.Link href="/safety">Safety</Nav.Link> */}
            <NavDropdown title="Audits" id="basic-nav-dropdown">
              <NavDropdown.Item href="/audits/conductaudit">Conduct Audit</NavDropdown.Item>
              <NavDropdown.Item href="/audits/createaudit">Create Audit</NavDropdown.Item>
              <NavDropdown.Item href="/audits/auditresults">Audit Results</NavDropdown.Item>
              <NavDropdown.Item href="/audits/updateaudit">Update Audit</NavDropdown.Item>
              <NavDropdown.Item href="/audits/deleteaudit">Delete Audit</NavDropdown.Item>
            </NavDropdown>                       
            <NavDropdown title="Other Links" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="https://www.arcaugusta.com/" target="_blank">ARC Augusta</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
