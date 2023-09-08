import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function navbar() {
  return (
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <span className='navbar-title'>Flow</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default navbar