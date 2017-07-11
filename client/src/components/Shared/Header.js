/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <Navbar fluid collapseOnSelect>
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
                        <NavDropdown eventKey={1} title="Projects" id="basic-nav-dropdown">
                            <LinkContainer to="/newProject">
                                <MenuItem eventKey={1.1}>New Project</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/searchProjects">
                                <MenuItem eventKey={1.2}>
                                    Search Projects and Change Items
                                </MenuItem>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown eventKey={2} title="Teams" id="basic-nav-dropdown">
                            <LinkContainer to="/newTeam">
                                <MenuItem eventKey={2.1}>New Team</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/searchTeams">
                                <MenuItem eventKey={2.2}>Search Teams</MenuItem>
                            </LinkContainer>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Resources" id="basic-nav-dropdown">
                            <LinkContainer to="/newResource">
                                <MenuItem eventKey={3.1}>New Resource</MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/searchResources">
                                <MenuItem eventKey={3.2}>Search Resources</MenuItem>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/login">
                            <NavItem eventKey={1}><Glyphicon glyph="log-in"/> Logout</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
