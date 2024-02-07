import { Alert } from "react-native";
import { getTableItems, getTableItemsWithPath, getTableItemWithId } from "../dto/ServerHelper";
import { Passenger } from "../model/Passenger";

const sendSMSToParents = (shuttleId: string) => {

    getTableItemsWithPath(`/Shuttle/${shuttleId}/Passengers`).then((passengerResponse: any) => {
        let promiseArray2: any[] = [];
        const passengerItems = passengerResponse.split(",");
        passengerItems.forEach((passenger: any) => {
            const p1 = getTableItemWithId<Passenger>("Passenger", passenger);
            promiseArray2.push(p1);
        });

        Promise.all(promiseArray2).then((passengerResult: Passenger[]) => {
            let messageItems: string[] = [];
            passengerResult.forEach(passengerItem => {

                if (passengerItem) {
                    const messageItem = `<Message> \r\n<Mesgbody>Merhaba Sayın Veli, AppStore veya Play Store'dan Basbus Veli uygulamasını indirerek okul servisinizin güzergahını ve hareketlerini takip edebilir, bildirim ayarları yapabilirsiniz. Şifreniz:${passengerItem.Password} Whatsapp Destek: 5397039090 Instagram: https://www.instagram.com/basbus.com.tr/ </Mesgbody> <Number>90${passengerItem.GuardianNumber}</Number> \r\n</Message>`;
                    messageItems.push(messageItem);

                }

            });

            var messageBody = messageItems.join("\r\n");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/xml");
            myHeaders.append("referrerPolicy", "unsafe-url");

            var raw = `<MainmsgBody> \r\n<Command>1</Command> \r\n<PlatformID>1</PlatformID> \r\n<ChannelCode>583</ChannelCode>\r\n<UserName>pelinpolatbilgi</UserName>\r\n<PassWord>K6A35KS7</PassWord>\r\n<Type>1</Type> \r\n<Concat>1</Concat> \r\n<Originator>BASBUS</Originator>\r\n<Messages> ${messageBody} \r\n</Messages> \r\n<SDate></SDate> \r\n<EDate></EDate> \r\n</MainmsgBody> `;

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: 'cors',
            };

            fetch("https://processor.smsorigin.com/xml/process.aspx", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        });

    })

}


const sendSMSToParentsForActivate = (shuttleId: string, organisationName: string) => {

    getTableItemsWithPath(`/Shuttle/${shuttleId}/Passengers`).then((passengerResponse: any) => {
        let promiseArray2: any[] = [];
        const passengerItems = passengerResponse.split(",");
        passengerItems.forEach((passenger: any) => {
            const p1 = getTableItemWithId<Passenger>("Passenger", passenger);
            promiseArray2.push(p1);
        });

        Promise.all(promiseArray2).then((passengerResult: Passenger[]) => {
            let messageItems: string[] = [];
            passengerResult.forEach(passengerItem => {

                if (passengerItem) {
                    const messageItem = `<Message> \r\n<Mesgbody>Merhaba Sayın Veli, ${organisationName} Basbus servis uygulaması pazartesi günü (02/01/2023) itibariyle aktif edilecektir. AppStore veya Play Store'dan Basbus Veli uygulamasını indirerek okul servisinizin güzergahını ve hareketlerini takip edebilir, bildirim ayarları yapabilirsiniz. Şifreniz:${passengerItem.Password} Whatsapp Destek: 5397039090 Instagram: https://www.instagram.com/basbus.com.tr/ </Mesgbody> <Number>90${passengerItem.GuardianNumber}</Number> \r\n</Message>`;
                    messageItems.push(messageItem);
                }
            });

            var messageBody = messageItems.join("\r\n");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/xml");
            myHeaders.append("Access-Control-Allow-Origin", "*");

            var raw = `<MainmsgBody> \r\n<Command>1</Command> \r\n<PlatformID>1</PlatformID> \r\n<ChannelCode>583</ChannelCode>\r\n<UserName>pelinpolatbilgi</UserName>\r\n<PassWord>K6A35KS7</PassWord>\r\n<Type>1</Type> \r\n<Concat>1</Concat> \r\n<Originator>BASBUS</Originator>\r\n<Messages> ${messageBody} \r\n</Messages> \r\n<SDate></SDate> \r\n<EDate></EDate> \r\n</MainmsgBody> `;

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: 'cors',
            };

            fetch("https://processor.smsorigin.com/xml/process.aspx", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        });

    })

}

const sendSpecificSMSToParents = (shuttleId: string, message: string) => {

    getTableItemsWithPath(`/Shuttle/${shuttleId}/Passengers`).then((passengerResponse: any) => {
        let promiseArray2: any[] = [];
        const passengerItems = passengerResponse.split(",");
        passengerItems.forEach((passenger: any) => {
            const p1 = getTableItemWithId<Passenger>("Passenger", passenger);
            promiseArray2.push(p1);
        });

        Promise.all(promiseArray2).then((passengerResult: Passenger[]) => {
            let messageItems: string[] = [];
            passengerResult.forEach(passengerItem => {

                if (passengerItem) {
                    const messageItem = `<Message> \r\n<Mesgbody> ${message} </Mesgbody> <Number>90${passengerItem.GuardianNumber}</Number> \r\n</Message>`;
                    messageItems.push(messageItem);
                }
            });

            var messageBody = messageItems.join("\r\n");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/xml");
            myHeaders.append("referrerPolicy", "unsafe-url");

            var raw = `<MainmsgBody> \r\n<Command>1</Command> \r\n<PlatformID>1</PlatformID> \r\n<ChannelCode>583</ChannelCode>\r\n<UserName>pelinpolatbilgi</UserName>\r\n<PassWord>K6A35KS7</PassWord>\r\n<Type>1</Type> \r\n<Concat>1</Concat> \r\n<Originator>BASBUS</Originator>\r\n<Messages> ${messageBody} \r\n</Messages> \r\n<SDate></SDate> \r\n<EDate></EDate> \r\n</MainmsgBody> `;

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: 'cors',
            };

            fetch("https://processor.smsorigin.com/xml/process.aspx", requestOptions)
                .then(response => response.text())
                .then(result => Alert.alert("Bilgi", `Mesaj gönderildi. ${result}`))
                .catch(error => console.log('error', error));

        });

    })

}

export { sendSMSToParents, sendSMSToParentsForActivate, sendSpecificSMSToParents };