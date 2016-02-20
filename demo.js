;(function(){
  Puzzle.add('Demo',{
    configureView : function(){
      this.setTemplate([
        '<h1>Meteo app with Puzzle</h1>',
        '<div id="meteos"></div>',
        '<div id="footer">',
          'Demo of Puzzle js , a small non ambicious, "framework" <br>',
          '<a href="https://twitter.com/dimdimbe">I</a> wrote this to see how hard it is to write a frontend framework.',
        '</div>'
      ]);
      this.render();
      this.meteosElem = this.element.querySelector('#meteos');
    },
    addCity : function(city){
      var meteo =  Puzzle.create('Demo.meteo',{
          class : 'meteo',
          timer : 120000,
          data : {
            city : city
          },
          parent : this.meteosElem
        },['configureView','getMeteo','appendToParent']);
      this.meteos.push(meteo);
      return this;
    }
  },['view']);

  Puzzle.add('Demo.meteo',{
    configureView : function(){
      this.setTemplate([
        '{{city}} : {{temp}} C°'
      ]);
      this.render();
    },
    getMeteo : function(){
      this.ajax.get('http://api.openweathermap.org/data/2.5/weather?appid=f7ef0d31749078e8285940871da32017&lang=fr&units=metric&q='+this.data.city ,{
        success : function(data,a,b){
          this.set('temp',data.main.temp);
          this.render();
          setTimeout(function(){
            this.getMeteo();
          }.bind(this),this.timer||60000);

        }.bind(this),
        error : function(e){
          console.error('ERROR GET METEO');
          console.error(e);
        }
      });
    }
  },['view','.ajax']);
})();
