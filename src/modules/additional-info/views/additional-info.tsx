"use client";
import React, { useState } from "react";
import styles from "./additional-info.module.css";
import InputField from "@/themes/components/input-field/input-field";
import DatePicker from "@/themes/components/date-picker/date-picker";
import ButtonComponent from "@/themes/components/button-component/button-component";
import { Options } from "@/interfaces/user";
import RadioButtons from "@/themes/components/radio-buttons/radio-buttons";
import SelectionComponent from "@/themes/components/selection-component/selection-component";

const AdditionalInfo = () => {
  const [name, setname] = useState("");
  const [userId, setUserId] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefectures, setPrefectures] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");

  const genderOptions:Options[] = [
    {
      label: "男性",
      value: "男性"
    },
    {
      label: "女性",
      value: "女性"
    },
    {
      label: "その他",
      value: "その他"
    },
    {
      label: "回答なし",
      value: "回答なし"
    }
  ];

  const prefecturesOptions:Options[] = [
    { label: "東京都", value: "Tokyo Metropolis" },
    { label: "大阪府", value: "Osaka Prefecture" },
    { label: "北海道", value: "Hokkaido" },
    { label: "愛知県", value: "Aichi Prefecture" },
    { label: "京都府", value: "Kyoto Prefecture" },
    { label: "神奈川県", value: "Kanagawa Prefecture" },
    { label: "広島県", value: "Hiroshima Prefecture" },
    { label: "沖縄県", value: "Okinawa Prefecture" },
    { label: "宮城県", value: "Miyagi Prefecture" },
    { label: "鹿児島県", value: "Kagoshima Prefecture" }
  ]
  

  return (
    <form className={styles.additionalFormWrapper}>
      <div className={styles.header}>
        <h2>サービス利用申し込み</h2>
        <p>必要に応じて説明書きを追加する / description</p>
      </div>
      <div className={styles.formFields}>
        <div className={styles.inputFields}>
          <p>氏名</p>
          <InputField onChange={setname} value={name} />
        </div>

        <div className={styles.inputFields}>
          <p>ユーザーID</p>
          <InputField onChange={setUserId} value={userId} />
        </div>

        <div className={styles.inputFields}>
          <p>生年月日</p>
          <DatePicker onChange={setDob} />
        </div>

        <div className={styles.inputFields}>
          <p>性別</p>
          <RadioButtons onSelect={setGender} options={genderOptions} />
        </div>

        <div className={styles.inputFields}>
          <p>郵便番号（ハイフンなし）</p>
          <InputField
            onChange={setPostalCode}
            value={postalCode}
            type="number"
            width="171px"
          />
        </div>

        <div className={styles.inputFields}>
          <p>都道府県</p>
          <SelectionComponent options={prefecturesOptions} setSelected={setPrefectures}/>
        </div>

        <div className={styles.inputFields}>
          <p>市区町村</p>
          <InputField onChange={setCity} value={city} />
        </div>

        <div className={styles.inputFields}>
          <p>所番地</p>
          <InputField onChange={setAddress} value={address} />
        </div>

        <div className={styles.inputFields}>
          <p>建物名、部屋番号（任意）</p>
          <InputField onChange={setBuildingName} value={buildingName} />
        </div>

        <ButtonComponent width="385px" label="次へ" onClick={()=>{}}/>
      </div>
    </form>
  );
};

export default AdditionalInfo;
