import {TarifChargeVo} from "./TarifCharge.model";

export class DepenseVo {

    public id: number;
    public reference: string;
    public date: Date;
    public total: number;
    public dateMax: string;
    public dateMin: string;
    public totalMax: string;
    public totalMin: string;
    public tarifChargesVo: Array<TarifChargeVo>;

}
