class Model {
    _posts = [];

    constructor(posts) {
        this._posts = posts.concat();
    }

    getPage(skip = 0, top = 10, filterConfig = undefined) {
        if (filterConfig) {
            let requiredPosts = this._posts;
            for (let param in filterConfig) {
                if (param === 'author') {
                    requiredPosts = requiredPosts.filter(post => post.author.includes(filterConfig.author));
                } else if (param === 'dateFrom') {
                    requiredPosts = requiredPosts.filter(post => post.createdAt > filterConfig.dateFrom);
                } else if (param === 'dateTo') {
                    requiredPosts = requiredPosts.filter(post => post.createdAt <= filterConfig.dateTo);
                } else if (param === 'hashtags') {
                    requiredPosts = requiredPosts.filter(function (post) {
                        for (let i = 0; i < filterConfig.hashtags.length; i++) {
                            if (post.hashtags.some(hashtag => hashtag.includes(filterConfig.hashtags[i]))) {
                                return true;
                            }
                        }
                    });
                }
            }
            requiredPosts.sort((a, b) => a.createdAt - b.createdAt);
            return requiredPosts.slice(skip, skip + top);
        }
        let requiredPosts = this._posts.sort((a, b) => a.createdAt - b.createdAt);
        return requiredPosts.slice(skip, skip + top);
    }

    get(id) {
        return this._posts.find(post => post.id === id) || null;
    }

    static validate(post) {
        if (!post.description || typeof post.description !== 'string' || post.description.length > 200)
            return false;
        if (post.photoLink && typeof post.photoLink !== 'string')
            return false;
        if (post.hashtags) {
            if (!post.hashtags.every(tag => typeof tag === 'string'))
                return false;
        }
        return true;
    }

    add(post) {
        if (Model.validate(post)) {
            const date = new Date();
            const id = date;
            const author = 'user' + id;
            post.createdAt = date;
            post.id = id;
            post.author = author;
            this._posts.push(post);
            return true;
        } else return false;
    }

    edit(id, post) {
        let editPost = this.get(id);
        if (post.description) {
            editPost.description = post.description;
        }
        if (post.photoLink) {
            editPost.photoLink = post.photoLink;
        }
        if (post.hashtags) {
            editPost.hashtags = post.hashtags
        }

        if (Model.validate(editPost)) {
            this._posts.push(editPost);
            return true;
        } else return false
    }

    remove(id) {
        if (typeof id === 'string') {
            let index = this._posts.findIndex(post => post.id === id);
            if (index !== -1) {
                this._posts.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    addLike(id, username) {
        let editPost = this.get(id);
        if (!editPost.likes.includes(username)) {
            editPost.likes.push(username);
            return true;
        }
        return false;
    }

    deleteLike(id, username){
        let editPost = this.get(id);
        let index = editPost.likes.indexOf(username);
        if (index !== -1) {
            editPost.likes.splice(index,1);
            return true;
        }
        return false;
    }

    addAll(posts) {
        let invalidPosts = [];
        posts.forEach(post => {
            if (!this.add(post)) invalidPosts.push(post);
        });
        return invalidPosts;
    }

    clear() {
        this._posts = [];
    }
}