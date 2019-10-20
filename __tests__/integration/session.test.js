const request = require('supertest');
const app = require('../../src/App');

const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      });

    const { token } = responseSession.body;

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without token', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123456`);

    expect(response.status).toBe(401);
  });
});
