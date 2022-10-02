import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../styles.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  submitHandler = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Search query is empty! Enter search request!');
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  inputHandler = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <header className={'Searchbar'}>
        <form className="SearchForm" onSubmit={this.submitHandler}>
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
            onInput={this.inputHandler}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
