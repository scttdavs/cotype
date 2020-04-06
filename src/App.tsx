import React, { useEffect } from 'react';
import Peer from "peerjs";

import './App.css';

import { UnControlled as CodeMirror} from "react-codemirror2";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

function App() {
  useEffect(() => {
    const peer = new Peer(undefined, {
      config: {
        // this is default, or run your own
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      }
    });
    peer.on('open', (id) => {
      console.log("ID", id);
    });
  }, []);

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
