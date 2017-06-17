# Change Log

## 0.5.0
- From now you can use multi-selection
- Now you can call the rand method passing the arguments min and max
```
=rand(150,1000)
```

## 0.4.0
- bye bye [object Object], now evaluates by content type, should not now list the contents of the functions but throw the same function without arguments
- Added a help system with access to external documentation on errors
- Now you can call the help method to list all help topics
```
=help
```

## 0.3.1
- Fix configuration problems

## 0.3.0
- Added equality.vars to configuration
You can now create your own variables in user settings and call them from object e.
```
=e.name
```
- Has been removed script to remove white space, now you should run expressions of type
```
=new date()
```

## 0.2.21
- Faker has been added again
- A preference has been entered to adjust the faker.locale

## 0.2.11
- Bug with faker, has been removed until resolved

## 0.2.0
- Add faker library
- Add faker info and new gif to readme
- Add equality.symbol to configuration

## [Unreleased]
- Initial release
