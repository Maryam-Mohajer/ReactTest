import { DropZone } from 'components/common/Form/DropZone/DropZone';
import { TextInput } from 'components/common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import { TwoColumn } from 'components/common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';
import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { ModalBody } from 'reactstrap';
import { Modal } from 'reactstrap';
import { Button } from 'reactstrap';
interface props {
  values: any;
  isOpen:boolean
}
const Actions = ({ values }: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isOpen && (
        <>
          <Modal>
            <ModalBody>
              <TwoColumn>
                <TextInput
                  name="fileLicenseNumber"
                  value={values.fileLicenseNumber}
                  placeholder="شماره مجوز فایل"
                  lableText="شماره مجوز فایل"
                  significant
                  // onChange={handleChange}
                />
                <TextInput
                  name="fileLicenseDate"
                  value={values.fileLicenseDate}
                  placeholder="تاریخ مجوز فایل"
                  lableText="تاریخ مجوز فایل"
                  significant
                  // onChange={handleChange}
                />
              </TwoColumn>
              <TwoColumn>
                <TextInput
                  name="fileDescription"
                  value={values.fileDescription}
                  placeholder="توضیحات فایل"
                  lableText="توضیحات فایل"
                  significant
                  // onChange={handleChange}
                />
                <DropZone
                  lableText="انتخاب فایل"
                  name="file"
                  significant
                  // onChange={(file:any) => setFieldValue('file', file)}
                />
              </TwoColumn>
            </ModalBody>
          </Modal>
        </>
      )}
      <button
        color={'primary'}
        onClick={() => {
          console.log('click');

          setIsOpen(true);
        }}
      >
        بارگذاری اسناد
      </button>
    </>
  );
};

export default Actions;

// import { Modal, ModalBody, ModalHeader } from 'reactstrap';

// interface IPropTypes {
//   isOpen: boolean;
//   toggleModal: () => void;
//   backdrop: boolean;
//   data?: any;
//   isSingle?: boolean;
//   name?: string;
//   accept?: string;
//   removeServedFiles?: () => void;
//   values: any;
// }

// const SelectModal: React.FC<IPropTypes> = ({
//   isOpen,
//   toggleModal,
//   name,
//   backdrop,
//   data,
//   accept,
//   isSingle,
//   removeServedFiles,
//   values,
// }) => {
//   return (
//     <>
//       <Button color={'primary'} outLine onClick={() => setIsOpen(true)}>
//         بارگذاری اسناد
//       </Button>
//       <Modal isOpen={isOpen} toggle={toggleModal} className="modal-dialog-centered" backdrop={backdrop}>
//         {/* <ModalHeader toggle={toggleModal}>انتخاب اسناد</ModalHeader> */}
//         <ModalBody>
//           <TwoColumn>
//             <TextInput
//               name="fileLicenseNumber"
//               value={values.fileLicenseNumber}
//               placeholder="شماره مجوز فایل"
//               lableText="شماره مجوز فایل"
//               significant
//               // onChange={handleChange}
//             />
//             <TextInput
//               name="fileLicenseDate"
//               value={values.fileLicenseDate}
//               placeholder="تاریخ مجوز فایل"
//               lableText="تاریخ مجوز فایل"
//               significant
//               // onChange={handleChange}
//             />
//           </TwoColumn>
//           <TwoColumn>
//             <TextInput
//               name="fileDescription"
//               value={values.fileDescription}
//               placeholder="توضیحات فایل"
//               lableText="توضیحات فایل"
//               significant
//               // onChange={handleChange}
//             />
//             <DropZone
//               lableText="انتخاب فایل"
//               name="file"
//               significant
//               // onChange={(file:any) => setFieldValue('file', file)}
//             />
//           </TwoColumn>
//           <DropZone
//             removeServedFiles={removeServedFiles}
//             toggleModal={toggleModal}
//             isSingle={isSingle}
//             name={name ? name : 'files'}
//             accept={accept}
//           />
//         </ModalBody>
//       </Modal>
//     </>
//   );
// };

// export { SelectModal };
