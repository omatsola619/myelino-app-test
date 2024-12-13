import { DaysLimitProps } from '@/types';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import People from '../assets/images/people.svg';
import Price from '../assets/images/price.svg';
import MapPin from '../assets/images/map-pin.svg';

const DaysRenderItem = ({ item }: { item: DaysLimitProps }) => {
  return (
    <ImageBackground
      source={item.image}
      style={styles.itemContainer}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <View style={styles.people}>
            <People />
            <Text style={styles.peopleTxt}>{item.people}</Text>
          </View>

          <View style={styles.people}>
            <Price />
            <Text style={styles.peopleTxt}>{item.amount}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DaysRenderItem;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: 160,
    height: 170,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  people: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FFFFFFB2',
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  peopleTxt: {
    fontSize: 13,
    color: '#fff',
  },
});
