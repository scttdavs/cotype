import React, { useEffect } from 'react';

import './App.css';

import { UnControlled as CodeMirror} from "react-codemirror2";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import PeerClient from './clients/PeerClient';

function App() {
  useEffect(() => {
    new PeerClient();
  }, []);

  return (
    <CodeMirror
      value='<h1>I ♥ react-codemirror2</h1>'
      options={{
        mode: 'xml',
        theme: 'material',
        lineNumbers: true
      }}
      editorDidMount={(editor) => { console.log(editor) }}
      onChange={(editor, data, value) => {
      }}
    />
  );
}

export default App;
