import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import auth from './auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
    this.token = '';
  }

  async componentDidMount() {
    this.token = await auth();
    console.log('In componentDidMount - this.token =', this.token);
  };

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.token}
    })
    .then(response => response.json())
    .then(json => {
      if (json.artists.items && json.artists.items[0]) { 
        console.log('json = ',json);
        const artist = json.artists.items[0];
        console.log('artists before setState', artist);
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, {
          method: 'GET',
          headers: {'Authorization': 'Bearer ' + this.token}
        })
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks:', json);
          const { tracks } = json;
          this.setState({tracks});
        })
      }
    });
    console.log('before render, this.state',this.state);
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }

      </div>
    )
  }
}

export default App;
