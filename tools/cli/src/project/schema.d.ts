export type ProjectType = 'lib' | 'nest';

export interface ProjectGeneratorSchema {
  projectType: ProjectType;
  directory: string;
}
