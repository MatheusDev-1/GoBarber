import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Sair" onPress={() => (signOut())} />
    </View>
  );
};

export default Dashboard;
