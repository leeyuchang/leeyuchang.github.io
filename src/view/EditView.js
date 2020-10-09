import View from './View.js';

const TAG = '[EditView]';

const EditView = Object.create(View);

EditView.setup = function (el) {
  this.init(el);
  this.eventBinding();
  return this;
}

EditView.render = function (data) {
  this.el.innerHTML = 
  `
  <div class="modal fade" id="editModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
      
        <!-- Modal body -->
        <div class="modal-body">
          <form name="editLink" autocomplete="off">
            <div class="form-group">
              <label for="title">Title</label>
              <input placeholder="Title" name="title" class="form-control" id="title" value="${data.title}" required>
            </div>
            <div class="form-group">
              <label for="url">URL</label>
              <input placeholder="URL" name="url" class="form-control" id="url" value="${data.url}" required>
            </div>
            <input type="hidden" name="id" value=${data.id}>
            <input type="hidden" name="createDate" value=${data.createDate}>
            <button class="btn btn-success" type="submit">Submit</bsutton>
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

  $('#editModal').modal('show');

}

EditView.eventBinding = function () {
  this.on('submit', function (e) {
    e.preventDefault();
    const id = e.target.id.value;
    const title = e.target.title.value;
    const url = e.target.url.value;
    const createDate = e.target.createDate.value;
    const data = { id, title, url, createDate};
    EditView.emit('@submit', data);
  });
}

export default EditView;
