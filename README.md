cmd-console
===========

cmdlet based console.

WHY
---

The npm package "[cmdlet](https://bitbucket.org/randydu/cmdlets)" is a simple framework to develop micro-command (aka: cmdlet) based system, however, in order to execute the cmdlets the end user has to input the "node index" repeatly as following:

```bash
$ node index hello[world]
$ node index foo*bar
$ node index add[1,2]
$ node index sub[a:1, b:2]
```

This package provides a console so that the end user can execute cmdlet just like in a shell (note: __'? >'__ is the built-in prompt, not a part of user input) :

```bash
$ node myapp

? > hello(world)
? > foo*bar
? > add[1,2]
? > sub[a:1, b:2]
? >
? > .exit

--- bye ---
$
```

uses __".exit"__ or __CTRL+C__ to exit the console.

One good thing is that because the user input is now parsed in our own *shell*, the cmdlet parameters can be enclosed in either *fn(a, b)* or *fn[a, b]* format, otherwise in bash shell you have to run a cmdlet as *"fn(a, b)"*.

API
---

 __run()__: starts console

    ```javascript
    /**
     * Example how to combine both packages to run a console.
     */

    const cmdlet = require('cmdlets');

    //load supported cmdlets
    cmdlets.loadModule('cmd-system', __dirname + '/sys');
    cmdlets.loadModule('cmd-util', __dirname + '/util');
    ...

    //now starts our command console
    require('cmd-console').run();
    ```