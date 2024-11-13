import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SpeedLevelProps {
  speed: number;
  maxSpeed: number;
  size: number;
}

const SpeedLevel: React.FC<SpeedLevelProps> = ({ speed, maxSpeed, size }) => {
  const step = maxSpeed / 5;
  const numberOfBar = Math.floor(speed / step);
  const isLow = numberOfBar < 3;

  return (
    <View
      style={{
        height: size,
        width: size,
        padding: 1,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'flex-end', 
        backgroundColor: 'transparent',
        gap: 1,
      }}
    >
      {[...Array(5)].map((_, i) => (
        <View
          key={i}
          style={{
            width: size / 5,
            height: ((i + 1) * size) / 5, 
            backgroundColor:
              i < numberOfBar ? (isLow ? '#ff0000' : '#00ff00') : '#fff',
          }}
        />
      ))}
    </View>
  );
};

export default SpeedLevel;
