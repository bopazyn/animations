import {createFileRoute} from '@tanstack/react-router'
import CirclePacking from "#/components/CirclePacking/CirclePacking.tsx";

const Home = () => {
  return (
    <div className="p-8">
      <CirclePacking />
    </div>
  );
};

export const Route = createFileRoute('/')({component: Home})
