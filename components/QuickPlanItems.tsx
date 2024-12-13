import { DaysLimitProps } from '@/types';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import People from '../assets/images/people.svg';
import Price from '../assets/images/price.svg';
import MapPin from '../assets/images/map-pin.svg';

const QuickPlanItems = ({ item }: { item: DaysLimitProps }) => {
  return (
    <ImageBackground
      source={item.image}
      style={styles.itemContainer}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.full}>
          <View style={styles.left}>
            <View style={styles.people}>
              <People />
              <Text style={styles.peopleTxt}>{item.people}</Text>
            </View>

            <View style={styles.people}>
              <Price />
              <Text style={styles.peopleTxt}>{item.amount}</Text>
            </View>
          </View>

          <View>
            <View style={styles.people2}>
              <MapPin />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default QuickPlanItems;

const styles = StyleSheet.create({
  itemContainer: {
    width: '48%',
    height: 170,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    borderRadius: 10,
    width: '100%',
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
  people2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FFFFFFB2',
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  peopleTxt: {
    fontSize: 13,
    color: '#fff',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  full: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
