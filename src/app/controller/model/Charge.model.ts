import {TypeChargeVo} from "./TypeCharge.model";

export class ChargeVo {
    public id: number;
    public reference: string;
    public libelle: string;
    public description: string;
    public fixe: null | boolean;
    public typeChargeVo: TypeChargeVo;
}
