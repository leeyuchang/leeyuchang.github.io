import { PAGE_SIZE, JWT } from '../config.js';

const TAG = '[LinkModel]';
/**
 * 브라우저에서 자바스크립트의 fetch()를 실행할 경우 pre-flight가 우선 전송되고
 * 그 다음에 진짜 전송을 함. 따라서, 서버는 이 예비전송을 받을수 있도록 옵션을 설정해줘야함
 * 스프링 시큐리티의 경우는 httpSecurity.cors()를 해야함
 */
export default {
  async findAll(url, page) {
    let params = new URLSearchParams();
    params.set('size', PAGE_SIZE);
    params.set('page', page);
    const res = await fetch(url + params.toString());
    if (!res.ok) throw new Error('error');
    return await res.json();
  },

  async findOne(url) {
      const res = await fetch(url, {
      mode: "cors",
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(JWT),
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  },

  async post(url, data) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(JWT),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('error');
    return await res.text();
  },

  async put(url, data) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'put',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(JWT),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('error');
    return await res.text();
  },

  async delete(url) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(JWT),
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.text();
  },
}