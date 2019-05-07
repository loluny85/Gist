import React, {Component} from 'react';
import './SearchBar.Component.css';

class SearchBar extends Component {
    state = {
        searchValue: 'hofmannsven'
    }
    updateSearchValue = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    render() {
        return (
            <React.Fragment>    
                <div className="floating-label">
                    <input className="floating-input" placeholder=" " type='text' value={this.state.searchValue} onChange={this.updateSearchValue} />
                    <span className="highlight"></span>
                    <label><i>Enter username</i></label>
                </div>
                <input className='search-button' type='button' onClick={()=>this.props.searchGists(this.state.searchValue)} value='Search'/>
            </React.Fragment>
        )
    }
}

export default SearchBar;