const sendSms = (message: string, number: string) => {

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/xml");

    // var raw = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n <mainbody>\r\n <header>\r\n <company dil=\"TR\">Netgsm</company>        \r\n <usercode>3266060851</usercode>\r\n<password>080905Apmad@@</password>\r\n <type>1:n</type>\r\n <msgheader>3266060851</msgheader>\r\n </header>\r\n <body>\r\n <msg>\r\n ${message} \r\nBasbus Servis Uygulaması.\r\n </msg>\r\n <no>${number}</no>\r\n </body>\r\n </mainbody>`;

    // var requestOptions: any = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };

    // fetch("https://api.netgsm.com.tr/sms/send/xml", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");

    var raw = `<?xml version=\"1.0\"?>\r\n<mainbody>\r\n   <header>\r\n       <usercode>3266060851</usercode>\r\n       <password>080905Apmad@@</password>\r\n       <msgheader>3266060851</msgheader>\r\n   </header>\r\n   <body>\r\n       <msg>${message} \n-Basbus-</msg>\r\n       <no>${number}</no>\r\n   </body>\r\n</mainbody>`;

    var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.netgsm.com.tr/sms/send/otp", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default sendSms;