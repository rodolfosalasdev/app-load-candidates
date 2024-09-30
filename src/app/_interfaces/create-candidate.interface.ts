
export interface ICreateCandidate {
    name: string;
    surname: string;
    file: IFile;
}

export interface IFile {
    seniority: string,
    years: number,
    availability: boolean
}