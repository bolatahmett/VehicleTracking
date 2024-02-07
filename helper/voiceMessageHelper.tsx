import moment from "moment";

const voiceMessageHelper = (message: string, number: string) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");

    const startDate = moment().format("DDMMYYYY");
    const stopDate = moment().format("DDMMYYYY");

    const startTime = moment().format('HH:mm:ss');
    const stopTime = moment().add(1, "minute").format('HH:mm:ss');

    var raw = `<?xml version='1.0'?>\r\n       <mainbody>\r\n       <header>\r\n       <usercode>3266060851</usercode>\r\n        <password>080905Apmad@@</password>\r\n       <startdate>${startDate}</startdate>\r\n       <starttime>${startTime}</starttime>\r\n       <stopdate>${stopDate}</stopdate>\r\n       <stoptime>${stopTime}</stoptime>\r\n       <key>0</key>          \r\n       </header>\r\n       <body>\r\n       <text>${message}</text>\r\n       <no>90${number}</no>\r\n       </body>\r\n       </mainbody>`;
    console.log(raw)
    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.netgsm.com.tr/voicesms/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default voiceMessageHelper;