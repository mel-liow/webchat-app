import React, { useState, useEffect } from 'react';
import AppView from './AppView';

import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright'
import {
  UserQuery,
  CreateUserMutation,
  DeleteUserMutation,
  AddUserSubscription,
  DeleteUserSubscription,
  DeleteAllUsersMutation
} from './components/UserQuery';

const App = props => {
  const user =
    (localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token'))) ||
    {};

  const [receiver, setReceiver] = useState({
    receiverMail: '',
    receiverName: ''
  });

  const [leftUser, setLeftUser] = useState('');
  const [showSignup, setShowSignup] = useState(true)

  const setSelectedMail = (mail, user) => {
    setReceiver(receiver => {
      console.log('reveived receiver')
      return { ...receiver, receiverMail: mail, receiverName: user };
    });
  };

  useEffect(() => {
    //TODO: Abstract - create graphql API middleware 

    const subscribeToMore = props.data.subscribeToMore;
    subscribeToMore({
      document: AddUserSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const user = subscriptionData.data.newUser;
        if (!prev.users.find(x => x.id === user.id)) {
          console.log(prev.users, user)
          return { ...prev, users: [...prev.users, user] };
        }
        return prev;
      }
    });
    subscribeToMore({
      document: DeleteUserSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const oldUser = subscriptionData.data.oldUser;
        if (prev.users.some(x => x.email === oldUser)) {
          const newUsers = prev.users.filter(x => x.email !== oldUser);
          prev.users = newUsers;
          return prev;
        }
        setLeftUser(oldUser);
        return prev;
      }
    });
  }, [props.data]);

  const createUser = async (email, name) => {
    await props.createUser({
      variables: {
        email,
        name
      },
      update: (store, { data: { createUser } }) => {
        const data = store.readQuery({ query: UserQuery });
        if (!data.users.find(x => x.id === createUser.id)) {
          data.users.push(createUser);
        }
        console.log('USERS', data.users)
        store.writeQuery({ query: UserQuery, data });
      }
    });
  };

  const deleteUser = async email => {
    localStorage.removeItem('token');
    await props.deleteUser({
      variables: { email },
      update: store => {
        const data = store.readQuery({ query: UserQuery });
        data.users = data.users.filter(x => x.email !== email);
        store.writeQuery({ query: UserQuery, data });
      }
    });
  };


  const deleteAllUsers = async (email) => {
    email = ''
    localStorage.clear()
    await props.deleteAllUsers({
      variables: { email },
      update: store => {
        const data = store.readQuery({ query: UserQuery });
        data.users = []
        store.writeQuery({ query: UserQuery, data });
      }
    });
  };

  const {
    data: { users, error, loading }
  } = props;


  if (loading || error) return null;

  return (
    <React.Fragment>
      <AppView
        users={users}
        createUser={createUser}
        deleteAllUsers={deleteAllUsers}
        user={user}
        receiver={receiver}
        leftUser={leftUser}
        setSelectedMail={setSelectedMail}
        deleteUser={deleteUser}
        showSignup={showSignup}
      />
    </React.Fragment>
  );
}


export default compose(
  graphql(UserQuery),
  graphql(CreateUserMutation, { name: 'createUser' }),
  graphql(DeleteUserMutation, { name: 'deleteUser' }),
  graphql(DeleteAllUsersMutation, { name: 'deleteAllUsers' })
)(App);
