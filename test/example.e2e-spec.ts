import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Example', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  it('/example (GET)', async () => {
    const name = 'f5efdc89-f2b5-4890-8c59-a6b902fbe299';

    const res = await request(app.getHttpServer())
      .get('/example')
      .query({ search: name });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual(name);
  })

  afterAll(async () => {
    await app.close();
  })
})
