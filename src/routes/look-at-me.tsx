import {createFileRoute} from '@tanstack/react-router'
import LookAtMe from "#/components/LookAtMe/LookAtMe.tsx";

export const Route = createFileRoute('/look-at-me')({component: LookAtMe})
