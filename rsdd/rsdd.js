import * as wasm from "./rsdd_bg.wasm";
import { __wbg_set_wasm } from "./rsdd_bg.js";
__wbg_set_wasm(wasm);
export * from "./rsdd_bg.js";
