import View from './View.js';

const TAG = '[LinkView]';

const LinkView = Object.create(View);

LinkView.setup = function (el) {
  this.init(el);
  this.eventBinding();
  return this;
}

LinkView.MSG = {
  NO_ITEM: 'There is no item( please check internet line )',
}

LinkView.render = function (data = []) {
  this.el.innerHTML = '';
  this.el.innerHTML = data.length ? this.getHtml(data) : this.MSG.NO_ITEM;
}

LinkView.getHtml = function(data) {
  const header = `
  <thead>
    <tr>
      <th>タイトル</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  `
  let body = data.reduce((a, i) => {
    return a + `
    <tr>
      <td><a href="${i.url}" target="_blank" class="boardLink">${i.title}</a></td>
      <td><button class="btn btn-danger btn-sm del-btn" data-id="${i.id}" data-title="${i.title}">削除</button></td>
      <td><button class="btn btn-warning btn-sm edit-btn" data-id="${i.id}">修正</button></td>
    </tr>
    `}, header) + '</tbody>'; 
  return body;
}

LinkView.eventBinding = function () {
  this.on('click', function ({ target}) { 
    
    if (target.classList.contains('del-btn')) {
      log(TAG,'[del-btn]', target.dataset.id, target.dataset.title);
      LinkView.emit('@del', { id: target.dataset.id, title: target.dataset.title });
    }

    if (target.classList.contains('edit-btn')) {
      log(TAG, '[edit-btn]', target.dataset.id);
      LinkView.emit('@edit', target.dataset.id);
    }
  });
}

export default LinkView;
