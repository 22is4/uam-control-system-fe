/* tslint:disable */
/* eslint-disable */
export class UAM {
  free(): void;
  /**
   * @param {number} lat
   * @param {number} lon
   * @param {number} alt
   * @param {number} vx
   * @param {number} vy
   * @param {number} vz
   * @returns {UAM}
   */
  static new(lat: number, lon: number, alt: number, vx: number, vy: number, vz: number): UAM;
  /**
   * @param {UAM} other
   * @returns {number | undefined}
   */
  predict_collision(other: UAM): number | undefined;
}
export class UAMs {
  free(): void;
  /**
   * @returns {UAMs}
   */
  static new(): UAMs;
  /**
   * @param {UAM} uam
   */
  add(uam: UAM): void;
  /**
   * @returns {any}
   */
  predict_collisions(): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_uam_free: (a: number, b: number) => void;
  readonly __wbg_uams_free: (a: number, b: number) => void;
  readonly uam_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly uam_predict_collision: (a: number, b: number, c: number) => void;
  readonly uams_new: () => number;
  readonly uams_add: (a: number, b: number) => void;
  readonly uams_predict_collisions: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
