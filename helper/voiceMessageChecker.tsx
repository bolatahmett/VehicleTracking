import { getTableItemsWithPath } from "../dto/ServerHelper";

const voiceMessageChecker = async (number: string, organisation: string, date: string, shuttleId: string) => {
    let result = "Cağrı bulunamadı";
    let bulkId: string = "";
    const path = `/Log/${organisation}/${date}/VoiceMessageHelper/Info/${shuttleId}/${number}`;
    console.log(path)

    await getTableItemsWithPath(path)
        .then((response: any) => {

            if (!response) {
                result = "Cağrı bulunamadı";
            }

            bulkId = response[Object.keys(response)[0]].result.split(" ")[1];
            console.log(`bulkId: ${bulkId}`)
        })

    if (!bulkId) {
        result = "Cağrı bulunamadı";
    }

    var raw = "";

    const requestOptions: any = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };

    console.log(`bulkId2: ${bulkId}`)
    await fetch(`https://api.netgsm.com.tr/voicesms/report?usercode=3266060851&password=080905Apmad@@&type=0&bulkid=${bulkId}`, requestOptions)
        .then(response => response.text())
        .then((response: any) => {

            console.log(response);
            console.log("-------------");

            if (!response) {
                result = "Cağrı bulunamadı";
            }

            const status: any = response && response.split(" ")[2];
            console.log(status)
            switch (status.toString()) {
                case "0":
                    result = "Cevaplanmayı bekliyor";
                    break;
                case "1":
                    result = "Cevaplananlar / Açan";
                    break;
                case "2":
                    result = "Cevaplanmayanlar"
                    break;
                case "3":
                    result = "Ulaşılamayan";
                    break;
                case "4":
                    result = "Ücretlendirelemeyen / Varlık Yetersiz";
                    break;
                case "5":
                    result = "Iptal Edilen";
                    break;
                case "6":
                    result = "Başarısız : başlatılamayan çağrılar, durdurulan, hata alanlar";
                    break;
                case "7":
                    result = "Meşgule Alınan";
                    break;
                case "8":
                    result = "Numara Geçersiz";
                    break;
                case "9":
                    result = "Süresi Doldu";
                    break;
                default:
                    break;
            }

        });

    return result;
}

export default voiceMessageChecker;