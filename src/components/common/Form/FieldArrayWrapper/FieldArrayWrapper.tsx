import React, { FC, useState } from "react";
import { FieldArray } from "formik";
import { SimpleSubmitButton } from "../SubmitButtonComponent/SimpleSubmitBtn/SimpleSubmitButton";
import { FormDivider } from "../FormDivider/FormDivider";
import XButton from "components/common/Buttons/XButton/XButton";
import { SweetAlertCallback } from "components/common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IProps {
  children: (index: number) => JSX.Element;
  values: any;
  name: string;
  initialValues: any;
  addBtnTitle: string;
  title: string;
}

const FieldArrayWrapper: FC<IProps> = ({
  children,
  name,
  values,
  initialValues,
  addBtnTitle,
  title,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [arrayHelpersItems, setArrayHelpersItems] = useState<any>(null);

  return (
    <>
      <SweetAlertCallback
        mutation={() => {}}
        title=""
        onCancel={() => {
          setShowDeleteConfirmation(false);
        }}
        onClose={() => {
          setShowDeleteConfirmation(false);
        }}
        onConfirm={() => {
          arrayHelpersItems.remove(selectedItem.index);
          setShowDeleteConfirmation(false);
        }}
        show={showDeleteConfirmation}
      >
        آیا از پاک کردن این داده مطمئنید؟
      </SweetAlertCallback>

      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {values[name] && values[name].length > 0 ? (
              values[name].map((friend: any, index: any) => (
                <div key={index}>
                  <FormDivider textHeader={title}>
                    <XButton
                      onClick={() => {
                        setSelectedItem({
                          id: friend.id,
                          index: index,
                        });
                        setArrayHelpersItems(arrayHelpers);
                        setShowDeleteConfirmation(true);
                      }}
                    />
                    {children(index)}
                  </FormDivider>
                  {arrayHelpers.form.values[name].length - 1 > +index && <hr />}
                </div>
              ))
            ) : (
              <SimpleSubmitButton
                isLoading={false}
                type="button"
                className="mb-1"
                outLine
                onCLick={() => arrayHelpers.push(initialValues)}
                btnText={addBtnTitle}
              />
            )}
            {arrayHelpers.form.values[name].length > 0 && (
              <SimpleSubmitButton
                isLoading={false}
                type="button"
                className="mb-1"
                outLine
                onCLick={() =>
                  arrayHelpers.insert(
                    arrayHelpers.form.values[name].length,
                    initialValues
                  )
                }
                btnText={addBtnTitle}
              />
            )}
          </>
        )}
      />
    </>
  );
};

export default FieldArrayWrapper;
