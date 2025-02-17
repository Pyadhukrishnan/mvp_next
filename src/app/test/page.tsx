"use client";
import { Options } from '@/interfaces/user';
import DatePicker from '@/themes/components/date-picker/date-picker';
import RadioButtons from '@/themes/components/radio-buttons/radio-buttons';
import SelectionComponent from '@/themes/components/selection-component/selection-component';
import React, { useEffect, useState } from 'react';

export default function page() {
    const [date,setDate] = useState("");

    const options:Options[] = [
        {
            label:"gu",
            value:"hvh"
        },{
            label:"er",
            value:"hvh"
        },{
            label:"fe",
            value:"sd"
        },{
            label:"gu",
            value:"vsd"
        },{
            label:"gu",
            value:"vsdd"
        },{
            label:"gu",
            value:"jkl"
        },{
            label:"gu",
            value:"wrtw"
        },
    ]

    useEffect(()=>{
        console.log(date);
    },[date])
  return (
    <div style={{marginTop:"100px"}}>
        <SelectionComponent options={options} setSelected={setDate} error={true}/>
    </div>
  )
}
