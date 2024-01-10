// collaboration.js
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { ySyncPlugin, yCursorPlugin, yUndoPlugin } from 'y-prosemirror';
import { schema } from 'prosemirror-schema-basic';

export function addCollaboration(editor) {
  // Initialize a Yjs document
  const ydoc = new Y.Doc();

  // Configure the WebsocketProvider
  const provider = new WebsocketProvider('wss://localhost:1234', 'your-room-name', ydoc);

  // Define a Yjs document fragment for ProseMirror content
  const yXmlFragment = ydoc.getXmlFragment('prosemirror');

  // Add Yjs collaborative plugins to the existing ProseMirror editor
  const yPlugins = [
    ySyncPlugin(yXmlFragment),
    yCursorPlugin(provider.awareness),
    yUndoPlugin(),
  ];

  editor.update({
    plugins: editor.state.plugins.concat(yPlugins),
  });

  // Optional: Clean up when the editor is destroyed or the collaboration session ends
  editor.setProps({
    destroy: () => {
      provider.disconnect();
      ydoc.destroy();
    },
  });
}
