import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSabmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      return toast.error('Enter something in the search');
    }

    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSabmit}>
          <button type="submit" className={s.button}>
            <ImSearch />
            <span className={s.button__label}>Search</span>
          </button>
          <input
            onChange={this.handleChange}
            className={s.input}
            value={this.state.search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
