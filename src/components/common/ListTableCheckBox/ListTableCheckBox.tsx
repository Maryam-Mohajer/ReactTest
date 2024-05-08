import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import * as FileSaver from "file-saver";
import { Button, Col, FormGroup, Table } from "reactstrap";
import { ChevronLeft, ChevronRight, Download } from "react-feather";

import { NotFoundData } from "../NotFoundData";
import { SelectOption } from "../SelectOption";
import XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { FullOption } from "../../../core/models";
import { OptionRow } from "../../../core/models";
import { ExportModal } from "./ExportModal/ExportModal";
import { ComponentSpinner } from "../Spinner/LoadingSpinner";

import Styled from "./ListTableCheckBox.module.scss";
import "jspdf-autotable";
import { jsPdfFont } from "../../../core/data/IRANSansWeb-normal";

interface IPageChange {
  page: number;
  pageSize: number;
}

interface IPropTypes {
  isLoading: boolean;
  tableData: any;
  columns: any;
  children?: {
    headerTable?: ReactNode;
  };
  isSccess?: boolean;
  pageCountList: number;
  customPageSize?: number;
  setPageSize?: (val: number) => void;
  onPageChange: ({ page, pageSize }: IPageChange) => void;
  getCustomProps?: any; // {props1:... , prop2:...}
  setInitialPage?: (val: number) => void;
  initialPage?: number;
  showPrint?: boolean;
  selOrientation?: boolean;
  checkBoxContainerIndex: any;
  setcheckBoxContainerIndex: any;
  setCheckBoxContainerRefresh: any;
  checkBoxContainerRefresh: any;
  checkBoxContainerContent: any;
  setCheckBoxContainerContent: any;
}

const ListTableCheckBox: React.FC<IPropTypes> = ({
  isLoading,
  tableData,
  columns,
  children,
  pageCountList,
  customPageSize,
  onPageChange,
  setPageSize,
  getCustomProps,
  isSccess,
  setInitialPage = (val: any) => {},
  initialPage = 0,
  showPrint,
  selOrientation,
  checkBoxContainerIndex,
  setcheckBoxContainerIndex,
  setCheckBoxContainerRefresh,
  checkBoxContainerRefresh,
  checkBoxContainerContent,
  setCheckBoxContainerContent,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 900,
    }),
    []
  );
  const defaultData = React.useMemo(() => [], []);
  const customNewPageSize: any = { pageSize: 20000 };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  }: any = useTable(
    {
      columns,
      data: isLoading ? defaultData : tableData ? tableData : [],
      defaultColumn,
      initialState: customNewPageSize,
    },
    useResizeColumns,
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const tableRef: any = useRef();

  //#########################################################################
  let checkBoxContainerContentTemp: any = [];
  let defaultCheckedContentTemp: any = [];
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedAllFalse, setIsCheckedAllFalse] = useState(false);

  /////////////////////////////////////////////////////DefaultTrue
  useEffect(() => {
    if (page && page.length > 0) {
      const checkBoxDefaultContentTemp: any = [];
      if (checkBoxContainerIndex && checkBoxContainerIndex.length > 0) {
        checkBoxContainerIndex.map((i: number) => {
          if (page && page[i] && page[i].original && page[i].original) {
            const content = page[i].original;
            content['indexTrue']=i
            checkBoxDefaultContentTemp.push( content);
          }
        });
      }
      setCheckBoxContainerContent(checkBoxDefaultContentTemp);
      setCheckBoxContainerRefresh(!checkBoxContainerRefresh);
    }
  }, [page]);

  /////////////////////////////////////////////////////handleOnChange
  const handleOnChange = (
    index: any
    // , content: any
  ) => {
    checkBoxContainerContentTemp = checkBoxContainerContent;
    // let s = checkBoxContainerContentTemp.filter((e: any) => e.indexTrue >1);
    // console.log("sssssssssss", s);

    let exist = false;
    checkBoxContainerContentTemp.map((item: any, index2: number) => {
      /////اگر وجود داشت حذف کن
      if (item.indexTrue == index) {
        exist = true;
        checkBoxContainerContentTemp.splice(index2, 1);
        return;
      }
    });

    /////اگر وجود نداشت اضافه کن
    if (page && page.length > 0) {
      if (!exist) {
        const content = page[index].original;
        content['indexTrue']= index
        checkBoxContainerContentTemp.push(content);
      }
    }

    /////index
    let checkBoxContainerTemp: any;
    checkBoxContainerTemp = checkBoxContainerIndex;

    if (!checkBoxContainerTemp.includes(index)) {
      checkBoxContainerTemp.push(index);
    } else {
      const Arryindex = checkBoxContainerTemp.indexOf(index);
      if (index > -1) {
        checkBoxContainerTemp.splice(Arryindex, 1);
      }
    }
    setCheckBoxContainerContent(checkBoxContainerContentTemp);
    setcheckBoxContainerIndex(checkBoxContainerTemp);
    setCheckBoxContainerRefresh(!checkBoxContainerRefresh);
  };

  /////////////////////////////////////////////////////handleOnChangeSelactAll
  const handleOnChangeSelactAll = () => {
    if (page && page.length > 0) {
      setIsChecked(!isChecked);
      setIsCheckedAllFalse(true);
    }
  };

  useEffect(() => {
    if (isChecked) {
      if (page && page.length > 0) {
        let checkBoxContainerTemp = [];

        for (let i = 0; i < page.length; i++) {
          checkBoxContainerTemp.push(i);
          const content = page[i].original;
          content['indexTrue']= i
          checkBoxContainerContentTemp.push(content);
        }

        setCheckBoxContainerContent(checkBoxContainerContentTemp);
        setcheckBoxContainerIndex(checkBoxContainerTemp);
        setIsCheckedAll(!isCheckedAll);
        setCheckBoxContainerRefresh(!checkBoxContainerRefresh);
      }
    }
  }, [isChecked]);

  useEffect(() => {
    if (!isChecked && isCheckedAllFalse) {
      let checkBoxContainerTemp: any = [];

      setCheckBoxContainerContent([]);
      setcheckBoxContainerIndex(checkBoxContainerTemp);
      setIsCheckedAll(!isCheckedAll);
      setCheckBoxContainerRefresh(!checkBoxContainerRefresh);
    }
  }, [isChecked]);
  //#########################################################################
  const pageSizeItem: FullOption[] = [
    {
      label: "اندازه صفحه",
      options: [
        {
          id: "4",
          title: "4",
        },
        {
          id: "6",
          title: "6",
        },
        {
          id: "8",
          title: "8",
        },
        {
          id: "10",
          title: "10",
        },
      ],
    },
  ];

  const [exportModal, setExportModal] = useState(false);

  const handleExport = (fileName: string, fileFormat: any) => {
    const bookType = fileFormat;
    const wbObj: any = {
      sheet: "اطلاعات",
    };
    const wb = XLSX.utils.table_to_book(tableRef.current, wbObj);
    const wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" });

    const s2ab = (s: any) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };
    const file = fileName.length
      ? `${fileName}.${fileFormat}`
      : `excel-sheet.${fileFormat}`;

    return FileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      file
    );
  };

  const exportPDF = (fileName: string) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    //const orientation = "portrait"; // portrait or landscape
    const orientation = selOrientation ? "landscape" : "portrait"; // portrait or landscape

    const marginLeft = 475;
    const doc: any = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "لیست اطلاعات";
    let headers: any = [[]];
    let data: any = [];

    // columns.reverse().forEach((item: any) => {
    //   if (
    //     !item.accessor.includes("action") &&
    //     !item.accessor.includes("operation")
    //   ) {
    //     data.push([]);
    //   }
    // });

    tableData.forEach((item: any) => {
      data.push([]);
    });

    columns.forEach((item: any) => {
      if (
        !item.accessor.includes("action") &&
        !item.accessor.includes("operation")
      ) {
        headers[0].push(item.Header);
      }
    });

    tableData.forEach((tableRow: any, index: any) => {
      columns.forEach((item: any) => {
        if (
          !item.accessor.includes("action") &&
          !item.accessor.includes("operation")
        ) {
          try {
            data[index].push(tableRow[item.accessor]);
          } catch (error) {}
        }
      });
    });

    doc.addFileToVFS("IRANSansWeb-normal.ttf", jsPdfFont);
    doc.addFont("IRANSansWeb-normal.ttf", "IRANSansWeb", "normal");

    doc.setFont("IRANSansWeb"); // set font

    doc.text(title, marginLeft, 40);
    doc.setFontSize(10);
    doc.autoTable({
      startY: 50,
      head: headers,
      theme: "grid",
      body: data,
      alternateRowStyles: { direction: "rtl" },
      styles: {
        fontSize: 9,
        font: "IRANSansWeb",
        direction: "rtl",
        halign: "center",
        cellPadding: 5,
      },
    });
    doc.save(fileName + ".pdf");
  };

  return (
    <Fragment>
      <ExportModal
        handleExport={handleExport}
        exportPDF={exportPDF}
        isOpen={exportModal}
        toggleModal={() => setExportModal(false)}
      />
      {/* <Col
        className={`d-flex justify-content-between align-items-center ${Styled["header-style"]} p-0`}
      >
        {children?.headerTable}

        {setPageSize && (
          <FormGroup className="d-flex">
            <SelectOption
              isClearable={false}
              options={pageSizeItem}
              onChange={(value: OptionRow) => {
                setInitialPage(0);
                setPageSize(+value.id);
              }}
              selectType={1}
              defaultValue={{
                id: String(customPageSize),
                title: String(customPageSize),
              }}
            />
            <Button
              style={{ marginRight: "10px" }}
              color="primary"
              outline
              onClick={() => setExportModal(true)}
            >
              <Download size={15} />
            </Button>
          </FormGroup>
        )}
        {showPrint && (
          <FormGroup className="d-flex justify-content-end w-100">
            <Button
              style={{ marginRight: "10px" }}
              color="primary"
              outline
              onClick={() => setExportModal(true)}
            >
              <Download size={15} />
            </Button>
          </FormGroup>
        )}
      </Col> */}
      <Col>
        <input
          style={{ margin: "15px" }}
          type="checkbox"
          id="f"
          name="topping"
          value="Paneer"
          checked={isChecked}
          onChange={() => handleOnChangeSelactAll()}
          // defaultChecked={}
          // checked={}
          // value={}
          // disabled={}
          // onClick={}
          // onChange={}
        />
        انتخاب همه
      </Col>
      <Table
        innerRef={tableRef}
        className="rounded position-relative overflow-hidden"
        bordered
        {...getTableProps()}
        hover
        striped
        responsive
      >
        <thead className="table-header">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "50px" }}
                >
                  <span>انتخاب</span>
                </div>
              </th>

              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="d-flex justify-content-center align-items-center">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? (
          <ComponentSpinner isRelative={true} />
        ) : tableData && tableData.length > 0 ? (
          <tbody
            {...getTableBodyProps()}
            className="position-relative overflow-hidden"
          >
            {/* ######################################################################### */}
            {!isCheckedAll &&
              page.map((row: any, index: any) => {
                let defaultCheckedTemp: any;
                if (isCheckedAll) {
                  defaultCheckedTemp = true;
                } else if (checkBoxContainerIndex.includes(index)) {
                  defaultCheckedTemp = true;
                } else {
                  defaultCheckedTemp = false;
                }
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    <td
                      style={{ width: "80px" }}
                      className={`text-center  ${Styled["text-centered"]} ${Styled["no-border"]}`}
                    >
                      <input
                        type="checkbox"
                        id={index}
                        name="topping"
                        value="Paneer"
                        onChange={() =>
                          handleOnChange(
                            index
                            // , row.cells[index].column.filteredRows[index].original
                          )
                        }
                        defaultChecked={defaultCheckedTemp}
                        // checked={}
                        // defaultChecked={}
                        // checked={}
                        // value={}
                        // disabled={}
                        // onClick={}
                        // onChange={}
                      />
                    </td>
                    {/* {console.log('wwwwwwww', row.cells[index].column.filteredRows[index].original)} */}
                    {row.cells.map((cell: any) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`text-center ${Styled["text-centered"]} ${
                            cell.row.original.hasBetweenVal &&
                            Styled["no-border"]
                          }`}
                        >
                          {cell.render("Cell", {
                            ...getCustomProps,
                            setInitialPage: setInitialPage,
                          })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            {isCheckedAll &&
              page.map((row: any, index: any) => {
                let defaultCheckedTemp: any;
                if (isCheckedAll) {
                  defaultCheckedTemp = true;
                } else if (checkBoxContainerIndex.includes(index)) {
                  defaultCheckedTemp = true;
                  defaultCheckedContentTemp.push();
                } else {
                  defaultCheckedTemp = false;
                }
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    <td
                      style={{ width: "80px" }}
                      className={`text-center  ${Styled["text-centered"]} ${Styled["no-border"]}`}
                    >
                      <input
                        type="checkbox"
                        id={index}
                        name="topping"
                        value="Paneer"
                        onChange={() =>
                          handleOnChange(
                            index
                            // , 5
                          )
                        }
                        defaultChecked={defaultCheckedTemp}
                      />
                    </td>
                    {row.cells.map((cell: any) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`text-center ${Styled["text-centered"]} ${
                            cell.row.original.hasBetweenVal &&
                            Styled["no-border"]
                          }`}
                        >
                          {cell.render("Cell", {
                            ...getCustomProps,
                            setInitialPage: setInitialPage,
                          })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        ) : (
          <NotFoundData />
        )}
      </Table>
      {pageCountList > 1 && (
        <div
          className={`text-center`}
          style={isLoading ? { display: "none" } : {}}
        >
          <ReactPaginate
            previousLabel={
              <span className={`${Styled["page-prev"]}`}>
                <ChevronRight size={15} />
              </span>
            }
            nextLabel={
              <span className={`${Styled["page-prev"]}`}>
                <ChevronLeft size={15} />
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCountList}
            containerClassName={`disabled-pagination-btn ${Styled["pagination-holder"]}`}
            activeClassName={`${Styled["page-active"]}`}
            forcePage={initialPage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page: any) => {
              setInitialPage(page.selected);
              onPageChange({
                page: page.selected + 1,
                pageSize: customPageSize ? customPageSize : 10,
              });
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export { ListTableCheckBox };
