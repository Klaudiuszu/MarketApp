"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { userAtom, UserAtomType } from "../../app/atomUser";

export const UserAtomHydrator = ({ user }: { user: UserAtomType }) => {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
};
