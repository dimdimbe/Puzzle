;(function(){
  Puzzle.add('.ajax',{
    _ajax : function(options){
      options.method = options.method || 'POST';
      options.url = options.url || '';

      /*try{
        options.data = JSON.stringify(options.data) || {};
      }catch(e){}*/
      options.data = options.data || {};
      var data = [];
      for (var param in options.data) {
        console.log(param,options.data[param]);
  			data.push(param + "=" + options.data[param]);
  		}
      if(data.length>0) options.data = data.join('&');

      var request = new XMLHttpRequest();
      request.open(options.method.toUpperCase(), options.url, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send(options.data);
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          console.log('success post');
        }
      };
      request.onerror = function() {
        if(options.error){
          options.error(request);
        }
      };
    },
    get : function(url,cbs){
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = request.responseText;
          if(cbs && cbs.success){
            try{
              resp = JSON.parse(resp);
            }catch(e){}
            cbs.success(resp,request);
          }
        } else {
          // We reached our target server, but it returned an error
          if(cbs && cbs.error){
            cbs.error(request);
          }
        }
      };
      request.send();
    },
    post : function(url,data,cbs){
      this._ajax({
        url : url,
        success : cbs.success,
        error : cbs.error,
        method : 'POST',
        data : data
      });
    },
    put : function(url,data,cbs){
      this._ajax({
        url : url,
        success : cbs.success,
        error : cbs.error,
        method : 'PUT',
        data : data
      });
    },
    delete : function(url,cbs){
      this._ajax({
        url : url,
        success : cbs.success,
        error : cbs.error,
        method : 'DELETE'
      });
    }
  },[]);
})();
