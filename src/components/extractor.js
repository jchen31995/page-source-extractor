import React, { Component } from 'react';
import '../App.css';
const axios = require('axios');
import SearchBar from './search'

class HTMLScraper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSource: '',
      searchValue: "",
      tagCounter: {},
      error: 'true',
      display: 'true'
    };
  }


  countTags(responseData){
    const self = this;
    var counter = {};
    var singleTags = ['path','area','base','br','col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']


    var allTags = /<[^>]*>/g
    var found = responseData.match(allTags)
    found.forEach(function(tag){
      var htmlTag;

      if (tag.substr(0,2) === "</"){ //get closing tags
        htmlTag = '<' + tag.substr(2).slice(0, -1) + ' />'
      } else{ //everything else including random accidents to check for Singleton tags
        htmlTag = tag.split(' ')[0].substr(1) 
        if (!singleTags.includes(htmlTag)){
          return;
        }
        htmlTag = '<' + htmlTag + " />"
      }

      // increment counter for tag or create key
      if(counter[htmlTag]){
          counter[htmlTag]++;
      }
      else{
        counter[htmlTag] = 1;
      }
    }) 


    self.setState({tagCounter: counter}) 



  }


  getHTML(){
    const self = this;

    var urlRequested = 'https://cors-anywhere.herokuapp.com/' + self.state.searchValue
    axios.get(urlRequested)
    .then(({data}) => {
      self.setState({pageSource: data, error: 'false'},function(){ self.countTags(data)}) 
    })

    .catch(error => {
      console.log('Error ', error.message)
      self.setState({pageSource: "Unable to fetch requested URL. Please try again!", error: 'true'})
    })
  }

  setSearchValue (event){
    const self = this;
    self.setState({searchValue: event.target.value, searchType: "Search"}, function(){
      self.getHTML()
    })
  }

  toggleSource(event){
    const self = this;
    self.setState({display: event.target.value}) //for some reason, event target value is string instead of boolean

  }

  displaySource(){
    const self = this;
    var inlineStyle= { border: '1 px solid #ccc'}
    if (self.state.display==='true'){
      return (
        <div className="page-source-container">
          <h3> <u> Page Source </u> </h3>
          <p id='page-source' style={inlineStyle}> {self.state.pageSource} </p>
        </div>
        )
    } 
  }

  displayTagCounter(){
    const self = this;
    if (self.state.searchValue!=='' && self.state.error!=='true'){
      return (

        <div>
          <b id='domain'> Currently getting page source of: {this.state.searchValue} </b> 
          <h3> <u> Tag Counter </u> </h3>
          <ul>
            {Object.keys(this.state.tagCounter).map(
              (tag) => 
              <li key={tag}> <b>{tag}</b>: {this.state.tagCounter[tag]} </li>
            )}
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
          <SearchBar updateSearch={this.setSearchValue.bind(this)} displaySource={this.toggleSource.bind(this)} />  
          {this.displayTagCounter()}
          {this.displaySource()}
      </div>
    );
  }
}

export default HTMLScraper;