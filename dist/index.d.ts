declare class Btntest_component extends SvelteComponent {
    constructor(options: any);
    set count(arg: any);
    get count(): any;
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
declare class SvelteComponent {
    $destroy(): void;
    $on(type: any, callback: any): typeof noop;
    $set($$props: any): void;
}
declare function noop(): void;

export { Btntest_component as btntest };
