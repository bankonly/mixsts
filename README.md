# Mixs.ts

MVC library for faster development for typescript

### Let's start
#### Installation
```
npm install mixsts
```
init typescript tsconfig.json <br>
```
tsc --init
```
We need to do some configuration in **tsconfig.json**
```
"experimentalDecorators": true, /* Enable experimental support for TC39 stage 2 draft decorators. */
"emitDecoratorMetadata": true, /* Emit design-type metadata for decorated declarations in source files. */

Optional
"path":{
    "@mix":[
        "mixsts/core"
    ]
}
```
if you set path as above you need to insall **tsconfig-paths** npm packages
### Folder's structure
```
libs
│   app.ts // contain server file
└───configs
│   │   app.ts
└───controllers
    │   app.controller.ts
    middlewares/
    etc...
    tsconfig.json
```
## Simple usage
```ts
// configs/app.ts
import { setCoreConfig } from "@mix/config"

// app configuration
setCoreConfig({
    port:3000 // set app port
    
    // you can also set middlewares, aws, socket, etc... time to write
})
```
```ts
// app.ts
import "configs/app.ts"
import MixServer from "mixsts"

const mix = new MixServer()

mix.run() // start application

```

### Let's create fitst controller
```ts
controllers/index.controllers.ts
import { Get, Controller } from "@mix/controllers"
import { Context } from "@mix/options"

@Controller("index") // localhost:3000/index
export default class IndexController {
    @Get()
    async index(context:Context) :Promise<void> {
        contex.json("Hello world")
    }
}
```
create global call controller and add controller to configs/app.ts
```ts
// configs/controllers.ts
import { controllerConfig, loadController } from "@mix/controllers"
loadController({
    require:[
        require("../controllers/index.controller.ts")
        // or set path in tsconfig.json for best practice
        require("@controllers/index.controller.ts")
    ]
})
export default controllerConfig
```
```ts
// configs/app.ts
import { setCoreConfig } from "@mix/config"
import controllerConfig from "./controllers"
// app configuration
setCoreConfig({
    port:3000 // set app port
    
    controllerConfig: controllerConfig
    // you can also set middlewares, aws, socket, etc... time to write
    
})
```
## Socket.IO
```ts
// configs/app.ts
socket:{
    transport: ["websocket"]
}
```
Create event folder
```ts
// events/index.ts
 
```
