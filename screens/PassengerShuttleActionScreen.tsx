import React, { useState } from 'react';
import { Passenger } from '../model/Passenger';
import { PassengerShuttleAction } from '../model/PassengerShuttleAction';
import styles from '../constants/style';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity, Text, View, Alert, Modal } from 'react-native';
import { setNextPassenger, setPassengerShuttleActions, showMessage } from '../redux/actions/actions';
import NotFoundShuttle from '../components/NotFoundShuttle';
import _ from 'lodash';
import { Shuttle } from '../model/Shuttle';
import InactivePassengersList from '../components/inactivePassengersList';
import { LinearGradient } from 'expo-linear-gradient';
import PassengerDetail from '../components/PassengerDetail';
import { ListItem } from 'react-native-elements';

function PassengerShuttleActionScreen(props: any) {

  const [passenger, setPassenger] = useState(undefined as unknown as Passenger);
  const [collapseStatus, setcollapseStatus] = useState(false);

  const passengerActionsDefinitions = [
    { Id: undefined, Status: 0, Description: "Servis yola çıktı.", IsChecked: false, IsDisabled: true },
    { Id: undefined, Status: 1, Description: "Servis kısa sürede kapıda olacaktır.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 2, Description: "Servis kapıda.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 3, Description: "Öğrenci servise bindi.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 4, Description: "Öğrenci servise gelmedi.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 5, Description: "Servis okula giriş yaptı.", IsChecked: false, IsDisabled: false },
  ] as any[];

  const passengerWayBackActionsDefinitions = [
    { Id: undefined, Status: 0, Description: "Öğrenci servise bindi.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 1, Description: "Öğrenci servise binmedi.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 2, Description: "Servis okuldan çıktı.", IsChecked: false, IsDisabled: true },
    { Id: undefined, Status: 3, Description: "Servis kısa sürede kapıda olacaktır.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 4, Description: "Öğrenci indi.", IsChecked: false, IsDisabled: false },
    { Id: undefined, Status: 5, Description: "Servis tamamlandı.", IsChecked: false, IsDisabled: true },
  ] as any[]

  const [modalVisibility, setModalVisibility] = useState(false);

  const getColorByStudentStatus = (passengerId: string) => {

    let result = "black";

    if (props.passengerShuttleActions === undefined || props.passengerShuttleActions.length === 0) return result;

    props.passengerShuttleActions.map((item: PassengerShuttleAction) => {

      if (item && item.PassengerId === passengerId && item.PassengerStatus) {

        if ((props.selectedShuttle as Shuttle).Direction === "Gidiş") {
          if (item.PassengerStatus === 3) result = "green";
          if (item.PassengerStatus === 4) result = "red";
        }

        if ((props.selectedShuttle as Shuttle).Direction === "Dönüş") {
          if (item.PassengerStatus === 0) result = "green";
          if (item.PassengerStatus === 1) result = "red";
          if (item.PassengerStatus === 4) result = "greenc";
        }

      }
    })

    return result;
  }

  const getLatestStatus = (passengerId: string) => {

    let result = "";

    if (!props.isShuttleStarted) {
      result = "Servis başlatılmadı.";
    }

    if (props.passengerShuttleActions === undefined) {
      result = "Servis yola çıktı---.";
    }

    const passengerActionsForDescription = props.selectedShuttle.Direction === "Gidiş" ? passengerActionsDefinitions : passengerWayBackActionsDefinitions;
    result = props.passengerShuttleActions && props.passengerShuttleActions.length > 0 && props.passengerShuttleActions.map((item: PassengerShuttleAction) => {
      if (item && item.PassengerId === passengerId) {
        return passengerActionsForDescription.find((itemActions: any) => { return itemActions.Status === item.PassengerStatus })?.Description;
      }
    })

    return result;
  }

  const PassengerItemView = ({ item }: any) => {
    const passengerItem = item as Passenger;
    return (
      <TouchableOpacity>

        <ListItem containerStyle={{ backgroundColor: 'white' }}
          key={passengerItem.Id}
          bottomDivider
          onPress={() => {
            setPassenger(item);
          }}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          {
            // @ts-ignore
            <Ionicons name={"person-circle"} size={30} color={getColorByStudentStatus(passengerItem.Id)} />
          }
          <ListItem.Content>
            <ListItem.Title style={styles.cardText}>{passengerItem.PassengerName}</ListItem.Title>
            <ListItem.Subtitle style={styles.cardText}>{passengerItem.Address}</ListItem.Subtitle>
            <ListItem.Subtitle style={styles.cardText}>{getLatestStatus(passengerItem.Id)}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  const onHandleShowInactivePassengers = () => {
    if (props.inactivePassengers && props.inactivePassengers.length > 0) {
      setModalVisibility(true);
    } else {
      props.showMessage("Bugün herkes servis kullanacak!");
    }
  }

  return (
    props.selectedShuttle && !_.isEmpty(props.selectedShuttle) && <View style={collapseStatus ? styles.collapsedPassengerDetailOnMap : styles.expandedPassengerDetailOnMap}>
      <View style={{ flex: 1, margin: 5 }}>
        {!collapseStatus && <FlatList
          data={props.passengersOfTheShuttle}
          renderItem={PassengerItemView}
          keyExtractor={(item: any, index: any) => index.toString()}
          showsHorizontalScrollIndicator={true}
        />}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {!collapseStatus && <TouchableOpacity
            onPress={() => onHandleShowInactivePassengers()}>
            <LinearGradient
              colors={["#FF8A65", "#fb5b5a", "#FF8A65"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.9 }}
              style={{ marginTop: 10, height: 30, width: 200, justifyContent: "center", alignSelf: "center" }}
            >
              <Text style={{ color: "white", fontSize: 14, textAlign: "center", }} >{"Servise Gelemeyecekleri Göster"}</Text>
            </LinearGradient>
          </TouchableOpacity>}
          {
            collapseStatus && <Text style={{ fontSize: 14, textAlign: "center", }} >{"Öğrenci Listesi"}</Text>
          }
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => setcollapseStatus(!collapseStatus)}>
            <Ionicons name={collapseStatus ? "arrow-up-circle-outline" : "arrow-down-circle-outline"} size={24} color={"black"} ></Ionicons>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.selectedShuttle && props.inactivePassengers.length > 0 && modalVisibility}
        >
          <InactivePassengersList setModalVisibility={setModalVisibility}></InactivePassengersList>
        </Modal>
      </View>

      <Modal
        key={"PassengerDetailModal"}
        animationType="slide"
        transparent={false}
        visible={passenger !== undefined}
      >
        <View style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          flex: 1,
        }}>

          <PassengerDetail passenger={passenger} setSelectedPassenger={setPassenger}></PassengerDetail>
        </View>
      </Modal>

    </View>
  );
}

const mapStateToProps = (state: any) => {
  const isShuttleStarted = state.rootReducer.isShuttleStarted;
  const selectedShuttle = state.rootReducer.selectedShuttle;
  const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle;
  const shuttleDetail = state.rootReducer.shuttleDetail;
  const passengerShuttleActions = state.rootReducer.passengerShuttleActions;
  const inactivePassengers = state.rootReducer.inactivePassengers;
  return { isShuttleStarted, selectedShuttle, passengersOfTheShuttle, shuttleDetail, passengerShuttleActions, inactivePassengers };
};

export default connect(mapStateToProps, {
  setPassengerShuttleActions,
  showMessage,
  setNextPassenger,
})(PassengerShuttleActionScreen)