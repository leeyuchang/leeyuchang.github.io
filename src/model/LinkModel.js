import { PAGE_SIZE } from '../config.js';
export default {

  async get(url, page) {
    let params = new URLSearchParams();
    params.set('size', PAGE_SIZE);
    params.set('page', page);
    const res = await fetch(url + params.toString());
    if (!res.ok) throw new Error(res.text());
    return await res.json();
  },

  async getOne(url) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'get',
    });
    if (!res.ok) throw new Error(res.text());
    return await res.json();
  },

  async post(url, data) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwttoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.text());
    return await res.text();
  },

  async put(url, data) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'put',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwttoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.text());
    return await res.text();
  },

  async delete(url) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwttoken'),
      },
    });
    if (!res.ok) throw new Error(res.text());
    return await res.text();
  },
}