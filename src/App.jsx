import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';

export default class App extends Component {
  state = {
    search: '',
  };

  handleFormSubmit = search => {
    this.setState({ search });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery search={this.state.search} />
        <ToastContainer />
      </div>
    );
  }
}
