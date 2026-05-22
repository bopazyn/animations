import {createFileRoute} from '@tanstack/react-router'
import {LogoDrops} from "#/components/LogoDrops/LogoDrops.tsx";

export const Route = createFileRoute('/logo-drops')({component: LogoDrops})
