import { describe, expect, it } from "vitest";
import { _nest } from ".";
import { Comment } from "../types/Comment";

type FlatComment = Omit<Comment, "replyComments">;

const comment = (id: number, parent_id: number | null): FlatComment => ({
    id,
    parent_id,
    postId: 1,
    user: `user ${id}`,
    date: "2026-01-01",
    content: `comment ${id}`,
});

const ids = (comments: Comment[]) => comments.map((c) => c.id);

describe("_nest", () => {
    it("returns an empty list for no comments", () => {
        expect(_nest([])).toEqual([]);
    });

    it("keeps comments without a parent as roots, in order", () => {
        const roots = _nest([comment(1, null), comment(2, null)]);

        expect(ids(roots)).toEqual([1, 2]);
        expect(roots.every((c) => c.replyComments.length === 0)).toBe(true);
    });

    it("nests replies under their parent at any depth", () => {
        const roots = _nest([
            comment(1, null),
            comment(2, 1),
            comment(3, 2),
            comment(4, 1),
            comment(5, null),
        ]);

        expect(ids(roots)).toEqual([1, 5]);
        expect(ids(roots[0].replyComments)).toEqual([2, 4]);
        expect(ids(roots[0].replyComments[0].replyComments)).toEqual([3]);
        expect(roots[1].replyComments).toEqual([]);
    });

    it("does not depend on parents coming before their replies", () => {
        const roots = _nest([comment(3, 2), comment(2, 1), comment(1, null)]);

        expect(ids(roots)).toEqual([1]);
        expect(ids(roots[0].replyComments)).toEqual([2]);
        expect(ids(roots[0].replyComments[0].replyComments)).toEqual([3]);
    });

    it("shows a reply whose parent is missing as a root", () => {
        expect(ids(_nest([comment(1, null), comment(2, 99)]))).toEqual([1, 2]);
    });

    it("does not mutate its input", () => {
        const input = [comment(1, null), comment(2, 1)];
        const copy = structuredClone(input);

        _nest(input);

        expect(input).toEqual(copy);
    });
});
