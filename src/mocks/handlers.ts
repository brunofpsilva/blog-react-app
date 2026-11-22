import { http, HttpResponse } from "msw";
import seed from "../../db.json";
import { Comment, CommentForm } from "../types/Comment";

const API_URL = import.meta.env.VITE_API_URL;

// In-memory copy of the json-server data: changes last until the page is reloaded.
const db: { posts: typeof seed.posts; comments: Omit<Comment, "replyComments">[] } = structuredClone(seed);

// Same routes and responses as json-server, limited to what the app calls.
export const handlers = [
    http.get(`${API_URL}/posts`, () => HttpResponse.json(db.posts)),

    http.get(`${API_URL}/comments`, () => HttpResponse.json(db.comments)),

    http.post<{ id: string }, CommentForm>(`${API_URL}/posts/:id/comments`, async ({ request, params }) => {
        const comment = {
            ...(await request.json()),
            postId: params.id,
            id: Math.max(0, ...db.comments.map((c) => c.id)) + 1,
        };
        db.comments.push(comment);
        return HttpResponse.json(comment, { status: 201 });
    }),

    http.put<{ id: string }, CommentForm>(`${API_URL}/comments/:id`, async ({ request, params }) => {
        const index = db.comments.findIndex((c) => c.id === Number(params.id));
        if (index === -1) return new HttpResponse(null, { status: 404 });

        db.comments[index] = { ...(await request.json()), id: db.comments[index].id };
        return HttpResponse.json(db.comments[index]);
    }),
];
