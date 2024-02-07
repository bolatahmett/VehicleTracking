import React, { useEffect, useState } from 'react';
import { Passenger } from '../model/Passenger';
import { CheckBox } from 'react-native-elements';
import { getTableItemsWithPath, updateItemOnDbWithPath } from '../dto/ServerHelper';
import { PassengerShuttleAction } from '../model/PassengerShuttleAction';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { setNextPassenger, setPassengerShuttleActions, showMessage } from '../redux/actions/actions';
import _ from 'lodash';
import moment from 'moment';
import { Shuttle } from '../model/Shuttle';
import calculateNextPassengerInfo from '../helper/calculateNextPassengerInfo';
import externalNotificationHelper from '../helper/externalNotificationHelper';

function PassengerShuttleActionScreenPassenger(props: any) {

  const [passenger, setPassenger] = useState(undefined as unknown as Passenger);
  const passengerActionsDefinitions = [
    { Id: undefined, Status: 0, Description: "Servis yola çıktı.", IsChecked: false, IsDisabled: true, Hidden: true },
    { Id: undefined, Status: 1, Description: "Servis kısa sürede kapıda olacaktır.", IsChecked: false, IsDisabled: false, Hidden: true },
    { Id: undefined, Status: 2, Description: "Servis kapıda.", IsChecked: false, IsDisabled: false, Hidden: true },
    { Id: undefined, Status: 3, Description: "Öğrenci servise bindi.", IsChecked: false, IsDisabled: false, Hidden: false },
    { Id: undefined, Status: 4, Description: "Öğrenci servise gelmedi.", IsChecked: false, IsDisabled: false, Hidden: false },
    { Id: undefined, Status: 5, Description: "Servis okula giriş yaptı.", IsChecked: false, IsDisabled: false, Hidden: true },
  ] as any[];

  const passengerWayBackActionsDefinitions = [
    { Id: undefined, Status: 0, Description: "Öğrenci servise bindi.", IsChecked: false, IsDisabled: false, Hidden: true },
    { Id: undefined, Status: 1, Description: "Öğrenci servise binmedi.", IsChecked: false, IsDisabled: false, Hidden: true },
    { Id: undefined, Status: 2, Description: "Servis okuldan çıktı.", IsChecked: false, IsDisabled: true, Hidden: true },
    { Id: undefined, Status: 3, Description: "Servis kısa sürede kapıda olacaktır.", IsChecked: false, IsDisabled: false, Hidden: true },
    { Id: undefined, Status: 4, Description: "Öğrenci indi.", IsChecked: false, IsDisabled: false, Hidden: false },
    { Id: undefined, Status: 5, Description: "Servis tamamlandı.", IsChecked: false, IsDisabled: true, Hidden: true },
  ] as any[]

  const [passengerActions, setPassengerActions] = useState([] as any);

  useEffect(() => {
    if (props.inNextPassengerInfo) {
      setPassenger(props.nextPassenger)
    }
  }, [props.nextPassenger])

  useEffect(() => {

    if (!props.selectedShuttle) {
      return;
    }

    let tempPassengerActions = props.selectedShuttle.Direction === "Gidiş" ? passengerActionsDefinitions : passengerWayBackActionsDefinitions;

    if (!passenger) {
      return;
    }

    if (!props.shuttleDetail) {
      return;
    }

    if (!props.selectedShuttle) {
      return;
    }

    if (!props.isShuttleStarted) {
      setPassengerActions([]);
      return;
    }


    const currentDate = moment(new Date()).format('YYYYMMDD')
    const path = `/PassengerShuttleAction/${passenger.Id}/${props.selectedShuttle.Id}/${currentDate}/${props.shuttleDetail.expeditionId}`;
    getTableItemsWithPath(path).then((result: any) => {

      tempPassengerActions.forEach((element: any) => {
        if (result[element.Status]) {
          element.Id = result[element.Status].Id;
          element.IsChecked = true;
        } else {
          element.IsChecked = false;
        }

      });

      setPassengerActions([...tempPassengerActions]);

    }).catch((error) => {
      tempPassengerActions.forEach((action: any) => {
        action.Id = "";
        action.IsChecked = false;
        return action;
      });

      setPassengerActions([...tempPassengerActions]);
    })

  }, [passenger])

  const insertItem = (passengerAction: any) => {

    const item = {
      PassengerId: passenger!.Id,
      ShuttleId: props.selectedShuttle!.Id,
      ExpeditionId: props.shuttleDetail.expeditionId,
      DriverId: props.selectedShuttle!.DriverId,
      StartedTime: props.shuttleDetail.startedTime,
      EndedTime: "",
      PassengerStatus: passengerAction.Status,
      DateTime: new Date().toISOString(),
      Status: "N",
      Id: passengerAction.Status.toString(),
    } as PassengerShuttleAction

    const currentDate = moment(new Date()).format('YYYYMMDD')
    const path = `/${"PassengerShuttleAction"}/${passenger.Id}/${props.selectedShuttle.Id}/${currentDate}/${props.shuttleDetail.expeditionId}/${passengerAction.Status}`;

    updateItemOnDbWithPath(path, item).then(() => {
      setPassengerActions([...passengerActions]);
    }).then(() => {

      externalNotificationHelper(passengerAction.Status, passenger, props.selectedShuttle)

      props.showMessage(`${passenger.PassengerName} için "${passengerAction.Description}" mesajı gönderildi.`);
      props.setPassengerShuttleActions(item);

      setTimeout(() => {

        if (props.selectedShuttle.Direction === "Gidiş") {
          if (2 < passengerAction.Status)
            calculateNextPassengerInfo(passenger!.Id,
              props.passengersOfTheShuttle,
              props.setNextPassenger,
              props.passengerShuttleActions,
              (props.selectedShuttle as Shuttle).Direction
            );
        }

        if (props.selectedShuttle.Direction === "Dönüş") {
          if (3 < passengerAction.Status)
            calculateNextPassengerInfo(passenger!.Id,
              props.passengersOfTheShuttle,
              props.setNextPassenger,
              props.passengerShuttleActions,
              (props.selectedShuttle as Shuttle).Direction
            );
        }

      }, 100);

    });

  }

  const onPress_setPassengerStatus = (passengerAction: any) => {

    let isChecked = false;
    let id = undefined as any;
    passengerActions.forEach((element: any) => {
      if (element.Status === passengerAction.Status) {
        isChecked = !element.IsChecked;
        element.IsChecked = isChecked;

        id = element.Id;
      }
    });

    setPassengerActions([...passengerActions]);

    if (isChecked) {
      insertItem(passengerAction);
    }

  }

  const isCheckBoxDisabled = (item: any) => {

    if (!props.isShuttleStarted) {
      return true;
    }

    if (!item.IsDisabled) {
      return false;
    }

    return true;
  }

  return (
    <View style={{ marginTop: 10 }}>
      {
        passengerActions.map((passengerAction: any, index: number) => {
          const item = passengerActions.find((item: any) => { return item.Status === index && !item.Hidden });
          if (item) {

            return <CheckBox
              key={index}
              title={passengerAction.Description}
              checked={item.IsChecked}
              disabled={isCheckBoxDisabled(item)}
              uncheckedColor={passengerAction.Status === 3 ? "green" : "red"}
              onPress={() => onPress_setPassengerStatus(passengerAction)}
              containerStyle={{ margin: 2, backgroundColor: "white", borderColor: passengerAction.Status === 3 ? "green" : "red", borderRadius: 2 }}
              textStyle={{ fontSize: 14, color: passengerAction.Status === 3 ? "green" : "red" }}
            />
          }
        })
      }
    </View>
  );
}

const mapStateToProps = (state: any) => {
  const isShuttleStarted = state.rootReducer.isShuttleStarted;
  const selectedShuttle = state.rootReducer.selectedShuttle;
  const passengersOfTheShuttle = state.rootReducer.passengersOfTheShuttle;
  const shuttleDetail = state.rootReducer.shuttleDetail;
  const passengerShuttleActions = state.rootReducer.passengerShuttleActions;
  const nextPassenger = state.rootReducer.nextPassenger as Passenger;
  return { isShuttleStarted, selectedShuttle, passengersOfTheShuttle, shuttleDetail, passengerShuttleActions, nextPassenger };
};

export default connect(mapStateToProps, {
  setPassengerShuttleActions,
  showMessage,
  setNextPassenger,
})(PassengerShuttleActionScreenPassenger)