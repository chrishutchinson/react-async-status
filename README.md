# `useLoadingStatus()` React Hook

> A simple React hook for managing a loading status and associated message

## Installation

```bash
$ yarn add react-loading-status
```

## Usage examples

### Simple example

```tsx
import useLoadingStatus from "react-loading-status";

const SomeComponent: React.FunctionComponent = () => {
  const [loadingStatus, loadingMessage, setLoadingStatus] = useLoadingStatus();

  useEffect(() => {
    setLoadingStatus("pending");

    someAsyncFunction()
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
import useLoadingStatus from "react-loading-status";

const SomeComponent: React.FunctionComponent = () => {
  const [savingStatus, savingMessage, setSavingStatus] = useLoadingStatus();

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

### Publishing

The package can be published at:

```bash
$ yarn publish
```
