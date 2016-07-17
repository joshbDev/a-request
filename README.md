# aRequest

##WORK IN PROGRESS
installable javascript module to make API calls using async/await.

Though there are many libraries out there that make API requests, it seems like only Axios relies on Promises.

## GET request
```
import aRequest from 'a-request';
async function something() {
  const response = await aRequest.get('https://api.example.com/api?api=yes');
  **continue on**
}
```