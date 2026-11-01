async function getProjects() {
  const response = await fetch('./data/projects.json', { method: 'get' });
  if (response.ok) {
    return await response.json();
  }

  throw new Error('Not found');
}

async function renderProjects() {
  const projects = await getProjects();

  console.log(projects);
}
