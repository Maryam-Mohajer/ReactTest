import { useState, useEffect } from 'react';

export const useGetFieldData = (getMutation: any, valueKey: any, titleKey: any, dataKey?: any) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (getMutation?.data && getMutation?.data.data) {
      const newArray: any = [];
      console.log(dataKey ? 'true' : 'false', 'dataKeyyy');

      const results = dataKey ? getMutation.data.data.result[dataKey] : getMutation.data.data.result;
      console.log(results, 'resultss_');

      if (results) {
        results.map((result: any) => newArray.push({ value: result[valueKey], label: result[titleKey] }));
      }
      setData(newArray);
    }
  }, [getMutation?.data, getMutation?.isSuccess, valueKey, titleKey, dataKey]);

  return data;
};

/******************************************************************************** */
const GetFieldData = (getMutation: any, dataMap: (result: any) => void) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (getMutation?.data && getMutation?.data.data) {
      const results = getMutation.data.data.result;
      const newArray = results.map(dataMap);
      setData(newArray);
    }
  }, [getMutation?.data, getMutation?.isSuccess]);

  return data;
};
export default GetFieldData;
