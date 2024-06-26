import { EnumModel, EnumRecord } from "../models/enum.model";

export enum EducationFiledNum {
  F1 = 1,
  F2 = 2,
  F3 = 3,
  F4 = 4,
  F5 = 5,
  F6 = 6,
  F7 = 7,
  F8 = 8,
  F9 = 9,
  F10 = 10,
  F12 = 12,
  F13 = 13,
  F14 = 14,
  F15 = 15,
  F16 = 16,
  F17 = 17,
  F18 = 18,
  F19 = 19,
  F21 = 21,
  F22 = 22,
  F23 = 23,
  F24 = 24,
  F25 = 25,
  F26 = 26,
  F27 = 27,
  F28 = 28,
  F29 = 29,
  F31 = 31,
  F32 = 32,
  F33 = 33,
  F34 = 34,
  F35 = 35,
}

export const EducationFiledNumInfos: EnumRecord<EducationFiledNum, EnumModel> =
  {
    [EducationFiledNum.F1]: { description: "برق" },
    [EducationFiledNum.F2]: { description: "مکانیک" },
    [EducationFiledNum.F3]: { description: "شیمی" },
    [EducationFiledNum.F4]: { description: "فیزیک" },
    [EducationFiledNum.F5]: { description: "عمران (راه و ساختمان )" },
    [EducationFiledNum.F6]: { description: "هنر و معماری" },
    [EducationFiledNum.F7]: { description: "کامپیوتر" },
    [EducationFiledNum.F8]: { description: "علوم سیاسی" },
    [EducationFiledNum.F9]: { description: "علوم اجتمایی" },
    [EducationFiledNum.F10]: { description: "علوم پزشکی" },
    [EducationFiledNum.F12]: { description: "علوم زیستی" },
    [EducationFiledNum.F13]: { description: "علوم ریاضی" },
    [EducationFiledNum.F14]: { description: "صنایع" },
    [EducationFiledNum.F15]: { description: "تاریخ" },
    [EducationFiledNum.F16]: { description: "جغرافیا" },
    [EducationFiledNum.F17]: { description: "علوم اقتصادی" },
    [EducationFiledNum.F18]: { description: "زبان شناسی" },
    [EducationFiledNum.F19]: { description: "زبان و ادبیات عرب" },
    [EducationFiledNum.F21]: { description: "زبان و ادبیات فارسی" },
    [EducationFiledNum.F22]: { description: "زبان و ادبیات خارجی" },
    [EducationFiledNum.F23]: { description: "آمار" },
    [EducationFiledNum.F24]: { description: "مواد و متالوژی" },
    [EducationFiledNum.F25]: { description: "مهندسی پزشکی" },
    [EducationFiledNum.F26]: { description: "حقوق" },
    [EducationFiledNum.F27]: { description: "روانشناسی" },
    [EducationFiledNum.F28]: { description: "فن آوری اطلاعات" },
    [EducationFiledNum.F29]: { description: "سایر رشته های علوم پایه" },
    [EducationFiledNum.F31]: { description: "سایر رشته های علوم انسانی" },
    [EducationFiledNum.F32]: { description: "سایر رشته های فنی مهندسی" },
    [EducationFiledNum.F33]: { description: "سایر رشته های علوم تجربی" },
    [EducationFiledNum.F34]: { description: "دبیری رشته های مختلف" },
    [EducationFiledNum.F35]: { description: "کشاورزی و منابع طبیعی" },
  };
