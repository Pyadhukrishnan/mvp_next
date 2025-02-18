"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import styles from "./id-verification.module.css";
import SelectionComponent from "@/themes/components/selection-component/selection-component";
import { Options } from "@/interfaces/user";
import ButtonComponent from "@/themes/components/button-component/button-component";

// Extended File interface with preview URL
interface FileWithPreview {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

const IdVerification: React.FC = () => {
  // ID options for selection
  const idOptions: Options[] = [
    { label: "運転免許証", value: "Driver's License" },
    { label: "パスポート", value: "Passport" },
    { label: "住民基本台帳カード", value: "Basic Resident Register Card" },
    { label: "マイナンバーカード", value: "My Number Card" },
    { label: "健康保険証", value: "Health Insurance Card" },
    { label: "外国人登録証", value: "Alien Registration Card" },
    { label: "学生証", value: "Student ID Card" },
    { label: "社員証", value: "Employee ID Card" },
    { label: "年金手帳", value: "Pension Handbook" },
    { label: "公的身分証明書", value: "Public Identity Card" },
  ];

  // State variables
  const [selectedId, setSelectedId] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Function to handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      
      // Create FileWithPreview objects
      const filesWithPreviews: FileWithPreview[] = filesArray.map(file => {
        return {
          file: file,
          preview: file.type.startsWith('image/') 
            ? URL.createObjectURL(file) 
            : getFileIconByType(file.type),
          name: file.name,
          size: file.size,
          type: file.type
        };
      });
      
      setUploadedFiles(prevFiles => [...prevFiles, ...filesWithPreviews]);
      
      // Reset the file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Helper function to get appropriate icon for file type
  const getFileIconByType = (fileType: string): string => {
    if (fileType.includes('pdf')) {
      return '/icons/pdf-icon.svg';
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return '/icons/doc-icon.svg';
    } else if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('xls')) {
      return '/icons/xls-icon.svg';
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation') || fileType.includes('ppt')) {
      return '/icons/ppt-icon.svg';
    } else if (fileType.includes('text') || fileType.includes('txt')) {
      return '/icons/txt-icon.svg';
    } else {
      return '/icons/file-icon.svg';
    }
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((fileWithPreview) => {
        // Only revoke if it's an actual object URL (not our static icon paths)
        if (fileWithPreview.preview.startsWith('blob:')) {
          URL.revokeObjectURL(fileWithPreview.preview);
        }
      });
    };
  }, [uploadedFiles]);

  // Function to trigger file input click
  const handleAddButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to remove a file
  const createRemoveHandler = (index: number) => () => {
    setUploadedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      // Revoke object URL for the file being removed if it's an image preview
      if (newFiles[index].preview.startsWith('blob:')) {
        URL.revokeObjectURL(newFiles[index].preview);
      }
      return newFiles.filter((_, i) => i !== index);
    });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Here you would typically send the data to your server
    console.log("Selected ID:", selectedId);
    console.log("Uploaded Files:", uploadedFiles.map(f => ({
      name: f.name,
      size: f.size,
      type: f.file.type
    })));
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Check if form is valid to enable submission
  const isFormValid: boolean = selectedId !== "" && uploadedFiles.length > 0;

  return (
    <form
      className={styles.idVerificationForm}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className={styles.header}>
        <h2>e.g.) 本人確認証 / ID</h2>
        <p>必要に応じて説明書きを追加する / description</p>
      </div>
      <div className={styles.formFields}>
        <div className={styles.inputField}>
          <p>パスワード</p>
          <SelectionComponent
            options={idOptions}
            setSelected={setSelectedId}
            width="100%"
          />
        </div>
        <div className={styles.description}>
          <p>
            This section assumes a table time for explanatory text suitable for
            submissions.
          </p>
          <p>
            e.g)
            本人確認書類がぼやけていたり、光が反射して文字が判読できない場合、再撮影をお願いする場合があります。提出前に必ず撮影画像のご確認を行なってください。撮影した画像をタップすると拡大表示されます。
          </p>
        </div>

        {/* Hidden file input - updated to accept both images and documents */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          multiple
        />

        {/* Display uploaded files with previews */}
        {uploadedFiles.length > 0 && (
          <div className={styles.uploadedFiles}>
            <ul className={styles.fileList}>
              {uploadedFiles.map((fileWithPreview, index) => (
                <li key={index} className={styles.filePreviewItem}>
                  <div className={styles.fileInfo}>
                    <div className={styles.imagePreviewContainer}>
                      {fileWithPreview.file.type.startsWith('image/') ? (
                        <img
                          src={fileWithPreview.preview}
                          alt={`Preview of ${fileWithPreview.name}`}
                          className={styles.imagePreview}
                        />
                      ) : (
                        <div className={styles.documentPreview}>
                          <img
                            src={fileWithPreview.preview}
                            alt={`Icon for ${fileWithPreview.name}`}
                            className={styles.documentIcon}
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.fileDetails}>
                      <span className={styles.fileName}>
                        {fileWithPreview.name}
                      </span>
                      <span className={styles.fileSize}>
                        {formatFileSize(fileWithPreview.size)}
                      </span>
                      <span className={styles.fileType}>
                        {fileWithPreview.file.type || "Unknown type"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={createRemoveHandler(index)}
                    className={styles.removeButton}
                    aria-label="Remove file"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show add button if no files uploaded */}
        {uploadedFiles.length === 0 && (
          <ButtonComponent
            theme="outline"
            label={
              <div className={styles.buttonLabel}>
                <img src="/icons/plus.svg" alt="" />
                <span>新しい資格証を追加</span>
              </div>
            }
            width="159px"
            onClick={handleAddButtonClick}
          />
        )}
      </div>
      <ButtonComponent
        label="申し込む"
        disabled={!isFormValid}
        onClick={() => {
          
        }}
      />
    </form>
  );
};

export default IdVerification;