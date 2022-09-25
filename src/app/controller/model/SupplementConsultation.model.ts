import {ConsultationVo} from './Consultation.model';
import {SupplementVo} from "./Supplement.model";

export class SupplementConsultationVo {

    public id: number;
    // public prix = 0;
    public prix: number;
    public supplementVo: SupplementVo;
    public consultationVo: ConsultationVo;

}
