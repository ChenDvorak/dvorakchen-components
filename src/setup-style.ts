import { styleInject } from "dv-style-inject";
import globalStyles from "./index.css";

//  vite doesn't package thi global styles, so do it in person
styleInject({
  css: globalStyles,
  repeat: "skip",
  unique: "dvorakchen-component-styles",
});
