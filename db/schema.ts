import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull().unique(),
});

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    author: integer("author_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow()
})

export const userRelations = relations(users, ({many}) => ({
    posts: many(posts)
}));

export const postRelations = relations(posts, ({one}) => ({
    author : one(users, {
        fields: [posts.author],
        references: [users.id],
    }),
}));
