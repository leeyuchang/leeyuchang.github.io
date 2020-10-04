import ListModel from '../model/ListModel.js';
const TAG = '[MainController]'

export default {

  init() { 

    let contents = [];
    let table = document.getElementById('paging');

    try {

      ListModel.getData().then(data => {
        contents = data;
        console.log(contents);
        const head = `
        <thead>
           <tr>
             <th>BNO</th>
             <th>TITLE</th>
             <th>WRITER</th>
             <th>REGDATE</th>
           </tr>
        </thead>
        <tbody>
         `
       const contentDiv = contents.reduce((s, c) => {
         return s + `
           <tr>
             <td>${c.bno}</td>
             <td><a href='${c.bno}' class='boardLink'>${c.title}</a></td>
             <td>${c.writer}</td>
             <td class="center">${c.regdate}</td>
           </tr>`
       }, head) + `</tbody>`;
       document.getElementById('cotent').innerHTML = contentDiv;
      });

    } catch (error) {
      console.log(error);
    }
  }
}
