import React, {Component} from 'react';
import './App.css';
import SearchBarComponent from './components/SearchBar/SearchBar.Component';
import SearchResultComponent from './components/SearchResult/SearchResult.Component';
import axios from 'axios';

class App extends Component {
  state = {
    gistListForCard: [],
    loading: false,
  }

  async searchForks(forkUrl, id) {
    forkUrl = forkUrl+'?client_id=582fe2d624025c93cd3b&client_secret=f7f480e0c6e0e0d3d1c2fbc01ca31797035bd2c2';
    let forkItem = await axios(forkUrl);
    let updatedGistListForCard;
    Array.isArray(this.state.gistListForCard) && this.state.gistListForCard.filter((cardItem, index)=>{
      if(cardItem.id === id) {
        cardItem.forkItems = forkItem.data.slice(0, 3);
        updatedGistListForCard = [...this.state.gistListForCard];
        updatedGistListForCard.splice(1, index, cardItem)
        this.setState({
          gistListForCard: this.state.gistListForCard
        })
        return true;
      }
      return false;
    });
  }

  constructGistList = (gistList) => {
    let gistListForCard = gistList.map((listItem)=>{
      return {
        id: listItem.id,
        forks_url: listItem.forks_url,
        forkItems: this.searchForks(listItem.forks_url, listItem.id),
        description: listItem.description,
        files: Object.keys(listItem.files).slice(0,2), //Get first 2 file names
      }
    })
    this.setState({ // This will render the cards first.
      gistListForCard: gistListForCard,
      loading: false
    })
  }

  searchGists = (username) => {
    this.setState({
      loading: true
    })
    const url = `https://api.github.com/users/${username}/gists?client_id=582fe2d624025c93cd3b&client_secret=f7f480e0c6e0e0d3d1c2fbc01ca31797035bd2c2`;
    axios(url).then(res=>this.constructGistList(res.data));
  }

  render() {
    return (
      <div className="App">
        <SearchBarComponent searchGists={this.searchGists}/>
        <SearchResultComponent loading={this.state.loading} gistList={this.state.gistListForCard}/>
      </div>
    )
  }
}

export default App;
