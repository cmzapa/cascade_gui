import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import '../css/App.css';

import AddReporting from './components/report/AddReporting';
import Home from './components/Home';
import AddRequirement from './components/requirement/AddRequirement';
import ListReports from './components/report/ListReports';
import ListRequirements from './components/requirement/ListRequirements';
import Navigation from './components/Navigation';
import DraftList from './components/draftreport/DraftList';
import { Navbar, NavbarBrand } from "react-bootstrap";

import { Link } from 'react-router-dom';
import data1 from './data/allreportsresponse.json';
import ReportView from './components/report/ReportView';
import DraftView from './components/draftreport/DraftView';
import { FaCheck, FaWindowClose, FaTags, FaRegListAlt } from "react-icons/fa";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import axios from 'axios';
class App extends Component {
  _isMounted = false;
  constructor() {

    super();
    this.state = {
      reports: [],
      requirements: [],
      drafts: [],
      sidePaneOpen: false,
      lastIndex: 0

    };
    this.handleClick = this.handleClick.bind(this);
    this.getData = this.getData.bind(this);
    this.getFakeData = this.getFakeData.bind(this);
    this.uploadRequirements = this.uploadRequirements.bind(this);
    // this.uploadRequirements();

  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    // this.getData("allreports");
    // this.getFakeData();


  }
  componentDidMount() {
    this.uploadRequirements();
    let reports = this.getData("allreports");
    let requirements = this.getData("allrequirements");
// console.log(reports)
    this.setState({
      reports: reports,
      drafts: reports,
      requirements: requirements
    });

    // this.getFakeData()
  }
 
  getFakeData() {
    this.setState({
      reports: data1,
      drafts: data1
    })
    // return data1;
  }
  uploadRequirements() {
    console.log("axios request")
    // axios.defaults.headers.post['Content-Type'] = 'application/json';

    const payload = [
      { "req_id": "REQ-324445-A", "text": "Is there a cocktail bar in the hotel?" },
      { "req_id": "REQ-324445-B", "text": "Are there trains or buses around?" },
      { "req_id": "REQ-324445-C", "text": "What is there to do near the hotel for fun?" }];

    axios.post("http://localhost:3005/provide_queries", payload)
      .then((response) => {
        // console.log(response.data)
        // console.log(response)
      })
  }

  getData(path) {
    console.log("getData2")
    axios.get("http://localhost:3000/" + path)
      .then((res) => {
        // console.log("respons from get data")
        // console.log(res)
        return res.data;
      })
    // const res = await fetch("http://localhost:3000/" + path)
    //   .then((res) => {
    //     return res.data
    //   })
    // const reports = await res.json();
    // this.setState({ reports: reports, drafts: reports });

  }
  handleClick(e) {

    this.setState({
      sidePaneOpen: !this.state.sidePaneOpen

    })
  }

  render() {
    return (


      <Router>
        <div className="container-fluid">
          <header>
            <Navbar fixed="top" color="337ab7" bg="dark" className="navbar-dark bg-dark" >

              <NavbarBrand>
                <Link className="text-white navbar-brand" to="/">
                  <h1><font color="37eb34">CASCADE</font></h1>
                </Link>
              </NavbarBrand>
              <Navigation />
            </Navbar>
          </header>


          <main role="main" className="container" style={{ marginTop: '1em' }} id="petratings">


            <SideNav style={{ marginTop: '5em', background: ' #555555 ' }}

              onSelect={(selected) => {
                // Add your code here
              }}
            >
              <SideNav.Toggle />

              <SideNav.Nav defaultSelected="req">
                <NavItem eventKey="req" expanded={true}>
                  <NavIcon>
                    <FaTags />
                  </NavIcon>
                  <NavText>
                    Req Counts
                    </NavText>


                  <NavItem eventKey="req/accepted">
                    <NavText>
                      <FaCheck color={'green'} /> Accepted: 5
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="req/rejected">
                    <NavText>
                      <FaWindowClose color={'red'} /> Rejected: 2
                      </NavText>
                  </NavItem>

                </NavItem>
                <NavItem eventKey="requirements" expanded={true}>
                  <NavIcon>
                    <FaRegListAlt />
                  </NavIcon>
                  <NavText>
                    Requirements
                    </NavText>
                  <NavItem eventKey="requirements/pir">
                    <NavText>
                      PIR: 3
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="requirements/cir">
                    <NavText>
                      CIR: 2
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="requirements/nir">
                    <NavText>
                      NIR: 2
                      </NavText>
                  </NavItem>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
            <div className="row">
              <div className="col-md-11 offset-md-1">
                <Switch>
                  <Route exact path="/" render={(props) => (
                    <Home />
                  )} />
                  <Route exact path="/list-reports" render={(props) => (
                    <ListReports reports={this.state.reports} />
                  )} />
                  {/* <Route path="/list-reports" component={ListReports} /> */}
                  <Route path="/list-requirements" render={(props) => (
                    <ListRequirements requirements={this.state.requirements} />
                  )} />
                  <Route path="/add-report" component={AddReporting} />
                  <Route path="/add-requirement" component={AddRequirement} />

                  <Route exact path="/list-drafts" render={(props) => (
                    <DraftList
                      handleClick={this.handleClick}
                      sidePaneOpen={this.state.sidePaneOpen}
                      reports={this.state.drafts} />
                  )} />
                  <Route path="/report/:id" render={(props) => {

                    let reportPosition = props.location.pathname.replace('/report/', '');
                    return (
                      <ReportView
                        report={this.state.reports[reportPosition - 1]}
                      />
                    )
                  }} />
                  <Route path="/draft/:id" render={(props) => {

                    let reportPosition = props.location.pathname.replace('/draft/', '');
                    return (
                      <DraftView
                        report={this.state.reports[reportPosition]}
                      />
                    )
                  }} />
                </Switch>
              </div>
            </div>
          </main>

        </div>
      </Router >

    );
  }
}

export default App;
