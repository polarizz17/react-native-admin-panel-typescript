import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, Dialog, IconButton, Portal} from 'react-native-paper';
import {
  deleteUser,
  updateUserRole,
  updateUserStatus,
} from '../redux/actions/admin';
import {useAppDispatch} from '../redux/hook';

type PropeType = {
  type: string;
  id: string;
  role?: string;
  subs?: string;
};

const PortalModule = ({type, role, id, subs}: PropeType) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const dispatch = useAppDispatch();

  const deleteUserHandler = () => {
    dispatch(deleteUser(id));
    hideDialog();
  };
  const chageRoleHandler = () => {
    const newRole = role === 'user' ? 'admin' : 'user';
    dispatch(updateUserRole(id, newRole));
    hideDialog();
  };

  const changeSubscriptionHandler = () => {
    const newStatus =
      subs === 'Not Subscribed' ? 'Subscribed' : 'Not Subscribed';
    dispatch(updateUserStatus(id, newStatus));
    hideDialog();
  };

  return (
    <View style={{alignItems: 'center'}}>
      <IconButton
        icon={
          type === 'delete'
            ? 'delete'
            : role === 'admin'
            ? 'security'
            : role === 'user'
            ? 'account-circle'
            : subs === 'Subscribed'
            ? 'checkbox-marked-circle'
            : 'close-circle'
        }
        size={20}
        style={{padding: 0, margin: 0}}
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert-circle-outline" size={50} />
          <Dialog.Content style={{alignItems: 'center', paddingVertical: 5}}>
            <Text>
              {type === 'delete'
                ? 'Are you sure you want to delete this user?'
                : type === 'subscription'
                ? 'Are you sure you want to change this users subscription status'
                : 'Are you sure you want to change this users role'}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor="red"
              onPress={
                type === 'delete'
                  ? deleteUserHandler
                  : type === 'subscription'
                  ? changeSubscriptionHandler
                  : chageRoleHandler
              }>
              Yes
            </Button>
            <Button onPress={hideDialog}> Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default PortalModule;
