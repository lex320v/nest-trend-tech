// @ts-ignore
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
// @ts-ignore
import http from 'k6/http';
// @ts-ignore
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '5s'
}

export default function () {
  const name = 'qweewq';

  const url = new URL('http://localhost:3000/example');
  url.searchParams.append('search', name);
  const res = http.get(url.toString());
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}