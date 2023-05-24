import { createCommentVNode, defineComponent, inject, PropType, provide, toRef, watch } from 'vue';
import { AllSourceOptions, componentIdSymbol, sourceIdSymbol, sourceLayerRegistry } from '@/lib/types';
import { Coordinates, ImageSource, ImageSourceSpecification } from 'maplibre-gl';
import { SourceLayerRegistry } from '@/lib/lib/sourceLayer.registry';
import { SourceLib } from '@/lib/lib/source.lib';
import { useSource } from '@/lib/composable/useSource';
import { SlotsType } from 'vue/dist/vue';

const sourceOpts = AllSourceOptions<ImageSourceSpecification>({
	url        : undefined,
	coordinates: undefined,
});

export default /*#__PURE__*/ defineComponent({
	name : 'MglImageSource',
	props: {
		sourceId   : {
			type    : String as PropType<string>,
			required: true
		},
		url        : String as PropType<string>,
		coordinates: Array as unknown as PropType<Coordinates>
	},
	slots: Object as SlotsType<{ default: {} }>,
	setup(props, { slots }) {

		const cid      = inject(componentIdSymbol)!,
			  source   = SourceLib.getSourceRef<ImageSource>(cid, props.sourceId),
			  registry = new SourceLayerRegistry();

		provide(sourceIdSymbol, props.sourceId);
		provide(sourceLayerRegistry, registry);

		useSource<ImageSourceSpecification>(source, props, 'image', sourceOpts, registry);

		watch(toRef(props, 'coordinates'), v => {
			if (v) {
				source.value?.setCoordinates(v);
			}
		});

		return () => [
			createCommentVNode('Image Source'),
			source.value && slots.default ? slots.default({}) : undefined
		];

	}
});
