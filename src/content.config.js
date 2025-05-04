import { defineCollection, z } from 'astro:content';

const skillsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        group: z.string().optional(),
        level: z.number()
    })
});
const experimentationsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        group: z.string().optional(),
    })
});

const jobsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        isInternship: z.boolean().optional(),
        startingDate: z.date(),
        endingDate: z.date().optional(),
        company: z.string(),
        location: z.string()
    })
});
const projectsCollection = defineCollection({
    schema: z.object({
        name: z.string(),
        url: z.string(),
        pictureUrl: z.string()
    })
});

export const collections = {
    'skills': skillsCollection,
    'jobs': jobsCollection,
    'projects': projectsCollection,
    'experimentations': experimentationsCollection
};