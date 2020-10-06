import View from './View.js';

const TAG = '[DelView]';

const DelView = Object.create(View);

DelView.setup = function (el) {
  this.init(el);
  this.eventBinding();
  return this;
}

DelView.render = function (data) {
  this.el.innerHTML = `
  <div class="modal fade" id="delModal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
     
    <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Confirm</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        Delete this ? <br>
        ${data.title}
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
`;
  $('#delModal').modal('toggle');
}

DelView.eventBinding = function () {
  this.on('click', function (e) { 
  });
}

export default DelView;