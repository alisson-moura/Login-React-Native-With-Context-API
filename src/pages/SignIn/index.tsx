import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import {useAuth} from '../../context/auth';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

const SignIn: React.FC = () => {
  const {signed, signIn} = useAuth();
  console.log(signed);
  async function handleSignIn() {
    signIn();
  }

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={handleSignIn} />
    </View>
  );
};
export default SignIn;
