# mammut-cli

A simple cli for scaffolding frontend projects.

### Installation

``` bash
$ npm install -g @yanluo/x-cli
```

### Usage

``` bash
$ x init <template-name> <project-name>
```

Example:

``` bash
$ x init vue-component my-project
```

The above command pulls the template from [template-vue-component](https://github.com/whu-luojian/template-vue-component), prompts for some information, and generates the project at `./my-project/`.

### Templates

You can run `x list` to see all available templates.

Current available templates include:

- [vue-component](https://github.com/whu-luojian/template-vue-component) - A template for building a vue component based on vue and rollup.
