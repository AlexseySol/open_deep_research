const request = require('supertest');
const express = require('express');
const routes = require('../routes');
const supabase = require('../config/supabase');

jest.mock('../config/supabase');

const app = express();
app.use('/api', routes);

describe('GET /api/current-user', () => {
  test('returns 401 if no authorization header', async () => {
    const res = await request(app).get('/api/current-user');
    expect(res.status).toBe(401);
  });

  test('returns user identity when token is valid', async () => {
    supabase.auth = {
      getUser: jest.fn().mockResolvedValue({ data: { user: { id: '123' } }, error: null })
    };

    const res = await request(app)
      .get('/api/current-user')
      .set('Authorization', 'Bearer testtoken');
    expect(res.status).toBe(200);
    expect(res.body.identity).toBe('123');
  });
});
