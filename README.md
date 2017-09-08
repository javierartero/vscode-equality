# equality README
This plugin use eval(), custom functions, methods and external libraries to evaluate and replace javascript content

## You can use multiples cursors <a id="multiple-cursor"></a>

![multiple-cursor](images/equality6.gif)

## You can calculate <a id="calculate"></a>
```
=2+2 //Press Ctrl + Enter
```
![calculate](images/equality1.gif)

## You can create personal vars <a id="custom-vars"></a>
Add equality.vars in your users settings
```
"equality.vars": {
    "name": "Javier Artero",
    "company": "MarsBased SL",
    "github": "https://github.com/javierartero"
}
```
Reload window

When you call a ```=e``` you will be calling equality.vars
```
=e.plugin //Press Ctrol + Enter
```
![vars](images/equality3.gif)

## Help

Now the plugin has a help system that will appear when it is not able to evaluate the content

You can open all the help elements from the method
```
=help
```

![Faker](images/equality4.gif)

## You can use the "faker.js"
faker.js is an external library generate massive amounts of fake
```
=faker.name.findName() //Press Ctrol + Enter
```
![Faker](images/equality2.gif)

* [faker.js gitHub](https://github.com/marak/Faker.js/)
* [JSDoc API Browser](http://marak.github.io/faker.js/)

## Custom functions and methods

### rand(min:number = 0, max:number = 100) <a id="rand"></a>

![rand](images/equality6.gif)

Default arguments
min:number = 0, max:number = 100

```
=rand(-100,100)
```

### rgb(r:number, g:number, b:number) <a id="rgb"></a>

![color](images/equality7.gif)

### hex(hex:string) <a id="hex"></a>

This method allows the use of shorthand '# ff0'

![color](images/equality7.gif)

## Put an equality in your life...