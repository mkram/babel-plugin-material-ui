# babel-plugin-material-ui


[![build status](https://img.shields.io/travis/umidbekkarimov/react-async-state/master.svg?style=flat-square)](https://travis-ci.org/umidbekkarimov/react-async-state)
[![npm version](https://img.shields.io/npm/v/react-async-state.svg?style=flat-square)](https://www.npmjs.com/package/react-async-state)
[![npm downloads](https://img.shields.io/npm/dm/react-async-state.svg?style=flat-square)](https://www.npmjs.com/package/react-async-state)

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

