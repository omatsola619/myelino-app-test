import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import BackBtn from '../../assets/images/back-btn.svg';
import { useRouter } from 'expo-router';
import { calculateDaysRemaining } from '@/constants/dateArrangedData';
import { usePlans } from '@/hooks/usePlan';

export default function QuickPlans() {
  const router = useRouter();
  const { plans, loading } = usePlans();

  console.log('OUR BIG PLANS ARE', plans?.quickPlans);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <BackBtn />
          </Pressable>

          <Text style={styles.headerTxt}>Planner</Text>
          <View style={styles.empt} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.plans}>
            <Text style={styles.plansTitle}>Plans &gt; Quick Plans</Text>

            <View style={styles.timing}>
              <Pressable style={styles.time1}>
                <Text style={styles.timeTxt2}>Quick Plans</Text>
              </Pressable>

              <Pressable style={styles.time1}>
                <Text style={styles.timeTxt}>Oct (2)</Text>
              </Pressable>

              <Pressable style={styles.time1}>
                <Text style={styles.timeTxt}>Nov (3)</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.daysContainer}>
            <ScrollView style={styles.container2}>
              {plans?.quickPlans.map((plan, index) => {
                const daysRemaining = calculateDaysRemaining(plan.date);
                // const itemObj = {
                //   title:
                // };
                return (
                  <View key={index} style={styles.planContainer}>
                    <View style={styles.daysWrp}>
                      <View
                        style={[styles.ball2, { backgroundColor: '#C8102E' }]}
                      />
                      <Text style={styles.daysTxt}>
                        Expires in {daysRemaining} days!
                      </Text>
                    </View>
                    <View style={styles.photosContainer}>
                      {plan.place?.photos.map((photo, index) => (
                        <View key={index} style={styles.photoContainer}>
                          <Image
                            source={{ uri: photo.url }}
                            style={styles.photo}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTxt: {
    fontSize: 22,
    fontWeight: 'semibold',
    color: 'black',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    paddingHorizontal: 20,
  },
  titleDate: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#292941',
  },
  titleGreeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#008080',
  },
  plans: {
    paddingHorizontal: 20,
  },
  plansTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#292941',
  },
  timing: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  time1: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    paddingHorizontal: 8,
    paddingVertical: 13,
  },
  timeTxt: {
    textAlign: 'center',
    color: '#292941',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeTxt2: {
    textAlign: 'center',
    color: '#008080',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  empt: {
    width: 46,
  },
  daysWrp: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  daysContainer: {
    marginTop: 30,
  },
  daysTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C8102E',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  ball2: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: '#008080',
    borderWidth: 1,
    borderColor: '#f3f3f3',
    padding: 5,
    paddingRight: 2,
  },
  cardsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  container2: {
    flex: 1,
  },
  planContainer: {
    marginBottom: 20,
  },
  expirationText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  photoContainer: {
    flex: 1,
    marginRight: 10,
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});
