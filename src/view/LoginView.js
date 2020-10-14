import View from './View.js';

const TAG = '[LoginView]';

const LoginView = Object.create(View);

LoginView.setup = function (el) {
  this.init(el);
  this.eventBinding();
  return this;
}

LoginView.render = function () {
  this.el.innerHTML = `
  <div class="modal fade" id="loginModal">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Login</h4>
          <button class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form autocomplete="off">
            <div class="form-group">
              <label for="username">Name</label>
              <input id="username" name="username" placeholder="Username" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Login</button>
          </form>
          <div class="invalid-feedback"></div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal">cancel</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $('#loginModal').modal('toggle');
}

LoginView.eventBinding = function () {
  this.on('submit', function (e) { 
    e.preventDefault();
    e.stopPropagation();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = { username, password };
    LoginView.emit('@login', data);
   });
}

LoginView.modalHide = function () {
  $('#loginModal').modal('toggle');
}

export default LoginView;
