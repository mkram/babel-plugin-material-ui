# babel-plugin-material-ui


[![build status](https://img.shields.io/travis/umidbekkarimov/babel-plugin-material-ui/master.svg?style=flat-square)](https://travis-ci.org/umidbekkarimov/babel-plugin-material-ui)
[![npm version](https://img.shields.io/npm/v/babel-plugin-material-ui.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-material-ui)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-material-ui.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-material-ui)

Babel plugin to cherry-pick used material-ui modules 

## Example

**In**

```javascript
import { TextField, SelectField, FlatButton } from 'material-ui'
```

**Out**

```javascript
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
```

## Installation

```bash
npm install --save-dev babel-plugin-material-ui
```

## Usage

### **Via .babelrc (Recommended)**

**.babelrc**

```json
{
  "plugins": ["material-ui"]
}
```

### Via CLI

```bash
babel --plugins material-ui script.js
```

### **Via Node API**

```javascript
require("babel-core").transform("code", {
  plugins: ["material-ui"]
});
```

