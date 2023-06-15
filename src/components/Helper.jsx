import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import { useState } from 'react';
import axios from 'axios';
import './styles.css';
function Helper() {
  const [names, setNames] = useState(
    'Hi, I am your personal asistant. How can I help you!'
  );

  useEffect(() => {
    addResponseMessage(names);
  }, [names]);

  const handleNewUserMessage = async (newMessage) => {
    const response = await axios.post('http://localhost:5001/generate', {
      newMessage,
    });
    setNames(response.data);
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      //profileAvatar={logo}
      title="Xia Xia"
      subtitle="You personal helper"
    />
  );
}

export default Helper;
