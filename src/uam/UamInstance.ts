import { create } from 'zustand'

export interface UamInstanceStore{
    uamInstances: number[];
    setUamInstance: (uamInstances: number[]) => void;
}

export const useUamInstanceStore = create<UamInstanceStore>((set) => ({
    uamInstances: [],
    setUamInstance: (uamInstances: number[]) => set(() => ({uamInstances: uamInstances }))
}))
