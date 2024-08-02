import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";


export const location: YMapLocationRequest = { center: [37.95, 55.65], zoom: 10, duration: 200 };
export const locationCenter: [number, number] = [location.center[0], location.center[1]]
export const apiKey = "b1d3c331-d2a1-40f1-84af-ef2371bf8057";
