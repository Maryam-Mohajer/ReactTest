import { UniversityLabel, UniversityValue } from 'core/enums/university.enum';

export const UniversityData = [
  {
    label: 'انتخاب کنید..',
    options: [
      { value: UniversityValue.Tehran, label: UniversityLabel[UniversityValue.Tehran] },
      { value: UniversityValue.ShahidBeheshti, label: UniversityLabel[UniversityValue.ShahidBeheshti] },
      { value: UniversityValue.KhajeNasir, label: UniversityLabel[UniversityValue.KhajeNasir] },
      { value: UniversityValue.Esfahan, label: UniversityLabel[UniversityValue.Esfahan] },
      { value: UniversityValue.Mazandaran, label: UniversityLabel[UniversityValue.Mazandaran] },
      { value: UniversityValue.NoshirvaniBabol, label: UniversityLabel[UniversityValue.NoshirvaniBabol] },
      { value: UniversityValue.Sari, label: UniversityLabel[UniversityValue.Sari] },
    ],
  },
];
