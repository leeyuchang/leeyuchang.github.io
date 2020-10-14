export default {
  async post(url, data) {
    const res = await fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.text();
      log('SignupModel', err);
      throw new Error(err);
    }
    return res.json();
  }
}