import View from './View.js';

const TAG = '[MsgView]';

const MsgView = Object.create(View);

MsgView.setup = function (el) {
    this.init(el);
    this.eventBinding();
    return this;
}

MsgView.render = function (data) {
    this.el.innerHTML = `
      <!-- The Modal -->
      <div class="modal fade" id="msgModal" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
          
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Message</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
            ${data?.message} <br>
            ${data?.details}
            </div>
            
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            
          </div>
        </div>
      </div>
    `;

    $('#msgModal').modal('toggle');
}

MsgView.eventBinding = function () {
    this.on('click', function () {$('#msgModal').modal('toggle')});
}

export default MsgView;