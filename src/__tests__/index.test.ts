import { renderHook, act } from "react-hooks-testing-library";
import useLoadingStatus from "../index";

describe("#useLoadingStatus()", () => {
  it("should return the default status and message", () => {
    const { result } = renderHook(() => useLoadingStatus());

    const [status, message] = result.current;

    expect(status).toBe("none");
    expect(message).toBeNull();
  });

  it("should return a handler to set the status", () => {
    const { result } = renderHook(() => useLoadingStatus());

    const [, , setStatus] = result.current;

    act(() => setStatus("pending"));

    const [status, message] = result.current;

    expect(status).toBe("pending");
    expect(message).toBeNull();
  });

  it("should return a handler to set the status and the message together", () => {
    const { result } = renderHook(() => useLoadingStatus());

    const [, , setStatus] = result.current;

    act(() => setStatus("pending", "This is my message"));

    const [status, message] = result.current;

    expect(status).toBe("pending");
    expect(message).toBe("This is my message");
  });

  it("should reset the message when the status changes and a message is not passed", () => {
    const { result } = renderHook(() => useLoadingStatus());

    const [, , setStatus] = result.current;

    act(() => setStatus("error", "This is my error message"));

    act(() => setStatus("success"));

    const [, message] = result.current;

    expect(message).toBeNull();
  });
});
