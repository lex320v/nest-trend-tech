// @ts-ignore
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, sleep } from 'k6';
// @ts-ignore
import { SharedArray } from 'k6/data';

let count = 0;
const uuids = new SharedArray('some data name', function () {
  // @ts-ignore
  return JSON.parse(open('../seeds/uuids.json'));
});

export const options = {
  vus: 10,
  duration: '5s'
}

export default function () {
  const url = new URL('http://localhost:3000/example');

  const name = uuids[Math.floor(Math.random() * uuids.length)];
  url.searchParams.append('search', name);

  const res = http.get(url.toString());
  check(res, { 'status was 200': (r) => r.status == 200 });
  check(res, { 'correct body': (r) => JSON.parse(r.body).name === name });
  sleep(1);
}