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
        <h4 class="modal-title">Delete</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      <strong>${data.title}</strong>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button class="btn btn-danger delete" data-dismiss="modal" data-id="${data.id}">Delete</button>
        <button class="btn btn-secondary cancel" data-dismiss="modal" >Cancel</button>
      </div>
    </div>
  </div>
</div>
`;
  $('#delModal').modal('toggle');
}

DelView.eventBinding = function () {
  this.on('click', function ({ target }) { 
    if (target.classList.contains('delete')) {
      DelView.emit('@confirm', target.dataset.id);
    } 
  });
}

export default DelView;