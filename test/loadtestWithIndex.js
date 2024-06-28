import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const uuids = new SharedArray('uuid values', function() {
  return JSON.parse(open('../seeds/uuids.json'));
});

export const options = {
  vus: 10,
  duration: '10s',
};

export function setup() {
  http.post('http://localhost:3000/example/index');
  console.log('CREATED INDEX');
}

export function teardown() {
  http.del('http://localhost:3000/example/index');
  console.log('DELETED INDEX');
}

export default function() {
  const url = new URL('http://localhost:3000/example');

  const name = uuids[Math.floor(Math.random() * uuids.length)];
  url.searchParams.append('search', name);

  const res = http.get(url.toString());
  check(res, { 'status was 200': (r) => r.status === 200 });
  check(res, { 'correct body': (r) => JSON.parse(r.body).name === name });
  sleep(1);
}