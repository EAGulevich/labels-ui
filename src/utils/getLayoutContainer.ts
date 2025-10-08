import { LAYOUT_ID } from "@constants";

export const getLayoutContainer = () =>
  document.getElementById(LAYOUT_ID) || document.body;
