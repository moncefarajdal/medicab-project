import {OrdonnanceVo} from './Ordonnance.model';
import {ConsultationVo} from './Consultation.model';
import {MedicamentVo} from './Medicament.model';


export class PrescriptionVo {

    public id: number;

    public reference: string;
     public nbreFois: number;
     public qteMedicament: number;
     public formeMedicament: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
                public nbreFoisMax: string ;
                public nbreFoisMin: string ;
                public qteMedicamentMax: string ;
                public qteMedicamentMin: string ;
                public formeMedicamentMax: string ;
                public formeMedicamentMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public ordonnanceVo: OrdonnanceVo ;
      public medicamentVo: MedicamentVo ;
      public consultationVo: ConsultationVo ;

}
