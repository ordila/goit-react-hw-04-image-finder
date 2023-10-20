import React, { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onFormSubmit }) => {
  const [value, setValue] = useState('');
  const handleSubmitSearchForm = event => {
    event.preventDefault();
    onFormSubmit(value);
    setValue('');
  };
  const handleInputChange = event => {
    const { value } = event.target;
    setValue(value);
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmitSearchForm}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
