import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {  ITickeDetails } from "../../../core/models";
import { refetchContext } from "../../../core/utils/context/EventContext";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";



const TicketDetails: FC = ({

}) => {

  const [details , setDetails ] = useState<ITickeDetails>({
    id: 0,
    createAt: "",
    isRead: false,
    text: "string",
    link: "",
    userId: 0
  })
  // const getDetailsMutation = useGetMyTicketById();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const {id} = useParams<{id:string}>();

  // useEffect(() => {
  //   getDetailsMutation.mutate(id, {
  //     onSuccess: (val: any) => {
  //       try {
  //         const detailsData = val.data.result;
  //         setDetails({
  //           id: detailsData.id,
  //           createAt: detailsData.createAt,
  //           isRead: detailsData.isRead,
  //           text: detailsData.text,
  //           link:detailsData.link ,
  //           userId : detailsData.userId
  //         });
  //         const newEvent = { ...refetchEvent };
  //         newEvent.unreadTickets = !newEvent.unreadTickets;
  //         setRefetchEvent(newEvent);
  //       } catch (e) {}
  //     },
  //   });
  // }, [id]);
  
  
  
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>جزئیات پیام</CardTitle>
        </CardHeader>
        <CardBody>
          {false ? (
            <FallBackSpinner setHeight={300} />
          ) : (
            <>
              <Row>
                <Col md="10">متن : {details.text}</Col>
                <Col md="2"> تاریخ : {details.createAt}</Col>
              </Row>
              {details.link ? (
                <>
                  {details.link.length > 0 && (
                    <Row>
                      <Col md="10">
                        پیوند :
                        <a href={details.link} target="_blank" rel="noreferrer">
                          {details.link}
                        </a>
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { TicketDetails };
