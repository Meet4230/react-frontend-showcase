import type React from "react";
import DashboardCard from "../../components/Dashboard-Card";
import { projects } from "../../api/data/projects";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <DashboardCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
