import React from 'react';
import { DropZone, ModernDatePicker, TextInput } from 'components/common/Form';
import { TwoColumn } from 'components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';

interface Props {
  values: any;
}
const FileComponent = ({ values }: Props) => {
  return (
    <>
      <TwoColumn>
        <TextInput
          name="fileLicenseNumber"
          value={values.fileLicenseNumber}
          placeholder="شماره مجوز فایل"
          lableText="شماره مجوز فایل"
          significant
        />

        <ModernDatePicker
          name="fileLicenseDate"
          lableText="تاریخ مجوز فایل"
          placeholder="تاریخ مجوز فایل"
          hasMaximum={false}
          initialValue={values.fileLicenseDate}
        />
      </TwoColumn>
      <DropZone lableText="انتخاب فایل" name="file" significant isSingle />
      <TextInput
        name="fileDescription"
        value={values.fileDescription}
        placeholder="توضیحات فایل"
        lableText="توضیحات فایل"
        significant
      />
    </>
  );
};

export default FileComponent;
