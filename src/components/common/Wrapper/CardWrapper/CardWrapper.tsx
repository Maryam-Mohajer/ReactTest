import * as React from "react";
import { CardHeader, CardTitle, CardBody, Card } from "reactstrap";

export interface IPropsTypes {
  text?: string;
  headerClassName?: string;
  titleClassName?: string;
  cardClassName?: string;
}

const CardWrapper: React.FC<IPropsTypes> = ({
  children,
  text,
  headerClassName,
  titleClassName,
  cardClassName,
}) => {
  return (
    <>
      <Card className={cardClassName}>
        <CardHeader className={headerClassName}>
          <CardTitle className={titleClassName}>{text}</CardTitle>
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </>
  );
};

export { CardWrapper };
