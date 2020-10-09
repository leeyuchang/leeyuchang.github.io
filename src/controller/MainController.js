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

import {BASE_URL, JWT} from '../config.js';

const TAG = '[MainController]'

export default {
  init() {
    AddView.setup(document.getElementById('addView'))
      .on('@submit', data => this.onRegiest(data.detail));

    SignupView.setup(document.getElementById('signupView'))
      .on('@submit', data => this.onSignup(data.detail));

    PageView.setup(document.getElementById('pageView'))
      .on('@click', data => this.onPageNum(data.detail));

    LinkView.setup(document.getElementById('linkView'))
      .on('@edit', data => this.onEditBtn(data.detail))
      .on('@del', data => this.onDelBtn(data.detail));

    EditView.setup(document.getElementById('editView'))
      .on('@submit', data => this.onSubmitEdit(data.detail));

    DelView.setup(document.getElementById('delView'))
      .on('@confirm', data => this.onConfirmDel(data.detail));

    LoginView.setup(document.getElementById('loginView'))
      .on('@login', data => this.onLogin(data.detail));

    document.getElementById('addBtn').addEventListener('click', () => AddView.render());
    document.getElementById('loginBtn').addEventListener('click', () => LoginView.render());
    document.getElementById('signupBtn').addEventListener('click', () => SignupView.render());

    this.onPageNum(localStorage.getItem('page') | 0);
  },

  onEditBtn(id) {
    LinkModel
      .findOne(`${BASE_URL}/links/${id}`)
      .then(data=>EditView.render(data));
  },

  onSubmitEdit(data) {
    LinkModel
      .put(`${BASE_URL}/links/${data.id}`, data)
      .then(() => {
        $('#editModal').modal('toggle');
        this.onPageNum(localStorage.getItem('page'));
      });
  },

  onConfirmDel(id) {
    LinkModel
      .delete(`${BASE_URL}/links/${id}`)
      .then(result => this.onPageNum(localStorage.getItem('page')));
  },

  onDelBtn(data) {
    DelView.render(data);
  },

  onPageNum(page) {
    localStorage.setItem('page', page);
    LinkModel
      .findAll(`${BASE_URL}/list?`, page)
      .then(data => {
        LinkView.render(data);
        PageView.render(data);
      });
  },

  onRegiest(data) {
    LinkModel
      .post(`${BASE_URL}/links`, data)
      .then(data => {
        $('#addModal').modal('toggle');
        alert('Regiest Completed')
      });
  },

  onSignup(data) {
    SignupModel
      .post(`${BASE_URL}/signup`, data)
      .then(data => {
        localStorage.setItem(JWT, data.jwttoken);
        $('#signupModal').modal('toggle');
        alert('Signup Completed');
      });
  },

  onLogin(data) {
    LoginModel
      .post(`${BASE_URL}/login`, data)
      .then((data) => {
        $('#loginModal').modal('toggle');
        log(TAG, 'onLogin ', data);
        localStorage.setItem(JWT, data.jwttoken);
      });
  },
}
