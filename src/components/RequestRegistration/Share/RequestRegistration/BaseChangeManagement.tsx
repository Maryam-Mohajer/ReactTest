import { MultiSelectOption } from 'components/common/Form';
import { TextInput } from 'components/common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import BasicSelectOption from 'components/common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { TwoColumn } from 'components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';
import { BaseChangesEnum } from 'core/enums/basic-changes.enum';
import { useGetAllJobByMultiUseType } from 'core/services/api/jobs.api';
import { useGetAllCityOrRuralTitles } from 'core/services/api/location.api';
import React, { useState } from 'react';
import { useGetFieldData } from './useGetFieldData';
import { CanRenderByPath } from 'components/common/Wrapper/CanRenderByPath/CanRenderByPath';

interface Props {
  values: any;
  setFieldValue: any;
  UseTypeMutation?: any;
  countyMutation?: any;
  unionMutation?: any;
}
const BaseChangeManagement = ({ values, setFieldValue, UseTypeMutation, countyMutation, unionMutation }: Props) => {
  const CountyAdminUrls = ['/Registration/CountyAdmin'];
  const unionAdminUrls = ['/Registration/UnionAdmin'];

  const getCityOrRural = useGetAllCityOrRuralTitles();
  const getAllJobs = useGetAllJobByMultiUseType();

  const [cityOrRural, setCityOrRural] = useState([]);
  const [jobs, setJobs] = useState([]);

  const countyRoom = useGetFieldData(countyMutation, 'id', 'countyTitle');
  const useTypes = useGetFieldData(UseTypeMutation, 'id', 'title');
  const countyUnion = useGetFieldData(unionMutation, 'unionId', 'unionTitle', 'unions');


  const handleSelectedCounty = (county: any, setFieldValue: any) => {
    setFieldValue('county', county);
    if (county.value) {
      getCityOrRural.mutate([county.value], {
        onSuccess: (data: any) => {
          const result = data?.data.result;
          if (result) {
            const cityOrRural: any = [];
            result.map((item: any) => cityOrRural.push({ value: item.id, label: item.title }));
            setCityOrRural(cityOrRural);
          }
        },
        onError: (error: any) => {
          console.error('Error:', error);
        },
      });
    }
  };

  const handleSelectedUseTypes = (useTypes: any, setFieldValue: any) => {
    setFieldValue('useTypes', useTypes);
    if (useTypes.length > 0) {
      const selectedUseTypeIds: any = [];
      useTypes.map((useType: any) => selectedUseTypeIds.push(useType.value));
      getAllJobs.mutate(selectedUseTypeIds, {
        onSuccess: (data: any) => {
          const jobsInfo: any = [];
          if (data && data.data) {
            const jobsResult = data.data.result;
            jobsResult.map((job: any) => jobsInfo.push({ value: job.id, label: job.title }));
          }
          setJobs(jobsInfo);
        },
      });
    }
  };

  return (
    <div>
      {values.baseChanges.map((baseChange: any) =>
        baseChange.value === BaseChangesEnum.LicenseRequest ? (
          <TwoColumn>
            <TextInput
              name="licenseRequest"
              value={values.licenseRequest}
              placeholder="شناسه درخواست"
              lableText="شناسه درخواست"
              significant
            />
          </TwoColumn>
        ) : (
          (baseChange.value === BaseChangesEnum.MainLocationDivision && (
            <>
              <CanRenderByPath url={CountyAdminUrls}>
                <TwoColumn>
                  <BasicSelectOption
                    name="county"
                    data={countyRoom}
                    placeHolder="یک گزینه انتخاب نمایید"
                    lableText="شهرستان"
                    onChange={(county) => {
                      handleSelectedCounty(county, setFieldValue);
                    }}
                    isLoading={countyMutation?.isLoading}
                  />
                  <BasicSelectOption
                    name="cityOrVillage"
                    data={cityOrRural}
                    placeHolder="یک گزینه انتخاب نمایید"
                    lableText="شهر/روستا"
                    isLoading={getCityOrRural.isLoading}
                  />
                </TwoColumn>
              </CanRenderByPath>
              <CanRenderByPath url={unionAdminUrls}>
                <TwoColumn>
                  <BasicSelectOption
                    name="countyUnion"
                    data={countyUnion}
                    placeHolder="یک گزینه انتخاب نمایید"
                    lableText="اتحادیه"
                    isLoading={unionMutation?.isLoading}
                  />
                </TwoColumn>
              </CanRenderByPath>
            </>
          )) ||
          (baseChange.value === BaseChangesEnum.UseType && (
            <>
              <TwoColumn>
                <MultiSelectOption
                  name="useTypes"
                  options={useTypes}
                  placeHolder="یک گزینه انتخاب نمایید"
                  significant
                  hasLabel
                  labelText="نوع کاربری"
                  onChange={(useTypes: any) => {
                    handleSelectedUseTypes(useTypes, setFieldValue);
                  }}
                  isLoading={UseTypeMutation?.isLoading}
                />
                <MultiSelectOption
                  name="jobs"
                  options={jobs}
                  placeHolder="یک گزینه انتخاب نمایید"
                  hasLabel
                  labelText="شغل"
                  significant
                  isLoading={getAllJobs.isLoading}
                />
              </TwoColumn>
            </>
          ))
        ),
      )}
    </div>
  );
};

export default BaseChangeManagement;
