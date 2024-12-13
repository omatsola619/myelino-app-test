import { View, StyleSheet, Text } from 'react-native';
import BannerImg from '../assets/images/banner.svg';
import { EventBannerProps } from '@/types';

export default function EventBanner({
  number,
  title,
  monthView,
}: EventBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.info}>
          <View
            style={[
              styles.num,
              {
                flexDirection: monthView ? 'column-reverse' : 'column',
              },
            ]}
          >
            <View style={styles.numCount}>
              <Text style={styles.countTxt}>{number}</Text>
            </View>
            <Text style={styles.numTxt}>Events</Text>
          </View>

          <Text style={styles.savedTxt}>{title}</Text>
        </View>

        <BannerImg />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#f3f3f3',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
  },
  num: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#f3f3f3',
    paddingRight: 21,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  numCount: {
    backgroundColor: '#008080',
    borderRadius: 13,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  numTxt: {
    fontSize: 15,
  },
  countTxt: {
    fontSize: 21,
    fontWeight: '800',
    color: '#fff',
  },
  savedTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#008080',
  },
});
