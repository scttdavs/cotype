import React from 'react';
import './App.css';

import { UnControlled as CodeMirror} from "react-codemirror2";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

function App() {
  return (
    <CodeMirror
      value='<h1>I ♥ react-codemirror2</h1>'
      options={{
        mode: 'xml',
        theme: 'material',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
      }}
    />
  );
}

export default App;
