export default {
  async post(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('error');

    let result = res.json();
    return result;
  }
}