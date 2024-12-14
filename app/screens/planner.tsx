import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import BackBtn from '../../assets/images/back-btn.svg';
import SearchBtn from '../../assets/images/search.svg';
import EventBanner from '@/components/EventBanner';
import {
  dateArrangedData,
  formattedDate,
  myGreeting,
} from '@/constants/dateArrangedData';
import { daysLimitData } from '@/data/dummyData';
import DaysRenderItem from '@/components/DaysRenderItem';
import { AuthContext } from '@/context/AuthContext';
import { useNavigation } from 'expo-router';
import { Link } from 'expo-router';
import { usePlans } from '@/hooks/usePlan';
import LoadingSpinner from '@/components/LoadingSpinner';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native-safe-area-context';

export default function Planner() {
  const [searchTerm, setSearchTerm] = useState('');
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  // @ts-ignore
  const { plans, loading, refreshPlans, error } = usePlans();

  console.log('plans:', plans);

  // @ts-ignore
  const transformedData = dateArrangedData(plans?.monthData);

  const handleLogout = async () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' as never }],
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar style="dark" />
      <View
        style={[
          styles.container,
          {
            marginTop: Platform.OS === 'ios' ? 0 : 60,
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable onPress={handleLogout}>
            <BackBtn />
          </Pressable>

          <Text style={styles.headerTxt}>Planner</Text>
          <View style={styles.empt} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleDate}>{formattedDate()}</Text>
            <Text style={styles.titleGreeting}>{myGreeting()}</Text>
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
                <Link href="/screens/quickPlans" style={styles.timeTxt}>
                  Quick Plans
                </Link>
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

          <View style={styles.daysContainer}>
            <View style={styles.daysWrp}>
              <View style={styles.ballWrapper}>
                <View style={[styles.ball2, { backgroundColor: '#C8102E' }]} />
              </View>

              <Text style={styles.daysTxt}>Expires in 5 days!</Text>
            </View>
            <View>
              <FlatList
                data={daysLimitData}
                renderItem={DaysRenderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          </View>

          {/*month plans here */}
          <View style={styles.months}>
            <View style={styles.verticalLine} />
            {transformedData.length !== 0 &&
              transformedData.map((monthSection) => (
                <View key={monthSection.month} style={styles.monthContainer}>
                  {/* Month Header with Ball */}
                  <View style={styles.monthTxt}>
                    <View style={styles.ballWrapper}>
                      <View style={styles.ball1} />
                    </View>
                    <Text style={styles.monthHeader}>{monthSection.month}</Text>
                  </View>

                  {/* Render Plans for the Month */}
                  {monthSection.data.map((plan, index) => (
                    <View key={plan.id} style={styles.planContainer}>
                      {/* Plan Header with Ball and Line */}
                      <View style={styles.planWrp}>
                        <View style={styles.ballWrapper}>
                          <View style={styles.ball2} />
                        </View>
                        <View style={styles.line} />
                        <Text
                          style={styles.planNum}
                        >{`Plan ${index + 1}`}</Text>
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

            {/*if there are no plans available display this */}
            {((transformedData.length === 0 && !loading) || error) && (
              <View style={styles.emptyCont}>
                <Text style={styles.emptyTxt}>No Plans Available</Text>
                <TouchableOpacity
                  style={styles.emptyBtn}
                  onPress={refreshPlans}
                >
                  <Text style={styles.emptyBtnTxt}>Reload</Text>
                </TouchableOpacity>
              </View>
            )}

            {/*if the data is still in loading state display the activity indicator (a loading spinner) */}
            {loading && <LoadingSpinner />}
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
  },
  ball2: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: '#008080',
    paddingRight: 2,
  },
  ballWrapper: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 3,
    borderRadius: 50,
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
  emptyCont: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyBtn: {
    marginTop: 10,
    backgroundColor: '#008080',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
  },
  emptyBtnTxt: {
    fontSize: 16,
    color: '#fff',
  },
});
