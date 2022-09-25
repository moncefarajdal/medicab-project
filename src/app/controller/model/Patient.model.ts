import {SexeVo} from './Sexe.model';
import {MutuelleVo} from './Mutuelle.model';
import {SourceVo} from "./Source.model";

export class PatientVo {

    public id: number;
    public cin: string;
    public nom: string;
    public prenom: string;
    public dateNaissance: Date;
    public adresse: string;
    public telephone: string;
    public numeroCnss: string;
    public mutualise: null | boolean;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public dateNaissanceMax: string;
    public dateNaissanceMin: string;
    public dateArchivageMax: string;
    public dateArchivageMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public sexeVo: SexeVo;
    public mutuelleVo: MutuelleVo;
    public sourceVo: SourceVo;
}
