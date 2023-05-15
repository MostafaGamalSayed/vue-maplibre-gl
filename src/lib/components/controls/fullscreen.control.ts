import { defineComponent, inject, onBeforeUnmount, PropType, toRef } from 'vue';
import { Position, PositionProp, PositionValues } from '@/lib/components/controls/position.enum';
import { isInitializedSymbol, mapSymbol } from '@/lib/types';
import { FullscreenControl } from 'maplibre-gl';
import { usePositionWatcher } from '@/lib/composable/usePositionWatcher';

export default /*#__PURE__*/ defineComponent({
	name : 'MglFullscreenControl',
	props: {
		position : {
			type     : String as PropType<PositionProp>,
			default  : Position.TOP_RIGHT,
			validator: (v: Position) => {
				return PositionValues.indexOf(v) !== -1;
			}
		},
		container: {
			type   : Object as PropType<HTMLElement>,
			default: null
		}
	},
	setup(props) {

		const map           = inject(mapSymbol)!,
			  isInitialized = inject(isInitializedSymbol)!,
			  control       = new FullscreenControl({ container: props.container || undefined });

		usePositionWatcher(toRef(props, 'position'), map, control);
		onBeforeUnmount(() => isInitialized.value && map.value?.removeControl(control));

	},
	render() {
		// nothing
	}
});
