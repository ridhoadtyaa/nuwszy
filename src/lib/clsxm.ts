import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// solve tailwind merge class with twMerge and clsx
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes))
