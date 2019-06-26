# `useAsyncStatus()` React Hook

> A simple React hook for managing the status of an async action and an
> associated message

[![CircleCI](https://circleci.com/gh/chrishutchinson/react-async-status.svg?style=svg)](https://circleci.com/gh/chrishutchinson/react-async-status)

## Installation

```bash
$ yarn add react-async-status
```

## Usage

`status` can be one of:

- `"none"` – async action not yet initialised
- `"pending"` – async action initialised but not complete
- `"success"` – async action completed successfully
- `"error"` – async action failed

`message` is an optional string

`setStatus` is a method that takes one of the above statuses, and (optionally) a
message string.

```ts
const [status, message, setStatus] = useAsyncStatus();
```

### Simple example

```tsx
import useAsyncStatus from "react-async-status";

const SomeComponent: React.FunctionComponent = () => {
  const [loadingStatus, loadingMessage, setLoadingStatus] = useAsyncStatus();

  useEffect(() => {
    setLoadingStatus("pending");

    someAsyncLoadingFunction()
      .then(() => {
        setLoadingStatus("success");

        // ...
      })
      .catch(err => {
        setLoadingStatus("error", err.message);
      });
  }, []);

  if (loadingStatus === "error") {
    return <div>There was an error loading your data: {loadingMessage}</div>;
  }

  if (loadingStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (loadingStatus === "none") {
    return <div>Your request for data has not started yet</div>;
  }

  return <div>Your data has loaded!</div>;
};

export default SomeComponent;
```

### Alternative example (custom naming)

```tsx
import useAsyncStatus from "react-async-status";

const SomeComponent: React.FunctionComponent = () => {
  const [savingStatus, savingMessage, setSavingStatus] = useAsyncStatus();

  const handleSave = async () => {
    setSavingStatus("pending");

    try {
      await saveSomething();

      setSavingStatus("success");
    } catch (err) {
      setSavingStatus("error", err.message);
    }
  };

  return (
    <div>
      {savingStatus === "error" && (
        <p>There was an error saving your data: {savingMessage}</p>
      )}

      {savingStatus === "success" && (
        <p>Your data has been saved successfully!</p>
      )}

      <h2>Click the button to save your data</h2>

      <button disabled={savingStatus === "pending"} onClick={handleSave}>
        {savingStatus === "pending" ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default SomeComponent;
```

## Development

### Testing

The unit test suite can be run with:

```bash
$ yarn test
```

### Bundling

The library bundles can be generated with:

```bash
$ yarn bundle
```

### Publishing

The package can be published at:

```bash
$ yarn publish
```
