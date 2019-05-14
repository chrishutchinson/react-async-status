import * as React from "react";

export type Status = "none" | "pending" | "success" | "error";

const useLoadingStatus: (
  defaultStatus?: Status
) => [Status, string, (status: Status, message?: string) => void] = (
  defaultStatus = "none"
) => {
  const [message, setMessage] = React.useState<string>(null);
  const [status, setStatus] = React.useState<Status>(defaultStatus);

  const handleSetStatus = (status: Status, message: string = null) => {
    setStatus(status);
    setMessage(message);
  };

  return [status, message, handleSetStatus];
};

export default useLoadingStatus;
