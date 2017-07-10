/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';

export default class UpdateRequiredResource extends Component {
    render() {
        return (
            <Panel header="Update Required Resource" bsStyle="primary">
                <form>
                    <FormGroup controlId="roleName">
                        <ControlLabel>Role Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="roleName" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="pLine">
                        <ControlLabel>P Line:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="P01.02">P01.02</option>
                            <option value="P01.02.A">P01.02.A</option>
                            <option value="P01.06">P01.06</option>
                            <option value="P01.08">P01.08</option>
                            <option value="P01.10">P01.10</option>
                            <option value="P02.02">P02.02</option>
                            <option value="P02.02.F">P02.02.F</option>
                            <option value="P02.04.A">P02.04.A</option>
                            <option value="P02.05">P02.05</option>
                            <option value="P02.05.F">P02.05.F</option>
                            <option value="P02.08">P02.08</option>
                            <option value="P02.12">P02.12</option>
                            <option value="P03.02">P03.02</option>
                            <option value="P03.02.F">P03.02.F</option>
                            <option value="P03.03">P03.03</option>
                            <option value="P03.05">P03.05</option>
                            <option value="P03.05.F">P03.05.F</option>
                            <option value="P04.18">P04.18</option>
                            <option value="P04.101">P04.101</option>
                            <option value="P04.102">P04.102</option>
                            <option value="P04.103">P04.103</option>
                            <option value="P04.104">P04.104</option>
                            <option value="P04.105">P04.105</option>
                            <option value="P04.106">P04.106</option>
                            <option value="P04.107">P04.107</option>
                            <option value="P04.108">P04.108</option>
                            <option value="P04.109">P04.109</option>
                            <option value="P04.110">P04.110</option>
                            <option value="P04.111">P04.111</option>
                            <option value="P04.101.A">P04.101.A</option>
                            <option value="P04.102.A">P04.102.A</option>
                            <option value="P04.103.A">P04.103.A</option>
                            <option value="P04.104.A">P04.104.A</option>
                            <option value="P04.105.A">P04.105.A</option>
                            <option value="P04.106.A">P04.106.A</option>
                            <option value="P04.107.A">P04.107.A</option>
                            <option value="P04.108.A">P04.108.A</option>
                            <option value="P04.109.A">P04.109.A</option>
                            <option value="P04.110.A">P04.110.A</option>
                            <option value="P04.111.A">P04.111.A</option>
                            <option value="P04.101.F">P04.101.F</option>
                            <option value="P04.102.F">P04.102.F</option>
                            <option value="P04.103.F">P04.103.F</option>
                            <option value="P04.104.">P04.104.F</option>
                            <option value="P04.105.F">P04.105.F</option>
                            <option value="P04.106.F">P04.106.F</option>
                            <option value="P04.107.F">P04.107.F</option>
                            <option value="P04.108.F">P04.108.F</option>
                            <option value="P04.109.F">P04.109.F</option>
                            <option value="P04.110.F">P04.110.F</option>
                            <option value="P04.111.F">P04.111.F</option>
                            <option value="P04.888">P04.888</option>
                            <option value="P05.07">P05.07</option>
                            <option value="P05.08">P05.08</option>
                            <option value="P05.13">P05.13</option>
                            <option value="P05.14">P05.14</option>
                            <option value="P06.01">P06.01</option>
                            <option value="P06.02">P06.02</option>
                            <option value="P09.18">P09.18</option>
                            <option value="P09.101">P09.101</option>
                            <option value="P09.102">P09.102</option>
                            <option value="P09.103">P09.103</option>
                            <option value="P09.104">P09.104</option>
                            <option value="P09.105">P09.105</option>
                            <option value="P09.106">P09.106</option>
                            <option value="P09.107">P09.107</option>
                            <option value="P09.108">P09.108</option>
                            <option value="P09.109">P09.109</option>
                            <option value="P09.204">P09.204</option>
                            <option value="P09.205">P09.205</option>
                            <option value="P09.206">P09.206</option>
                            <option value="P09.207">P09.207</option>
                            <option value="P09.208">P09.208</option>
                            <option value="P09.209">P09.209</option>
                            <option value="P09.999">P09.999</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="company">
                        <ControlLabel>Company:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="CG Aspire">CG Aspire</option>
                            <option value="CG Others">CG Others</option>
                            <option value="Other Contractors">Other Contractors</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="resourceType">
                        <ControlLabel>Resource Type:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="Agile Product Owner">Agile Product Owner</option>
                            <option value="Agile Scrum Master">Agile Scrum Master</option>
                            <option value="Applications Analyst">Applications Analyst</option>
                            <option value="Applications Problem Manager">Applications Problem Manager</option>
                            <option value="Applications Service Lead">Applications Service Lead</option>
                            <option value="Bid Manager">Bid Manager</option>
                            <option value="CDTi Developer">CDTi Developer</option>
                            <option value="CDTi Tester">CDTi Tester</option>
                            <option value="Clone Tester">Clone Tester</option>
                            <option value="DES Developer">DES Developer</option>
                            <option value="DES Tester">DES Tester</option>
                            <option value="DAPI Developer">DAPI Developer</option>
                            <option value="DAPI Tester">DAPI Tester</option>
                            <option value="Env Managment">Env Managment</option>
                            <option value="EPG Application Analyst">EPG Application Analyst</option>
                            <option value="Front End Manager">Front End Manager</option>
                            <option value="Independent Tester">Independent Tester</option>
                            <option value="Internal Apps Developer">Internal Apps Developer</option>
                            <option value="Internal Apps Tester">Internal Apps Tester</option>
                            <option value="Messaging Developer">Messaging Developer</option>
                            <option value="Messaging Tester">Messaging Tester</option>
                            <option value="Networks DDOS">Networks DDOS</option>
                            <option value="Networks BIG IP Architect">Networks BIG IP Architect</option>
                            <option value="Networks BIG IP Engineer">Networks BIG IP Engineer</option>
                            <option value="Networks BIG IP Provision">Networks BIG IP Provision</option>
                            <option value="Networks BIG IP Support">Networks BIG IP Support</option>
                            <option value="Networks Cloud Architect">Networks Cloud Architect</option>
                            <option value="Networks Cloud Engineer">Networks Cloud Engineer</option>
                            <option value="Networks Cloud Provision">Networks Cloud Provision</option>
                            <option value="Networks Cloud Support">Networks Cloud Support</option>
                            <option value="Networks Core Architect">Networks Core Architect</option>
                            <option value="Networks Core Engineer">Networks Core Engineer</option>
                            <option value="Networks Core Provision">Networks Core Provision</option>
                            <option value="Networks Core Support">Networks Core Support</option>
                            <option value="Networks DDOS Architect">Networks DDOS Architect</option>
                            <option value="Networks DDOS Engineer">Networks DDOS Engineer</option>
                            <option value="Networks DDOS Provision">Networks DDOS Provision</option>
                            <option value="Networks DDOS Support">Networks DDOS Support</option>
                            <option value="Netowrks Management">Netowrks Management</option>
                            <option value="Networks Splunk Architect">Networks Splunk Architect</option>
                            <option value="Networks Splunk Engineer">Networks Splunk Engineer</option>
                            <option value="Networks Splunk Provision">Networks Splunk Provision</option>
                            <option value="Networks Splunk Support">Networks Splunk Support</option>
                            <option value="PMO Analyst">PMO Analyst</option>
                            <option value="PMO Manager">PMO Manager</option>
                            <option value="PO Architect">PO Architect</option>
                            <option value="PO Engineer">PO Engineer</option>
                            <option value="PO Env Mgt">PO Env Mgt</option>
                            <option value="PO Management">PO Management</option>
                            <option value="PO Provision">PO Provision</option>
                            <option value="PO Support">PO Support</option>
                            <option value="PO Test">PO Test</option>
                            <option value="Portal Developer">Portal Developer</option>
                            <option value="Portal Tester">Portal Tester</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Programme Manager">Programme Manager</option>
                            <option value="Project Architect">Project Architect</option>
                            <option value="Project Lead">Project Lead</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Requirements Analysis">Requirements Analysis</option>
                            <option value="RTI Developer">RTI Developer</option>
                            <option value="RTI Tester">RTI Tester</option>
                            <option value="Service Delivery Manager">Service Delivery Manager</option>
                            <option value="Service Introduction Manager">Service Introduction Manager</option>
                            <option value="Software Architect">Software Architect</option>
                            <option value="Test Analyst">Test Analyst</option>
                            <option value="Test Manager">Test Manager</option>
                            <option value="Test Technical Specialist">Test Technical Specialist</option>
                            <option value="Websols Developer">Websols Developer</option>
                            <option value="Websols Tester">Websols Tester</option>
                            <option value="XFERS Application Analyst">XFERS Application Analyst</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="grade">
                        <ControlLabel>Grade:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="O1">O1</option>
                            <option value="O2">O2</option>
                            <option value="O3">O3</option>
                            <option value="O4">O4</option>
                            <option value="O5">O5</option>
                            <option value="O6">O6</option>
                            <option value="O7">O7</option>
                            <option value="O8">O8</option>
                            <option value="O9">O9</option>
                            <option value="O10">O10</option>
                            <option value="T1">T1</option>
                            <option value="T2">T2</option>
                            <option value="T3">T3</option>
                            <option value="T4">T4</option>
                            <option value="T5">T5</option>
                            <option value="T6">T6</option>
                            <option value="T7">T7</option>
                            <option value="T8">T8</option>
                            <option value="T9">T9</option>
                            <option value="VP">VP</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="stage">
                        <ControlLabel>Stage:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="Project and Programme Management">
                                Project and Programme Management
                            </option>
                            <option value="Architecture and Design">Architecture and Design</option>
                            <option value="Requirements">Requirements</option>
                            <option value="Build and Unit Test">Build and Unit Test</option>
                            <option value="System Test">System Test</option>
                            <option value="UAT Support">UAT Support</option>
                            <option value="Integration">Integration</option>
                            <option value="Inter System Test">Inter System Test</option>
                            <option value="Implementation">Implementation</option>
                            <option value="Support">Support</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="jobCode">
                        <ControlLabel>Job Code:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="" selected/>
                            <option value="National Systems Normal">National Systems Normal</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="system">
                        <ControlLabel>System:</ControlLabel>
                        <FormControl name="system" required/>
                    </FormGroup>
                    <FormGroup controlId="component">
                        <ControlLabel>Component:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="" selected/>
                            <option value="CDF F/W">CDF F/W</option>
                            <option value="Core">Core</option>
                            <option value="D/W Audit">D/W Audit</option>
                            <option value="D/W Back">D/W Back</option>
                            <option value="D/W Front">D/W Front</option>
                            <option value="Decision Service">Decision Service</option>
                            <option value="E">E</option>
                            <option value="F/W">F/W</option>
                            <option value="ICP">ICP</option>
                            <option value="Legacy">Legacy</option>
                            <option value="NIRS">NIRS</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="pricingFlag">
                        <ControlLabel>Pricing Flag:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="" selected/>
                            <option value="Fixed">Fixed</option>
                            <option value="Input Based">Input Based</option>
                            <option value="Productivity Based">Productivity Based</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="reason">
                        <ControlLabel>Reason:</ControlLabel>
                        <FormControl componentClass="select" required>
                            <option value="" selected/>
                            <option value="Agile">Agile</option>
                            <option value="D/W Agreement">D/W Agreement</option>
                            <option value="Data Cleansing">Data Cleansing</option>
                            <option value="Data Migration">Data Migration</option>
                            <option value="Decision Service">Decision Service</option>
                            <option value="Decommissioning">Decommissioning</option>
                            <option value="EDI">EDI</option>
                            <option value="ESB">ESB</option>
                            <option value="EU Compliance/Conformance">EU Compliance/Conformance</option>
                            <option value="EU Gateway">EU Gateway</option>
                            <option value="FELIX">FELIX</option>
                            <option value="Fixed Enhancements">Fixed Enhancements</option>
                            <option value="HMRC Agreement">HMRC Agreement</option>
                            <option value="ICP">ICP</option>
                            <option value="LTS">LTS</option>
                            <option value="No Function Points">No Function Points</option>
                            <option value="Nugatory Work">Nugatory Work</option>
                            <option value="Other">Other</option>
                            <option value="Package">Package</option>
                            <option value="Presentation">Presentation</option>
                            <option value="Productivity High FPs">Productivity High FPs</option>
                            <option value="Productivity Low FPs">Productivity Low FPs</option>
                            <option value="Project Governance">Project Governance</option>
                            <option value="Regression Testing">Regression Testing</option>
                            <option value="Technical S/W Change">Technical S/W Change</option>
                            <option value="Testing Assurance">Testing Assurance</option>
                            <option value="Testing with a 3rd Party">Testing with a 3rd Party</option>
                            <option value="UEX">UEX</option>
                            <option value="WCM">WCM</option>
                            <option value="Work Item Types">Work Item Types</option>
                        </FormControl>
                    </FormGroup>

                    <Button bsStyle="success" bsSize="large" block>Update Required Resource</Button>
                </form>
            </Panel>
        )
    }
}