// ---------- Class Based Components, Top Loading Bar -----------

import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default class App extends Component {
  pageSize = 10;

  constructor(){
    super();
    this.state = {
      progress : 0
    }
  }

  setProgress = (progress)=>{
    this.setState({progress : progress})
  }

  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route exact path='/business' element={<News key={"business"} pageSize={this.pageSize} category={"business"} setProgress={this.setProgress}/>} />
            <Route exact path='/entertainment' element={<News key={"entertainment"} pageSize={this.pageSize} category={"entertainment"} setProgress={this.setProgress}/>} />
            <Route exact path='/' element={<News key={"general"} pageSize={this.pageSize} category={"general"} setProgress={this.setProgress}/>} />
            <Route exact path='/health' element={<News key={"health"} pageSize={this.pageSize} category={"health"} setProgress={this.setProgress}/>} />
            <Route exact path='/science' element={<News key={"science"} pageSize={this.pageSize} category={"science"} setProgress={this.setProgress}/>} />
            <Route exact path='/sports' element={<News key={"sports"} pageSize={this.pageSize} category={"sports"} setProgress={this.setProgress}/>} />
            <Route exact path='/technology' element={<News key={"technology"} pageSize={this.pageSize} category={"technology"} setProgress={this.setProgress}/>} />
          </Routes>
        </Router>

      </>
    )
  }
}