import axios from 'axios';

const auth = () => {

    // var request = require('request'); // "Request" library

    var client_id = 'xxxxxxxxxxxxx'; // Your client id
    var client_secret = 'xxxxxxxxxxxxxxxx'; // Your secret

    

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    // axios.post('/foo', params);
     
    return axios.post('https://accounts.spotify.com/api/token',params,
    {headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' 
        + client_secret).toString('base64'))},
        
    
    })
        .then (body => {console.log('body = ', body); 
        return body.data.access_token});

}

export default auth;