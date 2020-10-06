import LinkModel from '../model/LinkModel.js';
import SignupModel from '../model/SignupModel.js';
import LoginModel from '../model/LoginModel.js';

import AddView from '../view/AddView.js';
import LinkView from '../view/LinkView.js';
import PageView from '../view/PageView.js';
import SignupView from '../view/SignupView.js';
import EditView from '../view/EditView.js';
import DelView from '../view/DelView.js';
import LoginView from '../view/LoginView.js';

const TAG = '[MainController]'

export default {

  init() {

    AddView.setup(document.getElementById('addView'))
      .on('@submit', data => this.onRegist(data.detail));

    SignupView.setup(document.getElementById('signupView'))
      .on('@submit', data => this.onSignup(data.detail));

    PageView.setup(document.getElementById('pageView'))
      .on('@click', data => this.onPageNum(data.detail));

    LinkView.setup(document.getElementById('linkview'))
      .on('@edit', data => this.onClickEditBtn(data.detail))
      .on('@del', data => this.onDel(data.detail));

    EditView.setup(document.getElementById('editView'))
      .on('@submit', data => this.onSubmitEdit(data.detail));
    
    LoginView.setup(document.getElementById('loginView'))
      .on('@login', data => this.onLogin(data.detail));

    DelView.setup(document.getElementById('delView')); // TODO ???

    document.getElementById('signupBtn').addEventListener('click', () => SignupView.render());
    document.getElementById('addBtn').addEventListener('click', () => AddView.render());
    document.getElementById('loginBtn').addEventListener('click', () => LoginView.render());

    this.onPageNum(0);
  },

  onClickEditBtn(id) {
    LinkModel.getOne(`http://localhost:8080/links/${id}`).then(data => EditView.render(data));
  },

  onSubmitEdit(data) {
    log(TAG,'onSubmitEdit:', data);
    LinkModel.put(`http://localhost:8080/links/${data.id}`, data).then(() => {
      $('#editModal').modal('toggle');
      this.onPageNum(0);
    });
  },

  onDel(data) {
    if (window.confirm(`Delete this file? \n\r ${data.title} `)) {
      LinkModel.removeById(`http://localhost:8080/links/${data.id}`).then(result => {
        log(TAG, result);
        this.onPageNum(0);
      });
    }
  },

  onPageNum(page) { // TODO FIX ME API ADDRESS
    LinkModel.get('http://localhost:8080/list?', page).then(data => {
      LinkView.render(data.content);
      PageView.render(data);
    });
  },

  onRegist(data) {
    LinkModel.post('http://localhost:8080/links', data)
      .then(data => $('#addModal').modal('hide'))
      .then(() => alert('Regist Completed'));
  },

  onSignup(data) {
    SignupModel.post('http://localhost:8080/signup', data)
      .then(data => {
        localStorage.setItem('jwttoken', data.jwttoken);
        $('#signupModal').modal('toogle');
      })
      .then(() => alert('Signup Completed'));
  },

  onLogin(data) {
    LoginModel.post(`http://localhost:8080/login`, data).then((data) => {
      $('#loginModal').modal('toggle');
      log(TAG, 'onLogin ', data);
      localStorage.setItem('jwttoken', data.jwttoken);
    });
  },
}
