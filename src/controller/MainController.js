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
      .on('@submit', data => this.onRegist({ detail }));

    SignupView.setup(document.getElementById('signupView'))
      .on('@submit', data => this.onSignup({ detail }));

    PageView.setup(document.getElementById('pageView'))
      .on('@click', data => this.onPageNum({ detail }));

    LinkView.setup(document.getElementById('linkview'))
      .on('@edit', data => this.onEditBtn({ detail })) // rendering view : retrive data
        .on('@del', data => this.onDelBtn({ detail })); //  rendering view : delete  data

    EditView.setup(document.getElementById('editView'))
      .on('@submit', data => this.onSubmitEdit({ detail }));
    
    DelView.setup(document.getElementById('delView'))
      .on('@confirm', data => this.onConfirmDel({ detail })); 
    
    LoginView.setup(document.getElementById('loginView'))
      .on('@login', data => this.onLogin({ detail }));


    document.getElementById('signupBtn').addEventListener('click', () => SignupView.render());
    document.getElementById('addBtn').addEventListener('click', () => AddView.render());
    document.getElementById('loginBtn').addEventListener('click', () => LoginView.render());

    this.onPageNum(0);
  },

  onEditBtn(id) {
    LinkModel
      .getOne(`http://localhost:8080/links/${id}`)
      .then(EditView.render);
  },

  onSubmitEdit(data) {
    LinkModel
      .put(`http://localhost:8080/links/${data.id}`, data)
      .then(() => {
        $('#editModal').modal('toggle');
        this.onPageNum(0);
      });
  },

  onConfirmDel(id) {
    LinkModel
      .delete(`http://localhost:8080/links/${id}`)
      .then(result => {this.onPageNum(0);});
  },

  onDelBtn(data) { 
    DelView.render(data);
  },

  onPageNum(page) {
    LinkModel
      .get(`http://localhost:8080/list?`, page)
      .then(data => {
        LinkView.render(data);
        PageView.render(data);
      });
  },

  onRegist(data) {
    LinkModel
      .post(`http://localhost:8080/links`, data)
      .then(data => {
        $('#addModal').modal('toggle');
        alert('Regist Completed')
      });
  },

  onSignup(data) {
    SignupModel
      .post(`http://localhost:8080/signup`, data)
      .then(data => {
        localStorage.setItem('jwttoken', data.jwttoken);
        $('#signupModal').modal('toogle');
        alert('Signup Completed');
      });
  },

  onLogin(data) {
    LoginModel
      .post(`http://localhost:8080/login`, data)
      .then((data) => {
        $('#loginModal').modal('toggle');
        log(TAG, 'onLogin ', data);
        localStorage.setItem('jwttoken', data.jwttoken);
      });
  },
}
