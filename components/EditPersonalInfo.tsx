import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "../constants/style";
import { updateItemOnDb } from "../dto/ServerHelper";
import { Driver } from "../model/Driver";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { setDriver, showMessage } from "../redux/actions/actions";

function EditPersonalInfo(props: any) {

    useEffect(() => {
        if (props.selectedDriver) {
            setValue("Name", props.selectedDriver.Name);
            setValue("UserName", props.selectedDriver.UserName);
            setValue("Password", props.selectedDriver.Password);
            setValue("PhoneNumber", props.selectedDriver.PhoneNumber);
        }
    }, [props.selectedDriver])

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            Name: '',
            UserName: '',
            Password: undefined,
            PhoneNumber: ''
        }
    });
    const onSubmit = (data: any) => {
        var result = { ...props.selectedDriver, ...data };

        updateItemOnDb("Driver", result, props.selectedDriver.Id)
        props.setDriver(result);
        props.showMessage('Kayıt işlemi başarılı.');
    };

    return (
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formText}
                        placeholder="Adı"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="Name"
            />

            {errors.Name && <Text>Boş geçilemez.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formText}
                        placeholder="Kullanıcı adı"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        editable={false}
                    />
                )}
                name="UserName"
            />

            {errors.UserName && <Text>Boş geçilemez.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formText}
                        placeholder="Şifre"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="Password"
            />
            {errors.Password && <Text>Boş geçilemez.</Text>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formText}
                        placeholder="Telefon numarası"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="PhoneNumber"
            />

            {errors.PhoneNumber && <Text>Boş geçilemez.</Text>}

            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{
                width: "80%",
                backgroundColor: "#fb5b5a",
                borderRadius: 10,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                alignSelf: 'center',
            }}>
                <Text style={styles.setttingsMenuText}>{"Kaydet"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const selectedDriver = state.rootReducer.selectedDriver as Driver;
    return { selectedDriver };
};

export default connect(mapStateToProps, {
    setDriver,
    showMessage,
})(EditPersonalInfo)