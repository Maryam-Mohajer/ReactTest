import * as Yup from "yup";

const AddRoleToUnionUserValidation = Yup.object().shape({
    union: Yup.object()
        .shape({
            value: Yup.number(),
            label: Yup.string().nullable(),
        })
        .required("این فیلد باید پر شود!")
        .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    roles: Yup.object()
        .shape({
            value: Yup.number(),
            label: Yup.string().nullable(),
        })
        .required("این فیلد باید پر شود!")
        .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

    cityOrVillage: Yup.array()
        .of(
            Yup.object().shape({
                value: Yup.number(),
                label: Yup.string().nullable(),
            })
        )
        .typeError("لفطا یکی از گزینه ها را انتخاب کنید!")
        .required("لطفا یکی از گزینه ها را انتخاب کنید!")
});

export { AddRoleToUnionUserValidation };