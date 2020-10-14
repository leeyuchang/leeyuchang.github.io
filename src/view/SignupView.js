import View from './View.js'

const TAG = '[SignupView]';

const SignupView = Object.create(View);

SignupView.setup = function (el) {
  this.init(el);
  this.bindingEvents();
  return this;
}

SignupView.render = function () {
  log(TAG, 'SignupView.render');
  this.el.innerHTML =
  `
  <div class="modal fade" id="signupModal">
    <div class="modal-dialog modal-sm">
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
              <input id="username" name="username" placeholder="Username" class="form-control" >
              <div class="invalid-feedback username"></div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Password" class="form-control" >
              <div class="invalid-feedback password"></div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">ConfirmPassword</label>
              <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" class="form-control">
              <div class="invalid-feedback confirmPassword"></div>
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" class="form-control" >
              <div class="invalid-feedback name"></div>
            </div>            
            <button type="submit" class="btn btn-success">Submit</button>
          </form>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  `;
  $('#signupModal').modal('show');
}

SignupView.serverValidation = function (data) {
  resetStyle();
  for(const key in data) {
    let target = document.querySelector('.invalid-feedback.' + key);
    target.style.display = 'block';
    target.textContent = data[key];
    let inputTag = document.getElementById(key);
    inputTag.classList.add('bg-warning');
  }
}

SignupView.bindingEvents = function () {
  this.on('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const name = event.target.name.value;
    const data = { username, password, confirmPassword, name};
    SignupView.emit('@submit', data);
  },false);
}

SignupView.modalHide = function () {
  $('#signupModal').modal('toggle');
}

export default SignupView;

function resetStyle() {
  let del1 = document.querySelectorAll('.bg-warning');
  for(let el of del1) {
    el.classList.remove('bg-warning');
  }

  let del2 = document.querySelectorAll('.invalid-feedback');
  for( let el of del2) {
    el.style.display = 'none';
  }
}