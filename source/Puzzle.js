var Puzzle = (function(){

  var Helper = {
    isElement : function(obj) {
      try {
        return obj instanceof HTMLElement;
      }
      catch(e){
        return (typeof obj==="object") &&
          (obj.nodeType===1) && (typeof obj.style === "object") &&
          (typeof obj.ownerDocument ==="object");
      }
    },
    unique : function(tab){
      if(!tab){
        tab = [];
      }
      var arr = [];
      for(var i = 0; i < tab.length; i++) {
          if(arr.indexOf(tab[i]) === -1) {
              arr.push(tab[i]);
          }
      }
      return arr;
    }
  };

  var Pieces = {};

  var add = function(name,proto,dependencies){
    Pieces[name] = {
      proto : proto,
      dependencies : dependencies
    };
  };

  var create = function(name,params,inits){
    var Piece;
    if(!Pieces[name].cache){
      var getDeps = function(deps){
        var depsList = [name];
        var gd = function(deps){
          deps.forEach(function(name){
            depsList.push(name);
            if(Pieces[name]){
              gd(Pieces[name].dependencies);
            }
          });
        };
        gd(deps);
        return depsList;
      };
      var depsUnique = Helper.unique(getDeps(Pieces[name].dependencies));
      Piece = function(params){
        return this;
      };
      Piece.prototype = depsUnique.reduce(function(p,name){
        var currentPiece = Pieces[name];
        var namespace = (name[0] === '.')?true:false;

        if(!currentPiece){
          console.warn("The piece called '"+name+"' doesn't exist!");
          return p;
        }
        var nestedFunc = function(obj,current){
          if(current.proto){
            for(var method in current.proto){
              var c = Pieces[name].proto[method];
              if(typeof c === 'function'){
                if(namespace){
                  var cleanName = name.slice(1);
                  obj[cleanName] = obj[cleanName] || {};
                  obj[cleanName][method] = c;
                }else{
                  obj[method] = c;
                }
              }
            }
          }
          return obj;
        };
        p = nestedFunc(p,currentPiece);
        return p;
      },{});
      Pieces[name].cache = Piece;
    }else{
      Piece = Pieces[name].cache;
    }


    return (function(params,inits){
      var instance = new Piece();
      instance.set(params);
      if(inits && inits instanceof Array){
        inits.forEach(function(init){
          var fn = instance[init];
          if(fn)
            (fn.bind(instance))();
          else
            console.warn("Method '"+init+"' doesn't exist in the Piece called '"+name+"'");
        });
      }
      return instance;
    })(params,inits);
  };

  return {
    add : add,
    Helper : Helper,
    create : create,
    debug : function(){
      console.log(Pieces);
    }
  };

})();
