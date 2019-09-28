import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright'
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import MessageInput from './MessageInput';
import MessageConversation from './MessageConversation';
import {
    MessageQuery,
    CreateMessageMutation,
    UserTypingMutation,
    MessageSubscription,
    UserTypingSubscription
} from './MessageQuery';

import './ChatBox.css'

const ChatBox = props => {
    console.log('chatbox', props)

    const [userTyping, setUser] = useState('');

    const {
        receiverName,
        receiverMail
    } = props




    return (
        <div className="chatbox container" >
            <div className='chat_header'>
                {userTyping && userTyping === receiverMail
                    ? <p>{receiverName} is typing </p>
                    : receiverName
                }
            </div>
            <MessageConversation />
            <MessageInput />
        </div>
    );
};

export default ChatBox;