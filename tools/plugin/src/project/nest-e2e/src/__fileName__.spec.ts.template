import axios from 'axios';

describe('AppController (e2e)', () => {
  it('should get info', async () => {
    const response = await axios.get('http://localhost:3001/api/info');

    expect(response.status).toEqual(200);
    expect(response.data).toBeDefined();
    console.log(response.data);
  });
});
