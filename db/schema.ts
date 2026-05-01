import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull().unique(),
    bio: text("bio"),
    website: text("website"),
    location: text("location"),
    avatar: text("avatar"),
    banner: text("banner"),
});

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    author: integer("author_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    likes: integer("likes").default(0),
    reposts: integer("reposts").default(0)
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

export const likes = pgTable("likes", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id)
        .notNull()
})

export const reposts = pgTable("reposts", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id)
        .notNull(),
})

export const userLikeRelations = relations(posts, ({many}) => ({
    posts: many(likes)
}))

export const postLikeRelations = relations(users, ({many}) => ({
    users: many(likes)
}))

export const likeRelations = relations(likes, ({one}) => ({
    post: one(posts, {
        fields: [likes.postID],
        references: [posts.id],
    }),

    user: one(users, {
        fields: [likes.userID],
        references: [users.id]
    })
}))

export const userRespostRelations = relations(posts, ({many}) => ({
    posts: many(reposts)
}))

export const postRepostRelations = relations(users, ({many}) => ({
    users: many(reposts)
}))

export const repostsRelations = relations(reposts, ({one}) => ({
    post: one(posts, {
        fields: [reposts.postID],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [reposts.userID],
        references: [users.id]
    })
}))
