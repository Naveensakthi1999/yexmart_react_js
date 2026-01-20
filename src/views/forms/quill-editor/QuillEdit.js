import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Paper } from '@mui/material';

const QuillEdit = () => {
  const [ReactQuill, setReactQuill] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const { default: RQ } = await import('react-quill');
      setReactQuill(() => RQ);
    })();
  }, []);

  if (!ReactQuill) return null; // Show nothing or a loader until ReactQuill is loaded

  return (
    <Paper variant="outlined">
      <ReactQuill
        value={text}
        onChange={(value) => setText(value)}
        placeholder="Type here..."
      />
    </Paper>
  );
};

export default QuillEdit;
