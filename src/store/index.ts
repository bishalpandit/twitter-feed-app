import { atom } from "recoil";

export const authState = atom({
    key: "authState",
    default: {
        user: null
    }
});

export const tweetsState = atom({
    key: "tweetsState",
    default: []
});