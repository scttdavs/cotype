import React, { useEffect } from 'react';
import Peer from "peerjs";

import './App.css';

import { UnControlled as CodeMirror} from "react-codemirror2";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

function App() {
  useEffect(() => {
    // connect as a peer, no matter what
    const peer = new Peer(undefined, {
      // key: 'lwjd5qra8257b9',
      host: "/",
      port: 9000,
      path: '/signal',
      debug: 2
    });
    peer.on('open', (id) => {
      console.log("ID", id);

      // if joining a new doc, connect to that peer
      const peerId = window.location.pathname.slice(1);
      console.log("Peer id", peerId);
      if (peerId !== "") {
        const conn = peer.connect(peerId, { reliable: true });
        console.log(conn);
        conn.on('open', () => {
          console.log("Open to ", peerId);
          conn.send("HI!");
        });

        conn.on('data', function(data) {
          console.log('Received', data);
        });
      }
    });

    peer.on('connection', (conn) => {
      console.log("Someone is connecting", conn.metadata);
      conn.on('data', (data) => {
        console.log('Received', data);
      });
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
      editorDidMount={(editor) => { console.log(editor) }}
      onChange={(editor, data, value) => {
      }}
    />
  );
}

export default App;
