export const DISABLE_BUTTON = "DISABLE_BUTTON";
export const ENABLE_BUTTON = "ENABLE_BUTTON";

export function disableButton(id) {
  return {
    type: DISABLE_BUTTON,
    payload: id
  };
}

export function enableButton(id) {
  return {
    type: ENABLE_BUTTON,
    payload: id
  };
}