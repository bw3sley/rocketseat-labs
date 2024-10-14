import { Check } from "phosphor-react";

import * as CheckboxPrimity from '@radix-ui/react-checkbox';

export interface CheckboxProps extends CheckboxPrimity.CheckboxProps {}

export function  Checkbox(props: CheckboxProps) {
    return (
        <CheckboxPrimity.Root className="w-6 h-6 p-[2px] bg-gray-800 rounded" {...props}>
            <CheckboxPrimity.Indicator asChild>
                <Check weight="bold" className="w-5 h-5 text-cyan-500" />
            </CheckboxPrimity.Indicator>
        </CheckboxPrimity.Root>
    )
}