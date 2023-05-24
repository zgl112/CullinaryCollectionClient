import React from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
  text?: string;
}
const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  const {data,statusText} = error;

  return (
    <Message error>
      <Message.Header>{statusText}</Message.Header>
      {data > 0 && (
        <Message.List>
          {
            data.status.map((a:number, i:number) => (
              <Message.Item key={i}>{!a}</Message.Item>
            ))}
        </Message.List>
      )}
      {text && <Message.Content content={text} />}
    </Message>
  );
};
export default ErrorMessage;
