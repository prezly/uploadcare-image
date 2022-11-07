type FalsyValue = undefined | null | false;

export function classNames(...args: Array<string | FalsyValue>) {
    return args.filter(Boolean).join(' ');
}
