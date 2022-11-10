import { groups } from "./app";
import { ContextOption, Method } from "./options";


// controller decorator define path and option
export function Controller(path?: string, opts?: ContextOption): Function {
    return function(constructor: Function) {
        constructor.prototype.prefix = "/" + path
        constructor.prototype.opts = opts
    }
}

// store group of router handler from controllers
function context(method: Method, target: any, key: string, path?: string, opts?: ContextOption): void {
    groups.push({
        method: method, // Store method
        handler: target[key], // handler from controller
        opts: opts, // store controller option
        target: target,
        path: path
    })
}


// define get decorator
export function Get(path?: string, opts?: ContextOption): Function {
    return (target: any, key: string) => context(Method.Get, target, key, path, opts)
}
export function Post(path?: string, opts?: ContextOption): Function {
    return (target: any, key: string) => context(Method.Post, target, key, path, opts)
}
export function Put(path?: string, opts?: ContextOption): Function {
    return (target: any, key: string) => context(Method.Put, target, key, path, opts)
}
export function Delete(path?: string, opts?: ContextOption): Function {
    return (target: any, key: string) => context(Method.Delete, target, key, path, opts)
}
