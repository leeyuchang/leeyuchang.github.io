import View from './View.js'

const TAG = 'SignupView';

const SignupView = Object.create(View);

SignupView.setup = function (el) {
  this.init(el);
  this.bindingEvents();
  return this;
}

SignupView.render = function () {
  this.el.innerHTML =
  `
  <div class="modal fade" id="signupModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Signup</h4>
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
            <div class="form-group">
              <label for="confirmPassword">ConfirmPassword</label>
              <input id="confirmPassword" name="confirmPassword" type="password" placeholder="CconfirmPassword" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" class="form-control" required>
            </div>            
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Your email address" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
          </form>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal">cancel</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

SignupView.bindingEvents = function () {
  this.on('submit', function (event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const data = { username, password, name, email};
    log(TAG, data);
    SignupView.emit('@submit', data);
  });
}

export default SignupView;