/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">ImpactCast</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Home</NavItem>
                        <NavDropdown eventKey={2} title="Projects and Change Items" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1}>New Project</MenuItem>
                            <MenuItem eventKey={2.2}>Search Projects and Change Items</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Teams" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>New Team</MenuItem>
                            <MenuItem eventKey={3.2}>Search Teams</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={4} title="Resources" id="basic-nav-dropdown">
                            <MenuItem eventKey={4.1}>New Resource</MenuItem>
                            <MenuItem eventKey={4.2}>Search Resources</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#"><span className="glyphicon glyphicon-log-in"/>Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
