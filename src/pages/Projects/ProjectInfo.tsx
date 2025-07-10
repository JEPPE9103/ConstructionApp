// src/pages/Projects/ProjectInfo.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiUsers } from 'react-icons/fi';

const dummyProjectDetails = {
  '1': {
    name: 'Tunnelbygge Öst',
    location: 'Stockholm',
    description: 'Ett omfattande tunnelbygge under city för ny kollektivtrafik.',
    workers: 45,
    status: 'Pågående',
  },
  '2': {
    name: 'Renovering Skola',
    location: 'Göteborg',
    description: 'Renovering av skolbyggnad och nya klassrum.',
    workers: 22,
    status: 'Färdigställd',
  },
  '3': {
    name: 'Brobygge Norr',
    location: 'Umeå',
    description: 'Ny bro över älven för förbättrad logistik.',
    workers: 31,
    status: 'Planerad',
  },
};

const ProjectInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = id ? dummyProjectDetails[id as keyof typeof dummyProjectDetails] : null;


  if (!project) {
    return <div className="text-red-600">Projektet hittades inte.</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 animate-fade-in max-w-xs sm:max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        <FiArrowLeft /> Tillbaka
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">{project.name}</h1>
      <p className="text-gray-500 mb-4 flex items-center gap-2">
        <FiMapPin className="text-green-500" />
        {project.location}
      </p>

      <p className="text-gray-700 mb-6">{project.description}</p>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FiUsers className="text-indigo-500" />
          {project.workers} arbetare
        </div>
        <div className="text-sm text-blue-600 font-semibold">Status: {project.status}</div>
      </div>
    </div>
  );
};

export default ProjectInfo;
