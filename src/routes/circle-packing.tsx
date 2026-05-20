import {createFileRoute} from '@tanstack/react-router'
import CirclePacking from "#/components/CirclePacking/CirclePacking.tsx";

export const Route = createFileRoute('/circle-packing')({component: CirclePacking})
