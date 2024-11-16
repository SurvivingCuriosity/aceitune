import { SCALES_MAP } from "../assets/constants/ScalesMap";

export const getEscala = (key:number, mode:number) => {
    return SCALES_MAP[`${key}${mode}`];

}

export const getEscalaYRelativa = (key:number, mode:number) => {
    return SCALES_MAP[`${key}${mode}`];

}