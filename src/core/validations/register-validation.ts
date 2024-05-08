import { isPersian } from "./../utils/regex.utils";
import * as Yup from "yup";
import { PersianToEnglish } from "../utils/persian-to-english-number.utils";

export const checkNumber = (value: string | undefined | null): boolean => {
  if (value === undefined || value === null) {
    return false;
  }
  value = PersianToEnglish(value);
  var patt = new RegExp(`^09[0-9]{2}[0-9]{7}$`);
  return patt.test(value);
};

export const registerValidation = Yup.object({
  // email: Yup.string()
  //   .email()
  //   .required("ایمیل وارد شده اشتباه است!")
  //   .typeError("ایمیل وارد شده اشتباه است!"),

  // username: Yup.string()
  //   .required("نام کاربری را وارد کنید!")
  //   .typeError("نام کاربری را وارد کنید!"),

  // password: Yup.string()
  //   .required("لطفا رمز عبور خود را وارد کنید ")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
  //     `
  //   رمز عبور خود را بیشتر از هشت کاراکتر انتخاب کنید
  //   رمز عبور باید شامل عدد , حروف بزرگ , کوچک و کاراکتر های خاص باشد `
  //   )
  //   .typeError("لطفا رمز عبور را وارد کنید"),
  // passwordRepeat: Yup.string()
  //   .required("لطفا تکرار رمز عبور را وارد کنید")
  //   .test("passwordRepeat", "تکرار رمز عبور نادرست است", function (value) {
  //     return this.parent.password === value;
  //   })
  //   .typeError("لطفا رمز عبور را درست وارد کنید"),

  nationalId: Yup.string().required("لطفا کد ملی خود را وارد کنید"),
  phoneNumber: Yup.string().required("لطفا شماره تلفن خود را وارد کنید"),
});
