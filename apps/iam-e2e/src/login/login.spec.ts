import axios from 'axios';

describe('Root login', () => {
  it('should login', async () => {
    const res = await axios.post('http://localhost:3001/api/auth/login', {
      username: 'aenode@proton.me',
      password: '!Password123.',
    });

    console.log(res);
  });
});
