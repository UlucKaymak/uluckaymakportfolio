import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectModal from '../components/ProjectModal.jsx';

function Projects() {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      filterProjects('#' + filterParam);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchParams, projects]);

  const loadProjects = async () => {
    try {
      const response = await fetch('/projects.json');
      if (!response.ok) throw new Error('Failed to load projects.json');

      const allProjects = await response.json();
      const enabledProjects = allProjects.filter(project => project.enabled === true);

      setProjects(enabledProjects);
      setFilteredProjects(enabledProjects);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setError(true);
      setLoading(false);
    }
  };

  const filterProjects = (filter) => {
    if (filter === 'all') {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(project => {
      if (!project.tags) return false;
      if (filter === '#ArtPiece') {
        return project.tags.includes('#ArtPiece') || project.tags.includes('#ArtPieces');
      }
      return project.tags.includes(filter);
    });

    setFilteredProjects(filtered);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <main className="projects-main">
        <div className="projects-grid">
          <p>Loading projects...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="projects-main">
        <div className="error-message">
          <p>Error loading projects. Try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="projects-main">
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <p>No projects available.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const thumbnailUrl = project.thumbnail || (project.media && project.media[0]) || 'placeholder.jpg';
              const typeRoleText = project.role ? `${project.type} | ${project.role}` : project.type;

              return (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => openProjectModal(project)}
                >
                  <div className="project-thumbnail">
                    <img src={thumbnailUrl} alt={project.title} loading="lazy" />
                    <div className="project-overlay">
                      <h3>{project.title}</h3>
                      <p className="project-type">{typeRoleText}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      )}
    </>
  );
}

export default Projects;
