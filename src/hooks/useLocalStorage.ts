"use client"

import * as ls from "local-storage";


export function useLocalStorage<T>(){

    const setLocalStorage = (key: string, value: T) => {
        console.log("In set-local-storage, key : ", key, "value: ", value);
        ls.set<T>(key, value);
    }

    const getLocalStorage = (key: string) => {
        const value =  ls.get<T>(key);
        console.log("In detail-local-storage, key : ", key, "value: ", value);
        return value;
    }

    const removeLocalStorage = (key: string) => {
        ls.remove(key);
    }

    return {getLocalStorage, removeLocalStorage, setLocalStorage};
}

