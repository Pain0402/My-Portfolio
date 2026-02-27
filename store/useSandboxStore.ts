import { create } from 'zustand';

export type SpaceModelType = 'GeodesicDome' | 'House_Cylinder' | 'SolarPanel_Roof' | 'Rock_Large_1' | 'Rock_Large_2' | 'Tree_Floating_1';
export type CubeModelType = 'Block_Grass' | 'Block_Dirt' | 'Block_Stone' | 'Block_WoodPlanks' | 'Tree_1';
export type ModelType = SpaceModelType | CubeModelType;

export const spaceModelPaths: Record<SpaceModelType, { path: string; scale: number; yOffset: number }> = {
    GeodesicDome: { path: '/models/space/GeodesicDome.gltf', scale: 1.5, yOffset: 0 },
    House_Cylinder: { path: '/models/space/House_Cylinder.gltf', scale: 1.2, yOffset: 0 },
    SolarPanel_Roof: { path: '/models/space/SolarPanel_Roof.gltf', scale: 0.9, yOffset: 0 },
    Rock_Large_1: { path: '/models/space/Rock_Large_1.gltf', scale: 0.9, yOffset: 0 },
    Rock_Large_2: { path: '/models/space/Rock_Large_2.gltf', scale: 1.2, yOffset: 0 },
    Tree_Floating_1: { path: '/models/space/Tree_Floating_1.gltf', scale: 0.9, yOffset: 1.5 },
};

export const cubeModelPaths: Record<CubeModelType, { path: string; scale: number; yOffset: number }> = {
    Block_Grass: { path: '/models/cubeworld/Block_Grass.gltf', scale: 1, yOffset: 0 },
    Block_Dirt: { path: '/models/cubeworld/Block_Dirt.gltf', scale: 1, yOffset: 0 },
    Block_Stone: { path: '/models/cubeworld/Block_Stone.gltf', scale: 1, yOffset: 0 },
    Block_WoodPlanks: { path: '/models/cubeworld/Block_WoodPlanks.gltf', scale: 1, yOffset: 0 },
    Tree_1: { path: '/models/cubeworld/Tree_1.gltf', scale: 1, yOffset: 0 },
};

export const modelPaths: Record<ModelType, { path: string; scale: number; yOffset: number }> = {
    ...spaceModelPaths,
    ...cubeModelPaths
};

export interface PlacedObject {
    id: string;
    type: ModelType;
    position: [number, number, number];
    rotation: [number, number, number];
}

interface SandboxState {
    buildMode: boolean;
    toggleBuildMode: () => void;
    selectedModel: ModelType | null;
    setSelectedModel: (type: ModelType | null) => void;
    placedObjects: PlacedObject[];
    addObject: (obj: Omit<PlacedObject, 'id'>) => void;
    removeObject: (id: string) => void;
    clearAll: () => void;
}

export const useSandboxStore = create<SandboxState>((set) => ({
    buildMode: false,
    toggleBuildMode: () => set((state) => ({ buildMode: !state.buildMode, selectedModel: null })),
    selectedModel: null,
    setSelectedModel: (type) => set({ selectedModel: type }),
    placedObjects: [],
    addObject: (obj) => set((state) => ({
        placedObjects: [...state.placedObjects, { ...obj, id: Math.random().toString(36).substring(2, 9) }]
    })),
    removeObject: (id) => set((state) => ({
        placedObjects: state.placedObjects.filter(obj => obj.id !== id)
    })),
    clearAll: () => set({ placedObjects: [] })
}));
