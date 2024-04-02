import React, {useEffect, useState} from "react";
import {useAkello} from "@akello/react-hook";
import moment from "moment";
import classNames from "classnames";
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import Datepicker from "react-tailwindcss-datepicker";
import { BillingReportDataGrid } from '../../reports'


export const ReportsPage = () => {
    const [statData, setStatData] = useState([])
    const [visible, { toggle, open, close }] = useDisclosure(false);

    const akello = useAkello()

    const [value, setValue] = useState({
        startDate: moment().subtract(30, 'days').toDate(),
        endDate: moment().toDate()
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }


    useEffect(() => {
        if(value.startDate && value.endDate) {
            open()
            akello.reportsService.getBillingReport(akello.getSelectedRegistry()!.id, moment(value.startDate).unix(), moment(value.endDate).unix(), (data) => {
                setStatData(data)
                close()
            }, (error) => {
                close()
            })
        }
    }, [value])

    return (
        <>
                <div className={"p-4 space-y-6"}>
                    <div className={"w-full border border-1 "}>
                        <div className={"font-semibold border-b border-1 p-2"}>
                            <p className={"text-xl"}>
                                Billing Report
                            </p>
                        </div>
                        <div className={"p-2  pb-6"}>
                            <div>
                                Generate and download your billing report
                            </div>


                           <div className='border border-1 rounded-md mb-4'>
                            <Datepicker
                                        value={value}
                                        onChange={handleValueChange}
                                        showShortcuts={true}

                                    />

                           </div>

                            <Box pos="relative">
                                <LoadingOverlay visible={visible} zIndex={100} overlayProps={{ radius: "sm", blur: 2 }} />
                                <BillingReportDataGrid data={statData}/>
                            </Box>

                        </div>
                    </div>
                </div>



        </>
    )
}
