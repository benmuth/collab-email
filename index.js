import { Schema, DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';
import { addCollaboration } from './collaboration.js';

// Create ProseMirror editor
const editor = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(document.querySelector("#content")),
    plugins: schema/* Add ProseMirror plugins here */
  }),
});

addCollaboration(editor);
