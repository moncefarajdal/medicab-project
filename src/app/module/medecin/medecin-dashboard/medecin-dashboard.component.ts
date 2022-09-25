import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {PatientService} from "../../../controller/service/Patient.service";
import {RoleService} from "../../../controller/service/role.service";
import {PatientVo} from "../../../controller/model/Patient.model";
import {color} from "chart.js/helpers";
import {PaiementVo} from "../../../controller/model/Paiement.model";
import {PaiementService} from "../../../controller/service/Paiement.service";
import {Chart} from 'chart.js';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexYAxis,
    ApexPlotOptions,
    ApexStroke,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexFill,
} from "ng-apexcharts";
import {ConsultationVo} from "../../../controller/model/Consultation.model";
import {ConsultationService} from "../../../controller/service/Consultation.service";
import {any} from "codelyzer/util/function";
import {TarifChargeService} from "../../../controller/service/TarifCharge.service";
import {TarifChargeVo} from "../../../controller/model/TarifCharge.model";
import * as moment from "moment";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {DepenseService} from "../../../controller/service/Depense.service";
import {DepenseVo} from "../../../controller/model/Depense.model";

export type linechartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    colors: string[];
};

export type radialChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: string[];
    plotOptions: ApexPlotOptions;
};

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    responsive: ApexResponsive[];
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    colors: string[];
};

@Component({
    selector: 'app-medecin-dashboard',
    templateUrl: './medecin-dashboard.component.html',
    styleUrls: ['./medecin-dashboard.component.scss']
})
export class MedecinDashboardComponent implements OnInit {

    public linechartOptions: Partial<linechartOptions>;
    public radialChartOptions: Partial<radialChartOptions>;
    public areaChartOptions: Partial<ChartOptions>;

    _patients: PatientVo;
    _paiements: PaiementVo;
    _depenses: DepenseVo;
    private _allPatients: any;
    _fixedCharges: number;
    cols: any[] = [];

    barData: any;
    barOptions: any;
    lineData: any;
    lineOptions: any;
    pieData: any;
    pieOptions: any;

    private _monthlyRevenue: number;
    private _chargesFixe: number;

    oldPatientsJan = 0;
    oldPatientsFeb = 0;
    oldPatientsMar = 0;
    oldPatientsApr = 0;
    oldPatientsMay = 0;
    oldPatientsJun = 0;
    oldPatientsJul = 0;
    oldPatientsAug = 0;
    oldPatientsSep = 0;
    oldPatientsOct = 0;
    oldPatientsNov = 0;
    oldPatientsDec = 0;

    newPatientsJan = 0;
    newPatientsFeb = 0;
    newPatientsMar = 0;
    newPatientsApr = 0;
    newPatientsMay = 0;
    newPatientsJun = 0;
    newPatientsJul = 0;
    newPatientsAug = 0;
    newPatientsSep = 0;
    newPatientsOct = 0;
    newPatientsNov = 0;
    newPatientsDec = 0;

    chargesJan = 0;
    chargesFeb = 0;
    chargesMar = 0;
    chargesApr = 0;
    chargesMay = 0;
    chargesJun = 0;
    chargesJul = 0;
    chargesAug = 0;
    chargesSep = 0;
    chargesOct = 0;
    chargesNov = 0;
    chargesDec = 0;

    private _newPatient = 0;
    private _oldPatient = 0

    january = 0;
    february = 0;
    march = 0;
    april = 0;
    may = 0;
    june = 0;
    july = 0;
    august = 0;
    september = 0;
    october = 0;
    november = 0;
    december = 0;

    januaryRevenu = 0;
    februaryRevenu = 0;
    marchRevenu = 0;
    aprilRevenu = 0;
    mayRevenu = 0;
    juneRevenu = 0;
    julyRevenu = 0;
    augustRevenu = 0;
    septemberRevenu = 0;
    octoberRevenu = 0;
    novemberRevenu = 0;
    decemberRevenu = 0;

    malePatients = 0;
    femalePatients = 0;
    revenue = 0;

    // allPatients: number[] = [];
    _foundedPatient: any[] = [];

    constructor(private messageService: MessageService, private patientService: PatientService,
                private roleService: RoleService, private paiementService: PaiementService,
                private consultationService: ConsultationService, private tarifChargeService: TarifChargeService,
                private depenseService: DepenseService) {
    }

    ngOnInit(): void {
        this.loadPatients();
        this.loadPaiements();
        this.loadDepenses();
        this.loadConsultations();
        this.monthlyRevenu();
        this.revenueChart();

        this.patientService.getAllPatients().subscribe(data => {
            this.allPatients = data;
            console.log(this.allPatients);
        }, error => console.log(error));
        console.log(this.patients);

        this.januaryClients();
        this.calculateMalePatients();
        this.monthlyCharges();
        this.radialChart();
        this.thisMonthRevenue();
        this.calculateChargesFixe();

        setTimeout(() => {
            this.areaChartOptions = {
                series: [
                    {
                        name: "Anciens Patients",
                        // data: [11, 32, 45, 32, 34, 52, 41, 31, 40, 28, 51, 42],
                        data: this.allPatients,
                    },
                ],
                chart: {
                    height: 350,
                    type: "area",
                    toolbar: {
                        show: false,
                    },
                    foreColor: "#9aa0ac",
                },
                colors: ["#407fe4", "#908e8e"],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth",
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', "Aug", "Sept", "Oct",
                        "Nov", "Dec"],
                },
                legend: {
                    show: true,
                    position: "top",
                    horizontalAlign: "center",
                    offsetX: 0,
                    offsetY: 0,
                },

                tooltip: {
                    theme: "dark",
                    marker: {
                        show: true,
                    },
                    x: {
                        show: true,
                    },
                },
            };
            this.calculateMalePatients();
            this.revenueChart();
        }, 2000);

        setTimeout(() => {
            this.monthlyRevenu();
            this.monthlyCharges();
        }, 500);
    }

    public async loadPatients() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => {
                this.patients = patients;
            }, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async loadConsultations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Consultation', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async loadPaiements() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async loadDepenses() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Depense', 'list');
        isPermistted ? this.depenseService.findAll().subscribe(depenses => this.depenses = depenses, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    // public async loadAllPatients() {
    //     await this.roleService.findAll();
    //     const isPermistted = await this.roleService.isPermitted('Patient', 'list');
    //     isPermistted ? this.patientService.getAllPatients().subscribe(data => {
    //             this.allPatients = data;
    //             // console.log(this.allPatients);
    //         }, error => console.log(error))
    //         : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    //     // console.log(this.allPatients);
    // }

    public revenueChart() {
        this.linechartOptions = {
            series: [
                {
                    name: "Revenues",
                    data: [this.januaryRevenu, this.februaryRevenu, this.marchRevenu, this.aprilRevenu, this.mayRevenu,
                        this.juneRevenu, this.julyRevenu, this.augustRevenu, this.septemberRevenu, this.octoberRevenu,
                        this.novemberRevenu, this.decemberRevenu],
                },
                {
                    name: "Charges",
                    data: [this.chargesJan, this.chargesFeb, this.chargesMar, this.chargesApr, this.chargesMay,
                        this.chargesJun, this.chargesJul, this.chargesAug, this.chargesSep, this.chargesOct,
                        this.chargesNov, this.chargesDec],
                },
                {
                    name: "Revenue Net",
                    data: [this.januaryRevenu - this.chargesJan, this.februaryRevenu - this.chargesFeb,
                        this.marchRevenu - this.chargesMar, this.aprilRevenu - this.chargesApr,
                        this.mayRevenu - this.chargesMay, this.juneRevenu - this.chargesJun,
                        this.julyRevenu - this.chargesJul, this.augustRevenu - this.chargesAug,
                        this.septemberRevenu - this.chargesSep, this.octoberRevenu - this.chargesOct,
                        this.novemberRevenu - this.chargesNov, this.decemberRevenu - this.chargesDec],
                },
            ],
            chart: {
                type: "bar",
                height: 350,
                dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2,
                },
                toolbar: {
                    show: false,
                },
                foreColor: "#9aa0ac",
            },
            colors: ["#5C9FFB", "#AEAEAE", "#63C89B"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    borderRadius: 5,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', "Aug", "Sept", "Oct",
                    "Nov", "Dec"],
            },
            yaxis: {},
            fill: {
                opacity: 1,
            },
            tooltip: {
                theme: "dark",
                marker: {
                    show: true,
                },
                x: {
                    show: true,
                },
            },
        };
    }

    public async calculateRevenu(date: String) {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.paiementService.revenue(date).subscribe(data => {
                this.monthlyRevenue = data;
            }, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        return this.monthlyRevenue;
    }

    public async calculateOldPatients(date: String) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'list');
        isPermistted ? this.patientService.oldPatients(date).subscribe(data => {
                this.oldPatient = data;
                console.log(this.oldPatient);
            }, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async calculateNewPatients(date: String) {
        this.patientService.newPatients(date).subscribe(data => {
                this.newPatient = data
            },
            error => console.log(error));
    }

    public calculateChargesFixe() {
        this.tarifChargeService.chargesFixe().subscribe(data => {
            this.fixedCharges = data
        }, error => console.log(error));
    }

    public thisMonthRevenue() {
        let formattedDate = (moment(new Date())).format('YYYY-MM-DD');
        this.calculateRevenu(formattedDate)
    }

    public monthlyRevenu() {
        this.paiements.forEach(e => {
            const datePaiement = e.datePaiement.toString().substr(5, 2);
            if (datePaiement == "01") {
                this.januaryRevenu += Number(e.montant);
            } else if (datePaiement == "02") {
                this.februaryRevenu += Number(e.montant);
            } else if (datePaiement == "03") {
                this.marchRevenu += Number(e.montant);
            } else if (datePaiement == "04") {
                this.aprilRevenu += Number(e.montant);
            } else if (datePaiement == "05") {
                this.mayRevenu += Number(e.montant);
            } else if (datePaiement == "06") {
                this.juneRevenu += Number(e.montant);
            } else if (datePaiement == "07") {
                this.julyRevenu += Number(e.montant);
            } else if (datePaiement == "08") {
                this.augustRevenu += Number(e.montant);
            } else if (datePaiement == "09") {
                this.septemberRevenu += Number(e.montant);
            } else if (datePaiement == "10") {
                this.octoberRevenu += Number(e.montant);
            } else if (datePaiement == "11") {
                this.novemberRevenu += Number(e.montant);
            } else if (datePaiement == "12") {
                this.decemberRevenu += Number(e.montant);
            }
        })
    }

    monthlyCharges() {
        this.depenses.forEach(e => {
            const dateDepense = e.date.toString().substr(5, 2);
            if (dateDepense == "01") {
                this.chargesJan += Number(e.total);
            } else if (dateDepense == "02") {
                this.chargesFeb += Number(e.total);
            } else if (dateDepense == "03") {
                this.chargesMar += Number(e.total);
            } else if (dateDepense == "04") {
                this.chargesApr += Number(e.total);
            } else if (dateDepense == "05") {
                this.chargesMay += Number(e.total);
            } else if (dateDepense == "06") {
                this.chargesJun += Number(e.total);
            } else if (dateDepense == "07") {
                this.chargesJul += Number(e.total);
            } else if (dateDepense == "08") {
                this.chargesAug += Number(e.total);
            } else if (dateDepense == "09") {
                this.chargesSep += Number(e.total);
            } else if (dateDepense == "10") {
                this.chargesOct += Number(e.total);
            } else if (dateDepense == "11") {
                this.chargesNov += Number(e.total);
            } else if (dateDepense == "12") {
                this.chargesDec += Number(e.total);
            }
        })
    }

    januaryClients() {
        this.patients.forEach(e => {
            const date = e.dateCreation.toString().substr(5, 2);
            if (date == "04") {
                this.april += 1;
            } else if (date == "05") {
                this.may += 1;
            } else if (date == "06") {
                this.june += 1;
            } else if (date == "07") {
                this.july += 1;
            } else if (date == "08") {
                this.august += 1;
            } else if (date == "09") {
                this.september += 1;
            } else if (date == "10") {
                this.october += 1;
            }
        })
    }

    calculateMalePatients() {
        this.patients.forEach(e => {
            if (e.sexeVo.libelle == 'Homme') {
                this.malePatients += 1;
            }
            if (e.sexeVo.libelle == 'Femme') {
                this.femalePatients += 1;
            }
        })
        // console.log(this.malePatients);
    }

    oldPatients() {
        this.patients.forEach(e => {
            let result = 0;
            const date = e.dateCreation.toString().substr(5, 2);
            if (date == "01") {
                result++;
                this.allPatients.push(result);
            } else if (date == "02") {
                result++;
                this.allPatients.push(result);
            } else if (date == "03") {
                result++;
                this.allPatients.push(result);
            } else if (date == "04") {
                result++;
                this.allPatients.push(result);
            } else if (date == "05") {
                result++;
                this.allPatients.push(result);
            }
        })
    }

    private radialChart() {
        this.radialChartOptions = {
            series: [this.malePatients, this.femalePatients],
            chart: {
                height: 265,
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: "22px",
                        },
                        value: {
                            fontSize: "16px",
                        },
                        total: {
                            show: true,
                            label: "Total",
                            formatter: function (w) {
                                return "249";
                            },
                        },
                    },
                },
            },
            colors: ["#ffc107", "#3f51b5", "#8bc34a"],

            labels: ["Male Patiens", "Female Patients"],
        };
    }

    // patientsChart() {
    //     this.areaChartOptions = {
    //         series: [
    //             {
    //                 name: "Nouveaux Patients",
    //                 data: [31, 40, 28, 51, 42, 85, 77, 41, 39, 40, 34, 81],
    //             },
    //             {
    //                 name: "Anciens Patients",
    //                 data: [11, 32, 45, 32, 34, 52, 41, 31, 40, 28, 51, 42],
    //             },
    //         ],
    //         chart: {
    //             height: 350,
    //             type: "area",
    //             toolbar: {
    //                 show: false,
    //             },
    //             foreColor: "#9aa0ac",
    //         },
    //         colors: ["#407fe4", "#908e8e"],
    //         dataLabels: {
    //             enabled: false,
    //         },
    //         stroke: {
    //             curve: "smooth",
    //         },
    //         xaxis: {
    //             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', "Aug", "Sept", "Oct",
    //                 "Nov", "Dec"],
    //         },
    //         legend: {
    //             show: true,
    //             position: "top",
    //             horizontalAlign: "center",
    //             offsetX: 0,
    //             offsetY: 0,
    //         },
    //
    //         tooltip: {
    //             theme: "dark",
    //             marker: {
    //                 show: true,
    //             },
    //             x: {
    //                 show: true,
    //             },
    //         },
    //     };
    // }

    // Getters and setters

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get allPatients(): any {
        return this.patientService.allPatients;
    }

    set allPatients(value: any) {
        this.patientService.allPatients = value;
    }

    get paiements(): Array<PaiementVo> {
        return this.paiementService.paiements;
    }

    set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
    }

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get depenses(): Array<DepenseVo> {
        return this.depenseService.depenses;
    }

    set depenses(value: Array<DepenseVo>) {
        this.depenseService.depenses = value;
    }

    get fixedCharges(): number {
        return this.tarifChargeService.fixedCharges;
    }

    set fixedCharges(value: number) {
        this.tarifChargeService.fixedCharges = value;
    }

    get monthlyRevenue(): number {
        return this.paiementService.monthlyRevenue;
    }

    set monthlyRevenue(value: number) {
        this.paiementService.monthlyRevenue = value;
    }

    get newPatient(): number {
        return this.patientService.newPatient;
    }

    set newPatient(value: number) {
        this.patientService.newPatient = value;
    }

    get oldPatient(): number {
        return this.patientService.oldPatient;
    }

    set oldPatient(value: number) {
        this.patientService.oldPatient = value;
    }
}
