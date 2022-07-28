import { atom } from 'jotai'
import { User } from 'nuwszy'

export const userAtom = atom<User | null>(null)
