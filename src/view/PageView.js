import View from './View.js';
import {PAGE_SIZE} from '../config.js';

const TAG = '[PageView]';

const PageView = Object.create(View);

PageView.setup = function (el) {
  this.init(el);
  PageView.bindingEvents(); 
  return this;
}

PageView.render = function (page) {
  log(TAG, page);
  
  let pageNum = page.number + 1;

  showReplyPage(page.totalElements);
      
  function showReplyPage(replyCnt){
    
    let endNum = Math.ceil(pageNum / PAGE_SIZE) * PAGE_SIZE;  
    let startNum = endNum - (PAGE_SIZE - 1); 
    
    let prev = startNum != 1;
    let next = false;
    
    if(endNum * PAGE_SIZE >= replyCnt){
      endNum = Math.ceil(replyCnt/PAGE_SIZE);
    }
    
    if(endNum * PAGE_SIZE < replyCnt){
      next = true;
    }
    
    let str = "<ul class='pagination pull-right'>";
    
    if(prev){
      str+= "<li class='page-item'><a class='page-link' data-page='"+(startNum-1)+"'>Prev</a></li>";
    }
    
    for(let i = startNum ; i <= endNum; i++){
      let active = pageNum == i? "active":"";
      str+= "<li class='page-item "+active+" '><a class='page-link' data-page='"+i+"'>"+i+"</a></li>";
    }
    
    if(next){
      str += "<li class='page-item'><a class='page-link' data-page='"+(endNum+1)+"'>Next</a></li>";
    }
    
    str += "</ul></div>";
    
    PageView.el.innerHTML = str;
  }
}

PageView.bindingEvents = function () {
  this.on('click', function (event) { 
    const clickedNumber = event.target.dataset.page;
    PageView.emit('@click', clickedNumber - 1);
  });
}

export default PageView;