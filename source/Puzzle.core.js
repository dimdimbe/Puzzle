;(function(){
  Puzzle.add('core',{
    set : function(name,data){
      this.data = this.data || {};

      if(typeof name === 'string'){
        this.data[name] = data;
      }else{
        for(var i in name){
          this[i] = name[i];
        }
      }

      return this;
    },
    get : function(name){
      if(this.data)
        return this.data[name];
      return null;
    },
    log : function(msg){
      console.log('---');
      console.log(msg);
      console.log('---');
    },
    debug : function(){
      return this.data;
    }
  },[]);
})();
