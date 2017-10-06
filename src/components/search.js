import React, { Component } from 'react';


class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (
      <div >
          <form onSubmit={this.handleSubmit}>
            <div className="search-field">
              <label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <button type="submit" value={this.state.value} onClick={this.props.updateSearch}> Submit </button>
            </div>
            <button className="display-source" value={true} onClick={this.props.displaySource}> Display Page Source </button>
            <button className="display-source" value={false} onClick={this.props.displaySource}> Hide Page Source </button> 
          </form>
          

      </div>
    );
  }
}

export default SearchBar;
