import { useState } from 'react';
import Style from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');
  
  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearchValue(value);
  }; 

   const handleSubmit = e => {
      e.preventDefault();
      if (searchValue.trim() === '') {
        return toast.warn('Enter new data for searh');
      }
      
      onSubmit(searchValue);
      setSearchValue('');
    };
    

    return (
    <header className={Style.Searchbar}>
        <form className={Style.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={Style.SearchButton}>
           <BsSearch className={Style.ButtonIcon} />
          <span className={Style.SearchButtonLabel}>Search</span>
        </button>

        <input
          className={Style.SearchFormInput}
          type="text"
           autoComplete="off"
           autoFocus
            value={searchValue}
            placeholder="Search images and photos"
            onChange={handleChange}
        />
      </form>
    </header>
  )} 

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};