DROP TABLE IF EXISTS articles, users, comments, tags, articles_tags;

CREATE TABLE users (
    id serial PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL unique,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(6),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    address VARCHAR(255),
    userType VARCHAR(255)
);

CREATE TABLE articles (
    articleId serial PRIMARY KEY,
    authorId INTEGER REFERENCES users(id),
    createdOn TIMESTAMP NOT NULL,
    title VARCHAR(255) NOT NULL,
    gifUrl VARCHAR(255),
    article TEXT
);

CREATE TABLE comments (
    commentId serial PRIMARY KEY,
    articleId INTEGER REFERENCES articles(articleId),
    authorId INTEGER REFERENCES users(id),
    createdOn TIMESTAMP NOT NULL,
    comment TEXT
);

CREATE TABLE tags(
    tag VARCHAR PRIMARY KEY,
    description TEXT
);

CREATE TABLE articles_tags(
    article_id INTEGER REFERENCES articles(articleId),
    tag VARCHAR REFERENCES tags(tag),
    PRIMARY KEY (article_id, tag)
);