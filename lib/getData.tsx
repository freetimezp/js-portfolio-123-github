"use server";

import { Commit } from "./types";

export async function getData() {
    const res = await fetch(`https://api.github.com/repositories`);

    if (!res.ok) {
        throw new Error("failed to fetch data");
    }

    return res.json();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCommits(repoId: string, page?: number, search?: string): Promise<Commit[]> {
    try {
        const responseRepo = await fetch(`https://api.github.com/repositories/${repoId}`);
        const repoDetails = await responseRepo.json();

        const responseCommits = await fetch(
            `https://api.github.com/repos/${repoDetails.full_name}/commits?per_page=20`
        );
        const commits = await responseCommits.json();

        return commits;

    } catch (error) {
        console.error('Error fetching commits: ', error);
        throw error;
    }
};


