export default {
  async post(url, data) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let msg = await res.text();
      throw new Error(msg);
    }
    return res.json();
  }
}