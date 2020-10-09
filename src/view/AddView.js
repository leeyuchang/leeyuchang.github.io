import View from './View.js';

const TAG = '[AddView]';

const AddView = Object.create(View);

AddView.setup = function (el) {
  this.init(el);
  this.eventBinding();
  return this;
}

AddView.render = function () {
  log(TAG, 'AddView.render')
  this.el.innerHTML =
    `
    <div class="modal fade" id="addModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          
        <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add URL</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
            <form name="addLink" autocomplete="off">
              <div class="form-group">
                <label for="title">Title</label>
                <input placeholder="Title" name="title" class="form-control" id="title" required>
              </div>
              <div class="form-group">
                <label for="url">URL</label>
                <input placeholder="URL" name="url" class="form-control" id="url" required>
              </div>
              <button class="btn btn-success" type="submit">Add</bsutton>
            </form>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    `;
  $('#addModal').modal('toggle');
}

AddView.eventBinding = function () {
  this.on('submit', function (event) {
    event.preventDefault();
    const title = event.target.title.value;
    const url = event.target.url.value;
    const data = { title, url };
    AddView.emit('@submit', data);
  });
}

export default AddView;