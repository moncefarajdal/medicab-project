import {ChargeVo} from "./Charge.model";
import {DepenseVo} from "./Depense.model";

export class TarifChargeVo {

    public id: number;
    public prix: number;
    public chargeVo: ChargeVo;
    public depenseVo: DepenseVo;

}
