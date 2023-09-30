import React from 'react';
import {StyleSheet, Switch, View, Text} from 'react-native';

interface OptionSwitchProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const OptionSwitch = ({value, onChange, label}: OptionSwitchProps) => {
  return (
    <View style={styles.switchContainer}>
      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={label}
      />
      <Text style={styles.switchLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    color: '#333',
    marginLeft: 15,
  },
});

export default OptionSwitch;
