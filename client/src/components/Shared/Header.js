/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <img src="/img/logo.png" alt="Auga" height="100%"/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title="Projects and Change Items" id="basic-nav-dropdown">
                            <MenuItem eventKey={1.1} href="/newProject">New Project</MenuItem>
                            <MenuItem eventKey={1.2} href="/searchProjects">Search Projects and Change Items</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={2} title="Teams" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} href="/newTeam">New Team</MenuItem>
                            <MenuItem eventKey={2.2} href="/searchTeams">Search Teams</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Resources" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/newResource">New Resource</MenuItem>
                            <MenuItem eventKey={3.2} href="/searchResources">Search Resources</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/login">
                            <Glyphicon glyph="log-in"/> Logout
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
