;(function(){
  Puzzle.add('view',{
    setTemplate : function(template,elementType){
      if(template instanceof Array)
        template = template.join('\n');

      this._tpl = template;
      this._element = elementType || 'div';
      this.element = document.createElement(this._element);
      if(this.id)
        this.element.id = this.id;
      if(this.class)
        this.element.className = this.class;
      return this;
    },
    render : function(){
      if(!this._tpl)
        console.warn('No template');

      this.element.innerHTML = this._render();
      return this;
    },
    _render : function(){

      for(var data in this.data){
        var d = this.data[data];
        var str = 'var '+data+' = ';
        if(d === null || d === undefined){
          str+="''";
        }else if(typeof d === 'object'){
          str+= JSON.stringify(d);
        }else if(typeof d === 'function'){
          var res = (d.bind(this))();
          if(typeof res === 'number'){
            str+= res;
          }else if(typeof res === 'string'){
            str+= '"'+res+'"';
          }else{
            str = '';
          }
        }else if(typeof d === 'string'){
          str+= '"'+d+'"';
        }else{
          str+= d;
        }
        try{
          eval(str);
        }catch(e){
          console.error(e);
        }
      }

      var tplStr = this._tpl;

      var transformable = Puzzle.Helper.unique(tplStr.match(/{{[^}}]*}}/g));

      tplStr = transformable.reduce(function(tpl,replace){
        var cleanReplace = replace.replace('{{','').replace('}}','');
        var evaluate = '';

        try{
          var ev = eval(cleanReplace);
          if(!Puzzle.Helper.isElement(ev)){
            evaluate = ev;
          }
        }catch(e){}

        return tpl.replace(replace,evaluate,'g');
      },tplStr);
      return tplStr;

    },
    appendToParent : function(){
      if(!this.element)
        console.error('The Piece element doesn\'t exist',this);
      else
        this.parent.appendChild(this.element);
      return this;
    }
  },['core']);
})();
