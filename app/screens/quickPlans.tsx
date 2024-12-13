import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import BackBtn from '../../assets/images/back-btn.svg';
import { PlanDataType } from '@/types';
import { daysLimitData } from '@/data/dummyData';
import { AuthContext } from '@/context/AuthContext';
import { useNavigation, useRouter } from 'expo-router';
import QuickPlanItems from '@/components/QuickPlanItems';

export default function QuickPlans() {
  const [plans, setPlans] = useState<PlanDataType | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const router = useRouter();

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

          {/*TODO: expires in 5 days section here */}
          <View style={styles.daysContainer}>
            <View style={styles.daysWrp}>
              <View style={[styles.ball2, { backgroundColor: '#C8102E' }]} />
              <Text style={styles.daysTxt}>Expires in 5 days!</Text>
            </View>
            <View style={styles.cardsWrapper}>
              {daysLimitData.map((item, index) => (
                <QuickPlanItems key={index} item={item} />
              ))}
            </View>
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
});
