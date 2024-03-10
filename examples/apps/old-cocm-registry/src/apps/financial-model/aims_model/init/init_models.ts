import {
    DirectStaffActivity,
    DirectStaffActivityCollection, OtherStaffActivity,
    OtherStaffActivityCollection, Staff, StaffCollection,
    StaffType,
    WeeklyServices
} from "../staff";

import {Payer, PayerCollection} from "../payer";
import {BillingRate, BillingRateCollection} from "../billing_rates";
import {CaseloadVolumeCapacity} from "../caseload_capacity";
import {Clinic} from "../clinic";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

const getPsychiatrist = () => {
    let directStaffActivityCollection = new DirectStaffActivityCollection(
        StaffType.Psychiatrist,
        'Direct Care Services Reimbursable via Psych CPT codes',[
            new DirectStaffActivity("Direct Treatment: Assessment Visit", 0,1),
            new DirectStaffActivity("Direct Treatment: Follow-up Visits", 0,0.5)
        ]
    )
    let otherStaffActivityCollection = new OtherStaffActivityCollection(
        'Indirect Care and Administrative Tasks',
        [
            new OtherStaffActivity("Registry Review", 0.5),
            new OtherStaffActivity("Direct PCP Communication", 0.5),
            new OtherStaffActivity("Caseload and Patient Review with BH Care Manager", 1),
            new OtherStaffActivity("Charting", 0.5),
            new OtherStaffActivity("Other (Research, Staff Meetings, Training, etc.)", 0.5),
        ]
    )

    let weekly_services = new WeeklyServices([directStaffActivityCollection], [otherStaffActivityCollection])
    let psychiatrist = new Staff(StaffType.Psychiatrist, 'Psychiatrist', 0.075, weekly_services, 225000, 0.10)
    return psychiatrist
}

const getCareManager = () => {
    let directStaffActivityCollection = new DirectStaffActivityCollection(
        StaffType.CareManager,
        'Direct Care Services Reimbursable via CoCM or Counseling CPT codes',[
            new DirectStaffActivity("Warm Connection Visit 16 + min", 1.5,0.3),
            new DirectStaffActivity("Initial Assessment Visit", 6.5,0.75),
            new DirectStaffActivity("Follow Up Visit", 16,0.5),
            new DirectStaffActivity("Group Treatment Visit", 2.0,0.33)
        ]
    )
    let otherStaffActivityCollection = new OtherStaffActivityCollection(
        'Other BH Care Manager Services (reimbursable under CoCM codes)',
        [
            new OtherStaffActivity("Warm Connection visit under 16 minutes", 1),
            new OtherStaffActivity("Outreach attempts (phone, letter, etc)", 1),
            new OtherStaffActivity("Telephone Visit", 2),
            new OtherStaffActivity("Caseload and Patient Review with Psych Consultant", 1),
            new OtherStaffActivity("Team Communication", 1),
            new OtherStaffActivity("Registry Management", 1)
        ]
    )
    let adminStaffActivityCollection = new OtherStaffActivityCollection(
        'Administrative Tasks',
        [
            new OtherStaffActivity("Charting", 5),
            new OtherStaffActivity("Other (Clinical Supervision, Staff Meetings, Training, etc.)", 2),
        ]
    )
    let weekly_services = new WeeklyServices([directStaffActivityCollection], [otherStaffActivityCollection, adminStaffActivityCollection])
    let care_manager = new Staff(StaffType.CareManager, 'Care Manager', 1, weekly_services, 80000, 0.25)
    return care_manager
}

let careManager = getCareManager()
let psychiatrist = getPsychiatrist()
let staffCollection = new StaffCollection(
    [
        careManager,
        psychiatrist
    ],
    0.25,
    40,
    47
)

staffCollection.full_time_pcps  = 5
staffCollection.full_time_pcps_cocm_percent = .8



let medicare = new Payer('Medicare',
    .2,
    1,
    0,
    0,
    0,
    0,
    0,
    true,
    false
)

let medicaid = new Payer('Medicaid',
    .4,
    0,
    150,
    100,
    40,
    200,
    150,
    true,
    true
)

let commericalOKCoCM = new Payer('Commercial OK for CoCM',
    .2,
    1,
    0,
    0,
    0,
    0,
    0,
    true,
    false
)

let commericalOther = new Payer('Commercial other',
    .2,
    0,
    175,
    125,
    50,
    225,
    175,
    false,
    true
)

let payerCollection = new PayerCollection([medicare, medicaid, commericalOKCoCM, commericalOther])

let billingRateCollection = new BillingRateCollection(
    [
        new BillingRate('Not Seen or Threshold Not Met', 0.05, 0, 0),
        new BillingRate('NEW! 30 min ANY month (G2214)', 0.10, 57.19, 57.19),
        new BillingRate('70 Initial Month Minutes (99492 )', 0.15, 147.12, 147.12),
        new BillingRate('100 Initial Minutes (99492 + 99494)', 0.05, 203.65, 203.65),
        new BillingRate('130 Initial Minutes (99492 + 99494 x 2)', 0.05, 260.18, 260.18),
        new BillingRate('60 Subsequent Month Minutes (99493 )', 0.40, 139.18, 139.18),
        new BillingRate('90 Subsequent Minutes (99493 + 99494)', 0.15, 195.71, 195.71),
        new BillingRate('120 Subsequent Minutes (99493 + 99494 x 2)', 0.05, 252.24, 252.24)
    ],
    ''
)
let caseLoadVolumeCapacity = new CaseloadVolumeCapacity(
    14,
    5
)

caseLoadVolumeCapacity.pcpReferrals = 5
caseLoadVolumeCapacity.patientCVR = .7
caseLoadVolumeCapacity.graduationRate = .15


let clinic = new Clinic(
    staffCollection,
    payerCollection,
    billingRateCollection,
    caseLoadVolumeCapacity
)

clinic = clinic.copy()

const getClinicInstance = () => {
    let clinic = new Clinic(
        staffCollection,
        payerCollection,
        billingRateCollection,
        caseLoadVolumeCapacity
    )
    return clinic
}

export { clinic, getClinicInstance }