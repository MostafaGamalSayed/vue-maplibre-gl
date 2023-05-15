import { InjectionKey, Ref, ShallowRef } from 'vue';
import { Map, SourceSpecification, StyleSpecification } from 'maplibre-gl';
import { MglMap } from '@/lib/components';
import { Emitter } from 'mitt';
import { SourceLayerRegistry } from '@/lib/lib/sourceLayer.registry';

export const mapSymbol           = Symbol('map') as InjectionKey<ShallowRef<Map | null>>,
			 isLoadedSymbol      = Symbol('isLoaded') as InjectionKey<Ref<boolean>>,
			 isInitializedSymbol = Symbol('isInitialized') as InjectionKey<Ref<boolean>>,
			 componentIdSymbol   = Symbol('componentId') as InjectionKey<number>,
			 sourceIdSymbol      = Symbol('sourceId') as InjectionKey<string>,
			 sourceLayerRegistry = Symbol('sourceLayerRegistry') as InjectionKey<SourceLayerRegistry>,
			 emitterSymbol       = Symbol('emitter') as InjectionKey<Emitter<MglEvents>>;

export interface MglEvent<T = any> {
	type: string;
	component: InstanceType<typeof MglMap>;
	map: Map;
	event: T;
}

export type MglEvents = {
	styleSwitched: StyleSwitchItem;
}

export interface StyleSwitchItem {
	name: string;
	label: string;
	icon?: {
		path: string;
	};
	style: StyleSpecification | string;
}

export type AllProps<T extends object> = { [K in keyof T]: undefined };

// only proper way to ensure all possible option to track option changes by type system
export function AllOptions<T extends object>(obj: AllProps<Required<T>>) {
	return Object.keys(obj) as Array<keyof T>;
}

export function AllSourceOptions<T = SourceSpecification>(obj: AllProps<Required<Omit<T, 'type'>>>) {
	return Object.keys(obj) as Array<keyof T>;
}
