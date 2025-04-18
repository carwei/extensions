<script setup lang="ts">
import { useStores } from '@directus/extensions-sdk';
import { computed, reactive, ref, unref } from 'vue';

interface Value {
	flowId: string | null;
	text?: string;
	icon?: string;
	collection?: string;
	keys?: string;
}

const props = withDefaults(
	defineProps<{
		value: Value | null;
		nested?: boolean;
		collection?: string;
	}>(),
	{
		value: null,
		nested: false,
	},
);

const emit = defineEmits(['input']);

const { useFlowsStore, useCollectionsStore, usePermissionsStore } = useStores();
const flowsStore = useFlowsStore();
const collectionsStore = useCollectionsStore();
const permissionsStore = usePermissionsStore();

const canReadFlows = permissionsStore.hasPermission('directus_flows', 'read');

const internalValue = reactive<Value>(props.value ?? { flowId: null });

const manualFlows = flowsStore.flows.filter(({ trigger, options }) => {
	if (trigger === 'manual') {
		return props.collection ? Boolean(options?.collections?.includes(props.collection)) : true;
	}
	else {
		return false;
	}
});

const selectedFlow = ref<any>(
	manualFlows.find(({ id }) => id === internalValue.flowId),
);

const collections = computed(() => {
	let collections = collectionsStore.collections;

	if (props.collection) {
		collections = collections.filter(
			({ collection }) => collection === props.collection,
		);
	}
	else if (selectedFlow.value) {
		const flow = unref(selectedFlow);
		const keep = new Set(flow.options?.collections ?? []);
		collections = collections.filter(({ collection }) => keep.has(collection));
	}

	return collections
		.filter((collection) => collection.type !== 'alias')
		.map((collection) => ({
			text: collection.name,
			value: collection.collection,
		}));
});

const fields = computed(() => {
	let fields = [
		{
			field: 'flowId',
			name: 'Flow',
			type: 'string',
			meta: {
				required: true,
				width: 'full',
				interface: 'select-dropdown',
				options: {
					placeholder: 'Select a Flow',
					choices: manualFlows,
					itemValue: 'id',
					itemText: 'name',
					itemIcon: 'icon',
					itemColor: 'color',
				},
			},
		} as any,
	];

	if (internalValue.flowId) {
		const flow = unref(selectedFlow);
		const requireSelection = flow?.options?.requireSelection !== false;

		if (!props.collection) {
			fields = [...fields, {
				field: 'collection',
				name: 'Collection',
				type: 'string',
				meta: {
					required: true,
					readonly: (collections.value.length === 0),
					width: 'half',
					interface: 'select-dropdown',
					options: {
						placeholder: (collections.value.length === 0) ? 'No collections available' : 'Select a collection',
						choices: collections.value,
						allowNone: false,
					},
				},
			}, {
				field: 'keys',
				name: 'IDs',
				type: 'csv',
				meta: {
					required: requireSelection,
					width: 'half',
					interface: 'tags',
					options: {
						placeholder: 'Add an ID and press Enter...',
						iconRight: 'vpn_key',
					},
				},
			}];
		}

		fields = [...fields, {
			field: 'text',
			name: 'Button Text',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
				options: {
					placeholder: 'Button Text',
				},
			},
		}, {
			field: 'icon',
			name: 'Button Icon',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
		}];
	}

	return fields;
});

function updateInternalValue(value: Value) {
	const { flowId } = value;

	const flowChanged = internalValue.flowId !== flowId;

	internalValue.flowId = flowId;

	if (flowChanged) {
		const flow = unref(manualFlows).find(({ id }) => id === flowId);

		internalValue.text = flow.name;
		internalValue.icon = flow.icon;

		selectedFlow.value = flow;
	}
	else {
		internalValue.text = value.text;
		internalValue.icon = value.icon;
	}

	if (!props.collection) {
		internalValue.collection = value.collection;
		internalValue.keys = value.keys;
	}

	emit('input', internalValue);
}
</script>

<template>
	<template v-if="manualFlows.length === 0">
		<v-notice v-if="!canReadFlows" type="warning">
			You do not have permission to view flows.
		</v-notice>
		<v-notice v-else-if="props.collection" type="warning">
			No manual flows are available for this collection.
		</v-notice>
		<v-notice v-else type="warning">
			No manual flows are available.
		</v-notice>
	</template>
	<v-form
		v-else
		class="system-flow-trigger-form"
		:class="{ nested: props.nested }"
		:model-value="internalValue"
		:fields="fields"
		@update:model-value="updateInternalValue"
	/>
</template>

<style scoped>
.system-flow-trigger-form.nested :deep(.field.first-visible-field .field-label) {
	display: none;
}
</style>
