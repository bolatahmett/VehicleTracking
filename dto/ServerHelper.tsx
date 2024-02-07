
import { ref, get, child, query, update, push, set, remove, startAfter } from "firebase/database";
import { PassengerShuttleAction } from "../model/PassengerShuttleAction";
import { database } from './FireBaseDB';

export async function getUser(nickName: string, password: string, loginType: number): Promise<any> {
    let result = undefined;

    const dbRef = ref(database);

    await get(child(dbRef, `User/${nickName}`)).then((snapshot) => {

        var snapshotValue = snapshot.val();
        if (snapshotValue["Password"] == password && snapshotValue["LoginType"] == loginType) {
            result = snapshotValue;
        }
    });

    return result;
}

export async function getTableItemWithId<T>(tableName: string, id: string): Promise<T> {
    let result = undefined;
    const dbRef = ref(database);
    result = (await get(child(dbRef, `${tableName}/${id}`))).val();
    if (result) {
        result["Id"] = id;
    }
    return result as unknown as Promise<T>;
}

export async function getTableItemsWithPath(path: string): Promise<any> {
    let result = undefined;
    const dbRef = ref(database);
    result = (await get(child(dbRef, path))).val();
    return result as unknown as Promise<any>;
}

export async function getTableItemsWithPathToJson(path: string): Promise<any> {
    let result = undefined;
    const dbRef = ref(database);
    result = (await get(child(dbRef, path))).toJSON();
    return result as unknown as Promise<any>;
}

export async function getTableItems(tableName: string): Promise<any> {
    let result = undefined;

    await get(query(ref(database, tableName))).then((snapshot: any) => {
        result = [];
        var json = snapshot.val();

        for (var key in json) {
            var keyTemp = json[key];
            keyTemp["Id"] = key;
            result.push(keyTemp);
        }
    });

    return result;;
}

export async function deleteItemOnDb(tableName: string, key: string) {
    const databaseRef = ref(database, `/${tableName}/${key}`);
    return remove(databaseRef)
}

export async function getFilteredData(tableName: string, query: string) {

    fetch("https://ssm-frontend-default-rtdb.firebaseio.com/" + tableName + ".json?" + query, {
        method: 'GET',
        //Request Type
    })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {

        })
        //If response is not in json then in error
        .catch((error) => {
            console.error(error);
        });

}

export async function updateItemOnDbWithPath(path: string, item: any) {
    const updates = {} as any;
    updates[path] = item;
    return update(ref(database), updates);
}

export async function updateItemOnDb(tableName: string, item: any, key: string) {
    const updates = {} as any;
    let uniqueKey = key ? key : item.Id;

    if (!uniqueKey) {
        uniqueKey = push(child(ref(database), tableName)).key;
    }

    const { Id, ...newObj } = item;
    updates[`/${tableName}/${uniqueKey}`] = newObj;

    return update(ref(database), updates);
}
