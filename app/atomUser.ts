import { atom } from "jotai";

export type UserAtomType = {
  id: string;
  name: string;
  email: string;
};

export const userAtom = atom<UserAtomType | null>(null);
