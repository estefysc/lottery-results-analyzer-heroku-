import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navigation.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {faPlusMinus} from '@fortawesome/free-solid-svg-icons';
import {LinkContainer} from 'react-router-bootstrap'

function Navigation() {
    return (
        <>
            <Navbar variant="dark" expand="lg">
                {/*<div className="container">*/}
                <Navbar.Brand className="brand">
                    <FontAwesomeIcon icon={faPlusMinus} />
                </Navbar.Brand>
                <Navbar.Toggle className="collapsed-nav" aria-controls="basic-navbar-nav">
                        <span >
                            <FontAwesomeIcon className="bars" icon={faBars} />
                        </span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto">
                        {/*<LinkContainer to="/">*/}
                        {/*    <Nav.Link className="nav-link">*/}
                        {/*        Home*/}
                        {/*    </Nav.Link>*/}
                        {/*</LinkContainer>*/}
                        <LinkContainer to="about">
                            <Nav.Link className="nav-link">
                                About
                            </Nav.Link>
                        </LinkContainer>
                        <NavDropdown className="drp-menu" title="Explore" id="navbarScrollingDropdown">
                            <LinkContainer to="frequentNums">
                                <NavDropdown.Item className="drp-item">
                                    Frequent Numbers
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="evenOdds">
                                <NavDropdown.Item className="drp-item">
                                    Evens and Odds
                                </NavDropdown.Item>
                            </LinkContainer>
                            {/*<NavDropdown.Item className="drp-item">*/}
                            {/*    Something else here*/}
                            {/*</NavDropdown.Item>*/}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                {/*</div>*/}
            </Navbar>
        </>
    );
}

export default Navigation;