"use client";
import React, { useState } from "react";
import styles from "./additional-info.module.css";
import InputField from "@/themes/components/input-field/input-field";
import DatePicker from "@/themes/components/date-picker/date-picker";
import ButtonComponent from "@/themes/components/button-component/button-component";
import { Options } from "@/interfaces/user";
import RadioButtons from "@/themes/components/radio-buttons/radio-buttons";
import SelectionComponent from "@/themes/components/selection-component/selection-component";

/**
 * AdditionalInfo Component
 * 
 * This component renders a form to collect additional user information,
 * including personal details, address, and demographic data.
 *
 * @returns {JSX.Element} The AdditionalInfo form component.
 */
const AdditionalInfo: React.FC = () => {
  // State variables for form fields
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [prefectures, setPrefectures] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [buildingName, setBuildingName] = useState<string>("");

  /**
   * Gender options for selection
   */
  const genderOptions: Options[] = [
    { label: "男性", value: "男性" }, // Male
    { label: "女性", value: "女性" }, // Female
    { label: "その他", value: "その他" }, // Other
    { label: "回答なし", value: "回答なし" } // No Answer
  ];

  /**
   * Prefecture options for selection
   */
  const prefecturesOptions: Options[] = [
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
  ];

  

  return (
    <form className={styles.additionalFormWrapper}>
      <div className={styles.header}>
        <h2>サービス利用申し込み</h2>
        <p>必要に応じて説明書きを追加する / description</p>
      </div>
      <div className={styles.formFields}>
        {/* Name Input Field */}
        <div className={styles.inputFields}>
          <p>氏名</p>
          <InputField onChange={setName} value={name} />
        </div>

        {/* User ID Input Field */}
        <div className={styles.inputFields}>
          <p>ユーザーID</p>
          <InputField onChange={setUserId} value={userId} />
        </div>

        {/* Date of Birth Picker */}
        <div className={styles.inputFields}>
          <p>生年月日</p>
          <DatePicker onChange={setDob} />
        </div>

        {/* Gender Selection */}
        <div className={styles.inputFields}>
          <p>性別</p>
          <RadioButtons onSelect={setGender} options={genderOptions} />
        </div>

        {/* Postal Code Input Field */}
        <div className={styles.inputFields}>
          <p>郵便番号（ハイフンなし）</p>
          <InputField
            onChange={setPostalCode}
            value={postalCode}
            type="number"
            width="171px"
          />
        </div>

        {/* Prefecture Selection */}
        <div className={styles.inputFields}>
          <p>都道府県</p>
          <SelectionComponent options={prefecturesOptions} setSelected={setPrefectures} width="171px"/>
        </div>

        {/* City Input Field */}
        <div className={styles.inputFields}>
          <p>市区町村</p>
          <InputField onChange={setCity} value={city} />
        </div>

        {/* Address Input Field */}
        <div className={styles.inputFields}>
          <p>所番地</p>
          <InputField onChange={setAddress} value={address} />
        </div>

        {/* Building Name (Optional) Input Field */}
        <div className={styles.inputFields}>
          <p>建物名、部屋番号（任意）</p>
          <InputField onChange={setBuildingName} value={buildingName} />
        </div>

        {/* Submit Button */}
        <ButtonComponent width="385px" label="次へ" onClick={() => {}} />
      </div>
    </form>
  );
};

export default AdditionalInfo;
