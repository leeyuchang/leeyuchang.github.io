export default {
  async getData(dataURL) {
    const res = await fetch("//192.168.100.101:8080/list");
    if (!res.ok) {
      throw new Error("error");
    }
    return await res.json();
  },
}