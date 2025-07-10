// src/pages/Projects/ProjectList.tsx
import { FiFolderPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const mockProjects = [
  { id: '1', name: 'Tunnelbygge Öst', location: 'Stockholm', status: 'Pågående' },
  { id: '2', name: 'Renovering Skola', location: 'Göteborg', status: 'Färdigställd' },
  { id: '3', name: 'Brobygge Norr', location: 'Umeå', status: 'Planerad' },
];

const ProjectList = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 animate-fade-in max-w-full sm:max-w-2xl mx-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <FiFolderPlus className="text-indigo-500" size={24} />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Projects</h1>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            to={`/dashboard/project-info/${project.id}`}
            className="block bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-base sm:text-lg text-gray-800">{project.name}</h2>
                <p className="text-xs sm:text-sm text-gray-500">{project.location}</p>
              </div>
              <span className="text-xs sm:text-sm text-blue-600 font-medium">{project.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
