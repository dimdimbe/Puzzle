# Puzzle
Puzzle is a simple "framework" that i wrote to see how difficult it is to make a front-end framework from scratch 

## Add new Pieces of Puzzle
```js
// 'Test' is the Piece name 
// That's what we will use to create new instance or add this piece as a dependencies
Puzzle.add('Test',{
  // here come some functions
  // these functions will be add in the prototype
  customTestFunction : function(){
    console.log('Do nothing')
    return this;
  }
},[]);

Puzzle.add('Foo',{
  initialize : function(){
    // We add Test piece as de dependency
    // We can use customTestFunction inside our Foo Ojbect
    this.customTestFunction();
    return this;
  }
  // This is where we set dependencies
},['Test']);
```

## Use these Pieces 
```js
//Now we can use Pieces we just create
Puzzle.create('Foo',{
  //properties of the Foo object
  foo : 'bar'
  //this array define witch method we are using right away after creating our Foo object
},['initialize']);
```


## Puzzle.core, Puzzle.view, Puzzle.ajax
I already create some basic Piece
If you want to see how they work, please *clone* this repository and open *index.html* in your browser

#Contributing
This is my first ever opensource project, i have no idea what i'm doing.
But if you like what you see, please contact me!

##Testing
I don't know how to write test...
If you want to help me doing testing, please contact me!
