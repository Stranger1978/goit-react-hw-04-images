import React, { Component } from 'react';
import Style from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export class Searchbar extends Component {
  state = {
        searchValue: '',
    }
  
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ searchValue: value });
  }; 

    handleSubmit = e => {
      e.preventDefault();
      const { searchValue } = this.state;
      if (searchValue.trim() === '') {
        return toast.warn('Enter new data for searh');
      }
      
      this.props.onSubmit(searchValue);
      this.reset();
    };
    
    reset = () => {
    this.setState({searchValue: ''});
    };

  render() {
    return (
    <header className={Style.Searchbar}>
        <form className={Style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={Style.SearchButton}>
           <BsSearch className={Style.ButtonIcon} />
          <span className={Style.SearchButtonLabel}>Search</span>
        </button>

        <input
          className={Style.SearchFormInput}
          type="text"
          //autocomplete="off"
          //autofocus
          //  value={this.state.searchValue}
            placeholder="Search images and photos"
            onChange={this.handleChange}
        />
      </form>
    </header>
  )} 
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};