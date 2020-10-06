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
    if (!res.ok) throw new Error(res.status);
    return res.json();
  }
}