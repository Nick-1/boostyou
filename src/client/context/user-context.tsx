import { createContext, useState, useMemo, type ReactNode } from "react";

import type { User } from '../types';

type UserContextType = {
    user: User | null;
    setUser: (u: User | null) => void;
    addSticker: (s: User['stickersList'][number]) => void;
    removeSticker: (id: string | number) => void;
    updateSticker: (id: number, updated: User['stickersList'][number]) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children, initialUser }: { children: ReactNode; initialUser?: User }) {
    const [user, setUser] = useState<User | null>(initialUser ?? null);

    const addSticker = (sticker: User['stickersList'][number]) => {
        if (!user) return;

        setUser({
            ...user,
            stickersList: [...user.stickersList, sticker],
        });
    };

    const removeSticker = (id: string | number) => {
        if (!user) return;

        setUser({
            ...user,
            stickersList: user.stickersList.filter((s) => s.id !== id),
        });
    };

    const updateSticker = (id: number, updated: User['stickersList'][number]) => {
        if (!user) return;

        setUser({
            ...user,
            stickersList: user.stickersList.map((s) => (s.id === id ? updated : s)),
        });
    };

    const value = useMemo(
        () => ({ user, setUser, addSticker, removeSticker, updateSticker }),
        [user]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
