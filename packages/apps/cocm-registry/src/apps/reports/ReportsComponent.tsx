import AppContainer from "../../stories/app/Container/AppContainer";
import React, {useEffect, useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {getBillingReport} from "../../api/reports";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import BillingReportDataGrid from "./billing/BillingReportDataGrid";
import moment from "moment";
import BillingReport from "./billing/BillingReport";
import classNames from "classnames";

const ReportsComponent = () => {

    const [tab, setTab] = useState('Registry')
    return (
        <>
            <AppContainer title={"Reports"}>

                <div className={"p-4 space-y-6"}>

                    <div className="tabs tabs-boxed bg-white">
                        <button onClick={()=> setTab('Registry')} className={classNames({'tab-active': tab=='Registry'}, "tab") }>Registry</button>
                        <button onClick={()=> setTab('Billing')} className={classNames({'tab-active': tab=='Billing'}, "tab") }>Billing</button>
                    </div>

                    {
                        tab == 'Billing' && (
                            <>
                                    <BillingReport />

                            </>
                        )
                    }
                </div>

            </AppContainer>
        </>
    )
}

export default ReportsComponent