import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import BackBtn from '../../assets/images/back-btn.svg';
import SearchBtn from '../../assets/images/search.svg';
import EventBanner from '@/components/EventBanner';
import { fetchPlans } from '@/config/fetchPlans';
import { MonthSectionType, PlanDataType } from '@/types';
import { dateArrangedData } from '@/constants/dateArrangedData';

export default function Planner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState<PlanDataType | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const data = await fetchPlans();
        setPlans(data);
        // console.log('all plans', data);
      } catch (e) {
        setError('error fetching plans');
      } finally {
        setLoading(false);
      }
    };

    getPlans();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // @ts-ignore
  const transformedData = dateArrangedData(plans.monthData);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackBtn />
          <Text style={styles.headerTxt}>Planner</Text>
          <View style={styles.empt} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleDate}>Saturday, 26 Aug</Text>
            <Text style={styles.titleGreeting}>Good Morning</Text>
          </View>

          <View style={styles.searchBar}>
            <SearchBtn />
            <TextInput
              placeholder={'Search for the plans'}
              onChangeText={(text) => setSearchTerm(text)}
              style={styles.searchInput}
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.plans}>
            <Text style={styles.plansTitle}>Plans</Text>

            <View style={styles.timing}>
              <Pressable style={styles.time1}>
                <Text style={styles.timeTxt}>Quick Plans</Text>
              </Pressable>

              <Pressable style={styles.time1}>
                <Text style={styles.timeTxt}>Oct (2)</Text>
              </Pressable>

              <Pressable style={styles.time1}>
                <Text style={styles.timeTxt}>Nov (3)</Text>
              </Pressable>
            </View>

            {/*event saved section */}
            <View style={styles.allEvents}>
              <EventBanner title={'All events saved'} number={'85'} />
            </View>
          </View>

          {/*TODO: expires in 5 days section here */}

          {/*month plans here */}
          <View style={styles.months}>
            <View style={styles.verticalLine} />
            {transformedData.map((monthSection) => (
              <View key={monthSection.month} style={styles.monthContainer}>
                {/* Month Header with Ball */}
                <View style={styles.monthTxt}>
                  <View style={styles.ball1} />
                  <Text style={styles.monthHeader}>{monthSection.month}</Text>
                </View>

                {/* Render Plans for the Month */}
                {monthSection.data.map((plan, index) => (
                  <View key={plan.id} style={styles.planContainer}>
                    {/* Plan Header with Ball and Line */}
                    <View style={styles.planWrp}>
                      <View style={styles.ball2} />
                      <View style={styles.line} />
                      <Text style={styles.planNum}>{`Plan ${index + 1}`}</Text>
                    </View>
                    <View style={styles.banner}>
                      <EventBanner
                        title={plan.description}
                        number={plan.day}
                        monthView
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}
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
  searchBar: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    paddingVertical: 17,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
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
  empt: {
    width: 46,
  },
  allEvents: {
    marginTop: 15,
  },
  months: {
    paddingRight: 20,
    marginTop: 42,
    position: 'relative',
  },
  monthContainer: {},
  monthHeader: {
    fontWeight: 700,
    fontSize: 16,
    color: '#292941',
    marginBottom: 10,
  },
  planNum: {
    fontWeight: 700,
    fontSize: 15,
    color: '#008080',
    marginBottom: 9,
  },
  planContainer: {},
  planWrp: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  monthTxt: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginLeft: 20,
  },
  ball1: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#f3f3f3',
    padding: 5,
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
  line: {
    width: 20,
    height: 1,
    backgroundColor: '#f3f3f3',
    marginTop: 8,
    marginHorizontal: 3,
  },
  banner: {
    paddingLeft: 40,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#f3f3f3',
    height: '100%',
    position: 'absolute',
    left: 26,
  },
});