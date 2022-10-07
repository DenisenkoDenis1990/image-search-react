import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('Search query is empty! Enter search request!');
      return;
    }
    onSubmit(query);
  };

  const inputHandler = event => {
    setQuery(event.target.value);
  };

  return (
    <header className={'Searchbar'}>
      <form className="SearchForm" onSubmit={submitHandler}>
        <button type="submit" className="SearchForm-button">
          <ImSearch />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onInput={inputHandler}
        />
      </form>
    </header>
  );
};
export default Searchbar;
