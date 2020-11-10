# Setup
``` bash
npm init -y
npm install --save-dev typescript ts-node nodemon rimraf eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install @types/node --save-dev
npx tsc --init --rootDir src --outDir build --esModuleInterop /
    --resolveJsonModule --lib es6 --module commonjs --allowJs true /
    --noImplicitAny true
```

Create a file called ```nodemon.json``` with the following content:
``` json
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
}
```

Add the following script to ```package.json```

``` json
"start:dev": "nodemon"
```