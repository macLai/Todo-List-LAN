window.onkeydown = function(e){
  if(e.which == 13) {
    e.stopPropagation();
    a = document.getElementsByTagName("input");
    for(i = 0; i < a.length; i++) {
      if(document.activeElement == a[i]) {
        j = (i==a.length-1)?0:i+1;
        a[j].focus();
        return;
      }
    }
    a[0].focus();

  }
};
